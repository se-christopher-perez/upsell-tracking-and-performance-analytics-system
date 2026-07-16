
from flask import Flask, request, session
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError

from datetime import datetime

from config import app, db, api
from models import User, Bill, Item, Interaction, Term

@app.before_request
def logged_in():

    open_routes = ["login", "signup"]

    if request.endpoint in open_routes:
        return

    if not session.get("user_id"):
        return {"error": "Unauthorized"}, 401

def update_fields(obj, data, fields):

    for field in fields:

        if field in data:
            
            setattr(obj, field, data[field])

def hidden_forbidden_content(bill, user_id):

    if not bill:
        return {"error": "Bill not found"}, 404
    
    if bill.user_id != user_id:
        return {"error": "Forbidden Content"}, 403
    
    return None

class Signup(Resource):

    def post(self):

        data = request.get_json()

        username = data.get("username")
        password = data.get("password")

        if not username or not password:
            return {"error": "username and password are required"}, 422

        user = User (
            
            username = username

        )

        user.password_hash = password

        try:

            db.session.add(user)
            db.session.commit()

            session["user_id"] = user.id

            return user.to_dict(), 201
        
        except IntegrityError:
            return {"error": "422 Inprocessable Entity"}, 422

class Login(Resource):

    def post(self):

        data = request.get_json()

        user = User.query.filter_by(username=data.get("username")).first()

        if not user or not user.authenticate(data.get("password")):
            return {"error": "Invalid username or password"}, 401
        
        session["user_id"] = user.id

        return user.to_dict(), 200
    
class Logout(Resource):

    def delete(self):

        session["user_id"] = None

        return {}, 204

class CheckSession(Resource):

    def get(self):

        user_id = session.get("user_id")
        
        user = User.query.filter_by(id=user_id).first()

        return user.to_dict(), 200

class Bills(Resource):

    def get(self):

        user_id = session.get("user_id")
        
        bills = Bill.query.filter_by(user_id=user_id).all()

        return [b.to_dict() for b in bills], 200
    
    def post(self):

        user_id = session.get("user_id")

        data = request.get_json()

        try:

            created_at = datetime.strptime(data["created_at"], "%Y-%m-%d").date()

            new_bill = Bill(

                user_id = user_id,
                total = data["total"],
                tip = data["tip"],
                created_at = created_at

            )

            for item in data.get("items", []):
                
                new_item = Item(

                    item_name = item["item_name"],
                    category = item["category"],
                    price = item["price"],
                    quantity = item["quantity"]

                )

                for interaction in item.get("interactions", []):

                    new_interaction = Interaction(

                        approach = interaction["approach"],
                        upsell = interaction["upsell"],
                        feedback = interaction["feedback"],
                        customer_gender = interaction["customer_gender"],
                        customer_carded = interaction["customer_carded"],
                        customer_repeat = interaction["customer_repeat"]

                    )

                    for term in interaction.get("terms", []):

                        new_term = Term(

                            term = term["term"]

                        )

                        new_interaction.terms.append(new_term)

                    new_item.interactions.append(new_interaction)

                new_bill.items.append(new_item)

            db.session.add(new_bill)
            db.session.commit()

        except (ValueError, KeyError) as error:
            db.session.rollback()
            
            return {"error": str(error)}, 422
            
        return new_bill.to_dict(), 201

class BillByID(Resource):

    def get(self, id):

        user_id = session.get("user_id")

        bill = Bill.query.filter_by(id=id).first()

        error = hidden_forbidden_content(bill, user_id)

        if error:
            return error

        return bill.to_dict(), 200

    def patch(self, id):

        user_id = session.get("user_id")

        bill = Bill.query.filter_by(id=id).first()

        error = hidden_forbidden_content(bill, user_id)

        if error:
            return error

        data = request.get_json()

        try:

            update_fields(bill, data, ("total", "tip"))

            for item_data in data.get("items", []):

                item = Item.query.filter_by(id=item_data["id"], bill_id=bill.id).first()

                if not item:
                    raise ValueError(f"Item {item_data['id']} not found on this bill")

                update_fields(item, item_data, ("item_name", "category", "price", "quantity"))

                for interaction_data in item_data.get("interactions", []):

                    interaction = Interaction.query.filter_by(id=interaction_data["id"], item_id=item.id).first()

                    if not interaction:
                        raise ValueError(f"Interaction {interaction_data['id']} not found on this item")

                    update_fields(interaction, interaction_data, ("approach", "upsell", "feedback", "customer_gender", "customer_carded", "customer_repeat"))

                    for term_data in interaction_data.get("terms", []):

                        term = Term.query.filter_by(id=term_data["id"], interaction_id=interaction.id).first()

                        if not term:
                            raise ValueError(f"Term {term_data['id']} not found on this interaction")

                        update_fields(term, term_data, ("term",))

            db.session.commit()

        except (ValueError, KeyError) as error:

            db.session.rollback()

            return {"error": str(error)}, 422

        return bill.to_dict(), 200
    
    def delete(self, id):

        user_id = session.get("user_id")

        bill = Bill.query.filter_by(id=id).first()

        error = hidden_forbidden_content(bill, user_id)

        if error:
            return error
        
        db.session.delete(bill)
        db.session.commit()

        return {}, 204
        
api.add_resource(Signup, "/signup", endpoint="signup")
api.add_resource(Login, "/login", endpoint="login")
api.add_resource(Logout, "/logout", endpoint="logout")
api.add_resource(CheckSession, "/check_session", endpoint="check_session")
api.add_resource(Bills, "/bills", endpoint="bills")
api.add_resource(BillByID, "/bills/<int:id>", endpoint="bill_by_id")

if __name__ == "__main__":
    app.run(port=5556)