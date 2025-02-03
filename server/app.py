from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from models import db  # ✅ Import db from models

def create_app():
    app = Flask(__name__)
    CORS(app)

    # Configure Database
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///lab.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Initialize Database
    db.init_app(app)

    # Initialize Migrations
    Migrate(app, db)  # ✅ No need for global migrate variable

    # Import and Register Routes
    from routes import api_routes
    app.register_blueprint(api_routes)

    return app

# Ensure Migrate is recognized when running `flask db init`
app = create_app()
