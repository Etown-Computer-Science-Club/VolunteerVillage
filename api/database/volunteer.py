from database.db import db


class Volunteer(db.Model):
    __tablename__ = 'volunteers'
    userId = db.Column(db.String(255), nullable=False)
    postId = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable=False)
    signedUpAt = db.Column(db.DateTime, nullable=False)
    isConfirmed = db.Column(db.Boolean, nullable=False)
    confirmedAt = db.Column(db.DateTime, nullable=True)
