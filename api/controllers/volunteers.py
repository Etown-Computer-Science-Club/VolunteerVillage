from flask import Blueprint, jsonify, request
from database.db import db
from database.volunteer import Volunteer
from datetime import datetime

bp = Blueprint('volunteers', __name__)


@bp.route('/volunteers/<int:postId>', methods=['GET'])
def get_volunteers(postId):
    volunteers = Volunteer.query.filter_by(postId=postId).all()

    volunteers_data = []
    for volunteer in volunteers:
        volunteer_data = {
            'userId': volunteer.userId,
            'postId': volunteer.postId,
            'name': "",
            'signedUpAt': volunteer.signedUpAt.isoformat(),
            'isConfirmed': volunteer.isConfirmed,
            'confirmedAt': volunteer.confirmedAt.isoformat() if volunteer.confirmedAt else None,
        }
        volunteers_data.append(volunteer_data)

    return jsonify(volunteers_data), 200


# @bp.route('/volunteers/<int:postId>/<string:userId>/confirm', methods=['POST'])
# def confirm_volunteer(postId, userId):
#     volunteer = Volunteer.query.filter_by(
#         postId=postId, userId=str(userId)).first()

#     if not volunteer:
#         return jsonify({'message': 'Volunteer not found'}), 404

#     volunteer.isConfirmed = True
#     volunteer.confirmedAt = datetime.utcnow()

#     db.session.commit()

#     volunteer_data = {
#         'userId': volunteer.userId,
#         'postId': volunteer.postId,
#         'signedUpAt': volunteer.signedUpAt.isoformat(),
#         'isConfirmed': volunteer.isConfirmed,
#         'confirmedAt': volunteer.confirmedAt.isoformat(),
#     }

#     return jsonify(volunteer_data), 200


@bp.route('/volunteers/<int:postId>/<string:userId>/confirm', methods=['POST'])
def confirm_volunteer(postId, userId):
    volunteer = Volunteer.query.filter_by(
        postId=postId, userId=(userId)).first()

    if not volunteer:
        return jsonify({'message': 'Volunteer not found'}), 404

    volunteer.isConfirmed = True
    volunteer.confirmedAt = datetime.utcnow()

    db.session.commit()

    volunteer_data = {
        'userId': volunteer.userId,
        'postId': volunteer.postId,
        'signedUpAt': volunteer.signedUpAt.isoformat(),
        'isConfirmed': volunteer.isConfirmed,
        'confirmedAt': volunteer.confirmedAt.isoformat(),
    }

    return jsonify(volunteer_data), 200
