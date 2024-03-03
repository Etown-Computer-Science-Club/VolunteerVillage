from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from database.db import db
from dotenv import load_dotenv
import os

from controllers.posts import bp as posts_bp
from controllers.badges import bp as badges_bp
from controllers.volunteers import bp as volunteers_bp
from controllers.leader_board import bp as leader_board_bp
from controllers.profile import bp as profile_bp

load_dotenv()

app = Flask(__name__)
CORS(app, resources={
     r"*": {"origins": ["http://localhost:3000", "http://localhost:8000"]}})
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("HH_DATABASE_URL")
app.register_blueprint(posts_bp)
app.register_blueprint(badges_bp)
app.register_blueprint(volunteers_bp)
app.register_blueprint(leader_board_bp)
app.register_blueprint(profile_bp)
db.init_app(app)

if __name__ == '__main__':
    app.run(debug=True, port=8000)
