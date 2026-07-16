from flask import Flask, request, session
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError

from config import app, db, api
from models import User, Bill, Item, Interaction, Term

class Signup(Resource):

    def post(self):

        data = request.get_json()

        username = data["username"]
        password = data["password"]

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

        if not user_id:
            return {"error": "Not logged in"}, 401
        
        user = User.query.filter_by(id=user_id).first()

        return user.to_dict(), 200


api.add_resource(Signup, "/signup")
api.add_resource(Login, "/login")
api.add_resource(Logout, "/logout")
api.add_resource(CheckSession, "/check_session")

if __name__ == "__main__":
    app.run(port=5555)