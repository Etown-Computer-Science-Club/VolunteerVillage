from flask import Blueprint, jsonify, request
from database.db import db
from database.volunteer import Volunteer

bp = Blueprint('volunteer', __name__)


@bp.route('/volunteers', methods=['GET'])
def get_volunteers():
    volunteers = Volunteer.query.all()

    # return jsonify(posts_data), 200


@bp.route('/posts', methods=['POST'])
def create_post():
    data = request.get_json()
    title = data.get('title')
    content = data.get('content')

    new_post = Post(title=title, content=content)
    db.session.add(new_post)
    db.session.commit()

    return jsonify({"id": new_post.id, "title": new_post.title, "content": new_post.content}), 201
