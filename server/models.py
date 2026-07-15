
from config import db, bcrypt
from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin

class User(db.Model, SerializerMixin):

    __tablename__ = "users"

    serialize_rules = ["-bills.user", "-_password_hash"]

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    _password_hash = db.Column(db.String, nullable=False)

    bills = db.relationship("Bill", back_populates="user")

    @property
    def password_hash(self):
        raise AttributeError("password_hash is not readable.")
    
    @password_hash.setter
    def password_hash(self, password):
        self._password_hash = bcrypt.generate_password_hash(password).decode("utf-8")

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password)

class Bill(db.Model, SerializerMixin):

    __tablename__ = "bills"

    serialize_rules = ["-user.bills", "-items.bill"]

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    total = db.Column(db.Float)
    tip = db.Column(db.Float)
    created_at = db.Column(db.Date)

    user = db.relationship("User", back_populates="bills")
    items = db.relationship("Item", back_populates="bill")

class Item(db.Model, SerializerMixin):

    __tablename__ = "items"

    serialize_rules = ["-bill.items", "-interactions.item"]

    id = db.Column(db.Integer, primary_key=True)
    bill_id = db.Column(db.Integer, db.ForeignKey('bills.id'), nullable=False)
    item_name = db.Column(db.String)
    category = db.Column(db.String)
    price = db.Column(db.Float)
    quantity = db.Column(db.Integer)

    bill = db.relationship("Bill", back_populates="items")
    interactions = db.relationship("Interaction", back_populates="item")

class Interaction(db.Model, SerializerMixin):

    __tablename__ = "interactions"

    serialize_rules = ["-item.interactions", "-terms.interaction"]

    id = db.Column(db.Integer, primary_key=True)
    item_id = db.Column(db.Integer, db.ForeignKey('items.id'), nullable=False)
    approach = db.Column(db.String)
    upsell = db.Column(db.Boolean)
    feedback = db.Column(db.String)
    customer_gender = db.Column(db.String)
    customer_carded = db.Column(db.Boolean)
    customer_repeat = db.Column(db.Boolean)

    item = db.relationship("Item", back_populates="interactions")
    terms = db.relationship("Term", back_populates="interaction")

class Term(db.Model, SerializerMixin):

    __tablename__ = "terms"

    serialize_rules = ["-interaction.terms"]

    id = db.Column(db.Integer, primary_key=True)
    interaction_id = db.Column(db.Integer, db.ForeignKey('interactions.id'), nullable=False)
    term = db.Column(db.String)

    interaction = db.relationship("Interaction", back_populates="terms")