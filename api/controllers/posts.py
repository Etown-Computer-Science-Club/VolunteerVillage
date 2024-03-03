from flask import jsonify, g
from flask import Blueprint, jsonify, request
from database.db import db
from database.post import Post
from database.volunteer import Volunteer
from sqlalchemy import func
from auth import requires_auth
from auth0Mgmt import get_user_info_with_userids, get_name

bp = Blueprint('posts', __name__)


@bp.route('/posts', methods=['GET'])
def get_posts():
    posts = Post.query.all()
    posts_data = []

    user_ids = [post.userId for post in posts]
    user_info = get_user_info_with_userids(user_ids)
    user_info = {user['user_id']: user for user in user_info}

    for post in posts:
        post_data = {
            'id': post.id,
            'company': {
                "userId": post.userId,
                "name": get_name(user_info[post.userId]) if user_info.get(post.userId) else "Unknown User",
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
            'userIsVolunteer': False,
        }
        posts_data.append(post_data)

    return jsonify(posts_data), 200


@bp.route('/posts', methods=['POST'])
@requires_auth
def create_post():
    user_id = g.user.get('sub')

    data = request.get_json()
    title = data.get('title')
    description = data.get('content')
    eventDateStart = data.get('eventDateStart')
    eventDateEnd = data.get('eventDateEnd')
    street = data.get('street')
    city = data.get('city')
    state = data.get('state')
    zip = data.get('zip')

    new_post = Post(title=title, description=description,
                    eventDateStart=eventDateStart, eventDateEnd=eventDateEnd,
                    street=street, city=city, state=state, zip=zip, userId=user_id)
    db.session.add(new_post)
    db.session.commit()

    return jsonify({
        "id": new_post.id,
    }), 201


@bp.route('/posts/me', methods=['GET'])
@requires_auth
def get_my_post():
    user_id = g.user.get('sub')
    posts = Post.query.filter_by(userId=user_id)

    posts_data = []

    user_ids = [post.userId for post in posts]
    user_info = get_user_info_with_userids(user_ids)
    user_info = {user['user_id']: user for user in user_info}

    for post in posts:
        post_data = {
            'id': post.id,
            'company': {
                "userId": post.userId,
                "name": get_name(user_info[post.userId]) if user_info.get(post.userId) else "Unknown User",
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
        }
        posts_data.append(post_data)

    return jsonify(posts_data), 200


@bp.route('/posts/<int:postId>', methods=['DELETE'])
@requires_auth
def delete_post(postId):
    post = Post.query.get_or_404(postId)  # Assumes you have a 'Post' model

    # Count confirmed volunteers associated with the post
    confirmed_count = Volunteer.query.filter_by(
        postId=postId, isConfirmed=True).count()

    if confirmed_count > 0:
        return jsonify({'message': 'Cannot delete post with confirmed volunteers'}), 400

    # Authorization check (optional, but recommended):
    # if post.author_id != userId:  # Assuming 'author_id' on the Post model
    #     return jsonify({'message': 'Unauthorized to delete this post'}), 403

    db.session.delete(post)
    db.session.commit()

    return jsonify({'message': 'Post deleted successfully'}), 200
