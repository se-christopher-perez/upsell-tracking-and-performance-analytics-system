from config import app, db, bcrypt
from models import User, Bill, Item, Interaction, Term
from datetime import datetime

with app.app_context():
    
    print("Dropping and recreating all tables...")

    db.drop_all()
    db.create_all()

    print("Seeding Users...")

    u1 = User(
        username="alex_bartender", 
        _password_hash=bcrypt.generate_password_hash("password123").decode('utf-8')
    )

    u2 = User(
        username="sam_server", 
        _password_hash=bcrypt.generate_password_hash("password456").decode('utf-8')
    )

    db.session.add_all([u1, u2])
    db.session.commit()

    print("Seeding Bills...")

    b1 = Bill(user_id=u1.id, total=25.49, tip=5.00, created_at=datetime.now().date())

    b2 = Bill(user_id=u1.id, total=12.00, tip=2.50, created_at=datetime.now().date())

    b3 = Bill(user_id=u2.id, total=14.99, tip=3.00, created_at=datetime.now().date())

    db.session.add_all([b1, b2, b3])
    db.session.commit()

    print("Seeding Items...")

    i1 = Item(bill_id=b1.id, item_name="cheeseburger", category="food", price=14.99, quantity=1)

    i2 = Item(bill_id=b1.id, item_name="margirita", category="beverage", price=10.50, quantity=1)
    
    i3 = Item(bill_id=b2.id, item_name="martini", category="beverage", price=12.00, quantity=1)
    
    i4 = Item(bill_id=b3.id, item_name="cheeseburger", category="food", price=14.99, quantity=1)
    
    db.session.add_all([i1, i2, i3, i4])
    db.session.commit()

    print("Seeding Interactions...")

    int1 = Interaction(
        item_id=i1.id,
        approach="friendly",
        upsell=True,
        feedback="positive",
        customer_gender="male",
        customer_carded=False,
        customer_repeat=True
    )

    int2 = Interaction(
        item_id=i2.id,
        approach="layback",
        upsell=False,
        feedback="positive",
        customer_gender="female",
        customer_carded=True,
        customer_repeat=False
    )

    int3 = Interaction(
        item_id=i3.id,
        approach="friendly",
        upsell=True,
        feedback="negative",
        customer_gender="female",
        customer_carded=True,
        customer_repeat=True
    )

    int4 = Interaction(
        item_id=i4.id,
        approach="layback",
        upsell=False,
        feedback="positive",
        customer_gender="male",
        customer_carded=False,
        customer_repeat=True
    )

    db.session.add_all([int1, int2, int3, int4])
    db.session.commit()

    print("Seeding Terms...")

    t1 = Term(interaction_id=int1.id, term="juicy")

    t2 = Term(interaction_id=int1.id, term="savory")
    
    t3 = Term(interaction_id=int2.id, term="sweet")

    t4 = Term(interaction_id=int3.id, term="spicy")
    
    t5 = Term(interaction_id=int4.id, term="juicy") 

    db.session.add_all([t1, t2, t3, t4, t5])
    db.session.commit()

    print("Seeded successfully!")