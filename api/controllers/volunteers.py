from flask import Blueprint, jsonify, request, g
from database.db import db
from database.volunteer import Volunteer
from datetime import datetime
from auth import requires_auth
from auth0Mgmt import get_user_info_with_userids, get_name

bp = Blueprint('volunteers', __name__)


@bp.route('/volunteers/<int:postId>', methods=['GET'])
@requires_auth
def get_volunteers(postId):
    volunteers = Volunteer.query.filter_by(postId=postId).all()

    user_ids = [volunteer.userId for volunteer in volunteers]
    user_info = get_user_info_with_userids(user_ids)
    user_info = {user['user_id']: user for user in user_info}

    volunteers_data = []
    for volunteer in volunteers:
        volunteer_data = {
            'userId': volunteer.userId,
            'postId': volunteer.postId,
            'name': get_name(user_info[volunteer.userId]) if user_info.get(volunteer.userId) else "Unknown User",
            'signedUpAt': volunteer.signedUpAt.isoformat(),
            'isConfirmed': volunteer.isConfirmed,
            'confirmedAt': volunteer.confirmedAt.isoformat() if volunteer.confirmedAt else None,
        }
        volunteers_data.append(volunteer_data)

    return jsonify(volunteers_data), 200


@bp.route('/volunteers/<int:postId>', methods=['POST'])
@requires_auth
def add_volunteer(postId):
    userId = g.user.get('sub')
    volunteer = Volunteer.query.filter_by(
        postId=postId, userId=userId).first()

    if volunteer:
        return jsonify({'message': 'Volunteer already exists'}), 400

    new_volunteer = Volunteer(
        postId=postId, userId=userId, signedUpAt=datetime.utcnow(), isConfirmed=False)

    db.session.add(new_volunteer)
    db.session.commit()

    volunteer_data = {
        'userId': new_volunteer.userId,
        'postId': new_volunteer.postId,
        'signedUpAt': new_volunteer.signedUpAt.isoformat(),
        'isConfirmed': new_volunteer.isConfirmed,
        'confirmedAt': None,
    }

    return jsonify(volunteer_data), 200


@bp.route('/volunteers/<int:postId>/<string:userId>/confirm', methods=['POST'])
@requires_auth
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


@bp.route('/volunteers/<int:postId>/<string:userId>', methods=['DELETE'])
@requires_auth
def delete_volunteer(postId, userId):
    volunteer = Volunteer.query.filter_by(
        postId=postId, userId=(userId)).first()

    if not volunteer:
        return jsonify({'message': 'Volunteer not found'}), 404

    db.session.delete(volunteer)
    db.session.commit()

    return jsonify({'message': 'Volunteer deleted successfully'}), 200
