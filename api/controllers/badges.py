from flask import jsonify, Blueprint

bp = Blueprint('badges', __name__)


@bp.route('/badges', methods=['GET'])
def get_badges():
    # Dummy response for demonstration
    return jsonify({"message": "Returning all badges"}), 200
