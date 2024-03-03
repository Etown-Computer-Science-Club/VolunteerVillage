from flask import Flask, Blueprint, jsonify
from database.db import db
from database.volunteer import Volunteer
from sqlalchemy import func

bp = Blueprint('leader_board', __name__)


# @bp.route('/leaderboard', methods=['GET'])  # Update the route
# def get_leaderboard():
#     confirmed_volunteers = db.session.query(
#         Volunteer.userId,
#         func.count(Volunteer.postId).label('confirmedCount')
#     ) \
#         .filter(Volunteer.isConfirmed == True) \
#         .group_by(Volunteer.userId) \
#         .order_by(func.count(Volunteer.postId).desc())  # Order by count in descending order

#     leaderboard_data = []
#     for rank, volunteer in enumerate(confirmed_volunteers, start=1):  # Add ranking
#         volunteer_data = {
#             'rank': rank,
#             'userId': volunteer.userId,
#             'volunteerCount': volunteer.confirmedCount,
#             'name': "empty",
#         }
#         leaderboard_data.append(volunteer_data)

#     return jsonify(leaderboard_data), 200

from flask import jsonify

@bp.route('/posts/<int:postId>', methods=['DELETE'])
def delete_post(postId):
    post = Post.query.get_or_404(postId)  # Assumes you have a 'Post' model

    # Count confirmed volunteers associated with the post
    confirmed_count = Volunteer.query.filter_by(post_id=postId).count()

    if confirmed_count > 0:
        return jsonify({'message': 'Cannot delete post with confirmed volunteers'}), 400

    # Authorization check (optional, but recommended):
    # if post.author_id != userId:  # Assuming 'author_id' on the Post model
    #     return jsonify({'message': 'Unauthorized to delete this post'}), 403

    db.session.delete(post)
    db.session.commit()

    return jsonify({'message': 'Post deleted successfully'}), 200
