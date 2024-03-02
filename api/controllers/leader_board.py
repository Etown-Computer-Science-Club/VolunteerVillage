from flask import Flask, Blueprint, jsonify

bp = Blueprint('leader_board', __name__)

# Placeholder data for user accounts and scores
users = [
    {"id": "1", "name": "John", "volunteerCount": 100},
    {"id": "2", "name": "Jane", "volunteerCount": 200},
    {"id": "3", "name": "Joe", "volunteerCount": 300},
    {"id": "4", "name": "Jill", "volunteerCount": 400},
    {"id": "5", "name": "Jack", "volunteerCount": 500},
]

@bp.route('/leaderboard', methods=['GET'])
def get_leaderboard():
    """
    Get the leaderboard with user scores.

    Returns:
        A JSON response containing the leaderboard data and HTTP status code.
    """
    leaderboard = sorted(users, key=lambda user: user['score'], reverse=True)
    return jsonify({"leaderboard": leaderboard}), 200

@bp.route('/user/<int:user_id>', methods=['GET'])
def get_user(user_id):
    """
    Get a specific user's information.

    Args:
        user_id: The ID of the user.

    Returns:
        A JSON response containing the user's information and HTTP status code.
    """
    user = next((user for user in users if user['id'] == user_id), None)
    if user:
        return jsonify({"user": user}), 200
    else:
        return jsonify({"message": "User not found"}), 404

@bp.route('/user/<int:user_id>/score', methods=['PUT'])
def update_user_score(user_id):
    """
    Update a specific user's score.

    Args:
        user_id: The ID of the user.

    Returns:
        A JSON response containing the updated user's information and HTTP status code.
    """
    user = next((user for user in users if user['id'] == user_id), None)
    if user:
        # Placeholder logic to update the user's score
        new_score = user['score'] + 50
        user['score'] = new_score
        return jsonify({"user": user}), 200
    else:
        return jsonify({"message": "User not found"}), 404
