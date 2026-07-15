from flask import Flask, request, session
from flask_restful import Resource
from config import app, db, api
from models import User, Bill, Item, Interaction, Term

class Login(Resource):

    def post(self):

        data = request.get_json()

        user = User.query.filter_by(username=data.get("username")).first()

        if not user or not user.authenticate(data.get("passeord")):
            return {"error": "Invalid username or password"}, 401
        
        session["user_id"] = user.id

        return user.to_dict(), 200