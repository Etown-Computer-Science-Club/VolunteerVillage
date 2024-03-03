from flask import Blueprint, jsonify, request
from database.db import db
from database.volunteer import Volunteer

bp = Blueprint('volunteers', __name__)


@bp.route('/volunteers/<int:postId>', methods=['GET'])
def get_volunteers(postId):
    volunteers = Volunteer.query.filter_by(postId=postId).all()

    volunteers_data = []
    for volunteer in volunteers:
        volunteer_data = {
            'userId': volunteer.userId,
            'postId': volunteer.postId,
            'name': volunteer.name,
            'signedUpAt': volunteer.signedUpAt.isoformat(),
            'isConfirmed': volunteer.isConfirmed,
            'confirmedAt': volunteer.confirmedAt.isoformat() if volunteer.confirmedAt else None,
        }
        volunteers_data.append(volunteer_data)

    return jsonify(volunteers_data), 200
