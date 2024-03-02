from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from database.db import db
from dotenv import load_dotenv
from blueprints import posts_bp, badges_bp
import os

load_dotenv()

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("HH_DATABASE_URL")
app.register_blueprint(posts_bp)
app.register_blueprint(badges_bp)
db.init_app(app)

with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True)
