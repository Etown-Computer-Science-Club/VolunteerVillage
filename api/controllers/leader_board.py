from flask import Flask, Blueprint, jsonify
from database.db import db
from database.volunteer import Volunteer
from sqlalchemy import func
from auth0Mgmt import get_user_info_with_userids, get_name

bp = Blueprint('leader_board', __name__)


@bp.route('/leaderboard', methods=['GET'])  # Update the route
def get_leaderboard():
    confirmed_volunteers = db.session.query(
        Volunteer.userId,
        func.count(Volunteer.postId).label('confirmedCount')
    ) \
        .filter(Volunteer.isConfirmed == True) \
        .group_by(Volunteer.userId) \
        .order_by(func.count(Volunteer.postId).desc())  # Order by count in descending order

    user_ids = [volunteer.userId for volunteer in confirmed_volunteers]
    user_info = get_user_info_with_userids(user_ids)
    user_info = {user['user_id']: user for user in user_info}

    leaderboard_data = []
    for rank, volunteer in enumerate(confirmed_volunteers, start=1):  # Add ranking
        volunteer_data = {
            'rank': rank,
            'userId': volunteer.userId,
            'volunteerCount': volunteer.confirmedCount,
            'name': get_name(user_info[volunteer.userId]) if user_info.get(volunteer.userId) else "Unknown User",
        }
        leaderboard_data.append(volunteer_data)

    return jsonify(leaderboard_data), 200
