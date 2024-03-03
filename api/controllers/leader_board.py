from flask import Flask, Blueprint, jsonify
from database.db import db
from database.volunteer import Volunteer
from sqlalchemy import func

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

    leaderboard_data = []
    for rank, volunteer in enumerate(confirmed_volunteers, start=1):  # Add ranking
        volunteer_data = {
            'rank': rank,
            'userId': volunteer.userId,
            'volunteerCount': volunteer.confirmedCount,
            'name': "empty",
        }
        leaderboard_data.append(volunteer_data)

    return jsonify(leaderboard_data), 200
