from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin

db = SQLAlchemy()

class Lab(db.Model, SerializerMixin):
    __tablename__ = 'labs'  # ✅ Use plural table names

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)

    # Relationships
    prices = db.relationship('Price', back_populates='lab', lazy=True, cascade="all, delete-orphan")

class Test(db.Model, SerializerMixin):
    __tablename__ = 'tests'  # ✅ Use plural table names

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    initial = db.Column(db.String(120), nullable=False)

    # Relationships
    prices = db.relationship('Price', back_populates='test', lazy=True, cascade="all, delete-orphan")

class Price(db.Model, SerializerMixin):
    __tablename__ = 'prices'  # ✅ Use plural table names

    id = db.Column(db.Integer, primary_key=True)
    price = db.Column(db.Float, nullable=False)

    # Foreign Keys
    lab_id = db.Column(db.Integer, db.ForeignKey('labs.id'), nullable=False)
    test_id = db.Column(db.Integer, db.ForeignKey('tests.id'), nullable=False)

    # Relationships
    lab = db.relationship('Lab', back_populates='prices')
    test = db.relationship('Test', back_populates='prices')
