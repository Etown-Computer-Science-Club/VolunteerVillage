from database.db import db


class Post(db.Model):
    __tablename__ = 'posts'
    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.String(255), nullable=False)
    eventDateStart = db.Column(db.DateTime, nullable=False)
    eventDateEnd = db.Column(db.DateTime, nullable=False)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    street = db.Column(db.String(255), nullable=False)
    city = db.Column(db.String(255), nullable=False)
    state = db.Column(db.String(255), nullable=False)
    zip = db.Column(db.String(255), nullable=False)
