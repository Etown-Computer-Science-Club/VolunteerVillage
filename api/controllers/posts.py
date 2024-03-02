from flask import Flask, Blueprint, jsonify

bp = Blueprint('posts', __name__)


@bp.route('/posts', methods=['GET'])
def get_posts():
    return jsonify({"message": "Returning all posts"}), 200
