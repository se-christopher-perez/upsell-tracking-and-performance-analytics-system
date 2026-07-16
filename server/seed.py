from config import app, db, bcrypt
from models import User, Bill, Item, Interaction, Term
from datetime import datetime

with app.app_context():

    db.drop_all()
    db.create_all()

    user_1 = User(
        username = "User1",
        _password_hash = bcrypt.generate_password_hash("password1").decode('utf-8')
    )

    user_2 = User(
        username = "User2",
        _password_hash = bcrypt.generate_password_hash("password2").decode('utf-8')
    )

    user_3 = User(
        username = "User3",
        _password_hash = bcrypt.generate_password_hash("password3").decode('utf-8')
    )

    user_4 = User(
        username = "User4",
        _password_hash = bcrypt.generate_password_hash("password4").decode('utf-8')
    )

    db.session.add_all([user_1, user_2, user_3, user_4])
    db.session.commit()

    print("🌱 Seeded Users 🌱")

    bill_1 = Bill(user_id = user_1.id, total = 25.49, tip = 5.00, created_at=datetime.now().date())  

    bill_2 = Bill(user_id = user_1.id, total = 21.00, tip = 4.00, created_at=datetime.now().date())   

    bill_3 = Bill(user_id = user_1.id, total = 14.99, tip = 6.50, created_at=datetime.now().date())   

    bill_4 = Bill(user_id = user_2.id, total = 12.00, tip = 2.50, created_at=datetime.now().date())   

    bill_5 = Bill(user_id = user_2.id, total = 38.99, tip = 8.00, created_at=datetime.now().date())   

    bill_6 = Bill(user_id = user_3.id, total = 14.99, tip = 3.00, created_at=datetime.now().date())   

    bill_7 = Bill(user_id = user_3.id, total = 35.99, tip = 5.50, created_at=datetime.now().date())   

    bill_8 = Bill(user_id = user_3.id, total = 22.50, tip = 1.50, created_at=datetime.now().date())   

    bill_9 = Bill(user_id = user_4.id, total = 29.98, tip = 4.50, created_at=datetime.now().date())   

    bill_10 = Bill(user_id = user_4.id, total = 22.50, tip = 7.00, created_at=datetime.now().date())  

    db.session.add_all([
        bill_1, bill_2, bill_3, bill_4, bill_5,
        bill_6, bill_7, bill_8, bill_9, bill_10
    ])

    db.session.commit()

    print("🌱 Seeded Bills 🌱")

    item_1 = Item(bill_id = bill_1.id, item_name = "cheeseburger", category = "food", price = 14.99, quantity = 1)

    item_2 = Item(bill_id = bill_1.id, item_name = "margarita", category = "beverage", price = 10.50, quantity = 1)

    item_3 = Item(bill_id = bill_2.id, item_name = "margarita", category = "beverage", price = 10.50, quantity = 2)

    item_4 = Item(bill_id = bill_3.id, item_name = "cheeseburger", category = "food", price = 14.99, quantity = 1)

    item_5 = Item(bill_id = bill_4.id, item_name = "martini", category = "beverage", price = 12.00, quantity = 1)

    item_6 = Item(bill_id = bill_5.id, item_name = "cheeseburger", category = "food", price = 14.99, quantity = 1)

    item_7 = Item(bill_id = bill_5.id, item_name = "martini", category = "beverage", price = 12.00, quantity = 2)

    item_8 = Item(bill_id = bill_6.id, item_name = "cheeseburger", category = "food", price = 14.99, quantity = 1)

    item_9 = Item(bill_id = bill_7.id, item_name = "cheeseburger", category = "food", price = 14.99, quantity = 1)

    item_10 = Item(bill_id = bill_7.id, item_name = "margarita", category = "beverage", price = 10.50, quantity = 2)

    item_11 = Item(bill_id = bill_8.id, item_name = "martini", category = "beverage", price = 12.00, quantity = 1)

    item_12 = Item(bill_id = bill_8.id, item_name = "margarita", category = "beverage", price = 10.50, quantity = 1)

    item_13 = Item(bill_id = bill_9.id, item_name = "cheeseburger", category = "food", price = 14.99, quantity = 2)

    item_14 = Item(bill_id = bill_10.id, item_name = "margarita", category = "beverage", price = 10.50, quantity = 1)

    item_15 = Item(bill_id = bill_10.id, item_name = "martini", category = "beverage", price = 12.00, quantity = 1)

    db.session.add_all([
        item_1, item_2, item_3, item_4, item_5, item_6, item_7, item_8,
        item_9, item_10, item_11, item_12, item_13, item_14, item_15
    ])

    db.session.commit()

    print("🌱 Seeded Items 🌱")

    interaction_1 = Interaction(
        item_id = item_1.id, approach = "friendly", upsell = True, feedback = "positive",
        customer_gender = "male", customer_carded = False, customer_repeat = True
    )

    interaction_2 = Interaction(
        item_id =item_2.id, approach ="casual", upsell =False, feedback ="positive",
        customer_gender ="female", customer_carded =True, customer_repeat =False
    )

    interaction_3 = Interaction(
        item_id = item_3.id, approach = "robotic", upsell = True, feedback = "neutral",
        customer_gender = "female", customer_carded = False, customer_repeat = True
    )

    interaction_4 = Interaction(
        item_id = item_4.id, approach = "scripted", upsell = False, feedback = "negative",
        customer_gender = "male", customer_carded = True, customer_repeat = False
    )

    interaction_5 = Interaction(
        item_id = item_5.id, approach = "humor", upsell = True, feedback = "positive",
        customer_gender = "male", customer_carded = True, customer_repeat = True
    )

    interaction_6 = Interaction(
        item_id = item_6.id, approach = "honesty", upsell = True, feedback = "positive",
        customer_gender = "female", customer_carded = True, customer_repeat = False
    )

    interaction_7 = Interaction(
        item_id = item_7.id, approach = "friendly", upsell = False, feedback = "neutral",
        customer_gender = "female", customer_carded = False, customer_repeat = True
    )

    interaction_8 = Interaction(
        item_id = item_8.id, approach = "casual", upsell = True, feedback = "positive",
        customer_gender = "male", customer_carded = False, customer_repeat = False
    )

    interaction_9 = Interaction(
        item_id = item_9.id, approach = "robotic", upsell = False, feedback = "negative",
        customer_gender = "male", customer_carded = True, customer_repeat = False
    )

    interaction_10 = Interaction(
        item_id = item_10.id, approach = "scripted", upsell = True, feedback = "positive",
        customer_gender = "female", customer_carded = True, customer_repeat = True
    )

    interaction_11 = Interaction(
        item_id = item_11.id, approach = "humor", upsell = True, feedback = "positive",
        customer_gender = "male", customer_carded = False, customer_repeat = True
    )

    interaction_12 = Interaction(
        item_id = item_12.id, approach = "honesty", upsell = False, feedback = "neutral",
        customer_gender = "female", customer_carded = True, customer_repeat = False
    )

    interaction_13 = Interaction(
        item_id = item_13.id, approach = "friendly", upsell = True, feedback = "positive",
        customer_gender = "male", customer_carded = True, customer_repeat = True
    )

    interaction_14 = Interaction(
        item_id = item_14.id, approach = "casual", upsell = False, feedback = "positive",
        customer_gender = "female", customer_carded = False, customer_repeat = False
    )

    interaction_15 = Interaction(
        item_id = item_15.id, approach = "robotic", upsell = True, feedback = "negative",
        customer_gender = "male", customer_carded = True, customer_repeat = False
    )

    db.session.add_all([
        interaction_1, interaction_2, interaction_3, interaction_4, interaction_5,
        interaction_6, interaction_7, interaction_8, interaction_9, interaction_10,
        interaction_11, interaction_12, interaction_13, interaction_14, interaction_15
    ])

    db.session.commit()

    print("🌱 Seeded Interactions 🌱")

    term_1 = Term(interaction_id = interaction_1.id, term = "juicy")

    term_2 = Term(interaction_id = interaction_1.id, term = "savory")

    term_3 = Term(interaction_id = interaction_2.id, term = "sweet")

    term_4 = Term(interaction_id = interaction_3.id, term = "tangy")

    term_5 = Term(interaction_id = interaction_4.id, term = "savory")

    term_6 = Term(interaction_id = interaction_5.id, term = "crisp")

    term_7 = Term(interaction_id = interaction_6.id, term = "juicy")

    term_8 = Term(interaction_id = interaction_7.id, term = "zesty")

    term_9 = Term(interaction_id = interaction_8.id, term = "savory")

    term_10 = Term(interaction_id = interaction_9.id, term = "tart")

    term_11 = Term(interaction_id = interaction_10.id, term = "sweet")

    term_12 = Term(interaction_id = interaction_11.id, term = "crisp")

    term_13 = Term(interaction_id = interaction_12.id, term = "tangy")

    term_14 = Term(interaction_id = interaction_13.id, term = "juicy")

    term_15 = Term(interaction_id = interaction_14.id, term = "zesty")

    term_16 = Term(interaction_id = interaction_15.id, term = "spicy")

    db.session.add_all([
        term_1, term_2, term_3, term_4, term_5, term_6, term_7, term_8,
        term_9, term_10, term_11, term_12, term_13, term_14, term_15, term_16
    ])

    db.session.commit()

    print("🌱 Seeded Terms 🌱")

    print("🎉 Data Seeded Successfully 🎉")