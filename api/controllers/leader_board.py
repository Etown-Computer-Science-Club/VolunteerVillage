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
    leaderboard = sorted(
        users, key=lambda user: user['volunteerCount'], reverse=True)
    return jsonify(leaderboard), 200

@bp.route('/posts', methods=['GET'])
def get_posts():
    posts = Post.query.all()
    posts_data = []

    for post in posts:
        confirmed_count = db.session.query(func.count(Volunteer.postId)) \
                             .join(Volunteer, Volunteer.postId == post.id) \
                             .filter(Volunteer.isConfirmed == True) \
                             .scalar()

        post_data = {
            'id': post.id,
            'company': {
                "userId": post.userId,
                "name": "Company Name", 
                "logo": "",
            },
            'eventDateStart': post.eventDateStart.isoformat(),
            'eventDateEnd': post.eventDateEnd.isoformat(),
            'title': post.title,
            'description': post.description,
            'address': {
                'street': post.street,
                'city': post.city,
                'state': post.state,
                'zip': post.zip,
            },
            'userIsVolunteer': False,  # Placeholder - you might need additional logic here 
            'confirmedVolunteersCount': confirmed_count  # Add the count
        }

        posts_data.append(post_data)

    return jsonify(posts_data), 200

