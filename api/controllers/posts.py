from flask import Blueprint, jsonify, request
from database.db import db
from database.post import Post

bp = Blueprint('posts', __name__)


@bp.route('/posts', methods=['GET'])
def get_posts():
    posts = Post.query.all()
    posts_data = []
    for post in posts:
        post_data = {
            'id': post.id,
            'userId': post.userId,
            'eventDate': post.eventDate.isoformat(),
            'title': post.title,
            'description': post.description,
            'street': post.street,
            'city': post.city,
            'state': post.state,
            'zip': post.zip,
        }
        posts_data.append(post_data)

    return jsonify(posts_data), 200


@bp.route('/posts', methods=['POST'])
def create_post():
    data = request.get_json()
    title = data.get('title')
    content = data.get('content')

    new_post = Post(title=title, content=content)
    db.session.add(new_post)
    db.session.commit()

    return jsonify({"id": new_post.id, "title": new_post.title, "content": new_post.content}), 201
