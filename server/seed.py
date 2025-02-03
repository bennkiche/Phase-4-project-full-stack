from app import db
from models import Lab, Test, Price
from app import app
with app.app_context():

    def seed_data():
        # Create Labs
        lab1 = Lab(name="Alpha Lab", email="contact@alphalab.com")
        lab2 = Lab(name="Beta Lab", email="info@betalab.com")

        # Create Tests
        test1 = Test(name="COVID-19 PCR", initial="PCR")
        test2 = Test(name="Complete Blood Count", initial="CBC") 
        test3 = Test(name="Liver Function Test", initial="LFT")

        # Add to session
        db.session.add_all([lab1, lab2, test1, test2, test3])
        db.session.commit()

        # Create Prices
        price1 = Price(price=50.0, lab_id=lab1.id, test_id=test1.id)
        price2 = Price(price=30.0, lab_id=lab1.id, test_id=test2.id)
        price3 = Price(price=45.0, lab_id=lab2.id, test_id=test1.id)
        price4 = Price(price=40.0, lab_id=lab2.id, test_id=test3.id)

        # Add to session
        db.session.add_all([price1, price2, price3, price4])
        db.session.commit()
        
        print("Database seeded successfully!")

    if __name__ == "__main__":
        db.create_all()
        seed_data()
