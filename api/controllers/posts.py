from flask import jsonify
from flask import Blueprint, jsonify, request
from database.db import db
from database.post import Post
from database.volunteer import Volunteer
from sqlalchemy import func
from auth import requires_auth

bp = Blueprint('posts', __name__)


@bp.route('/posts', methods=['GET'])
def get_posts():
    posts = Post.query.all()
    posts_data = []
    for post in posts:
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
            'userIsVolunteer': False,
        }
        posts_data.append(post_data)

    return jsonify(posts_data), 200


@requires_auth
@bp.route('/posts', methods=['POST'])
def create_post():
    data = request.get_json()
    title = data.get('title')
    content = data.get('content')

    new_post = Post(title=title, content=content)
    db.session.add(new_post)
    db.session.commit()

    return jsonify({"id": new_post.id, "title": new_post.title, "content": new_post.content}), 201


@requires_auth
@bp.route('/posts/<int:postId>', methods=['DELETE'])
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
