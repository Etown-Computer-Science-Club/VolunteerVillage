from flask import jsonify
from blueprints import badges_bp as bp


@bp.route('/badges', methods=['GET'])
def get_badges():
    # Dummy response for demonstration
    return jsonify({"message": "Returning all badges"}), 200
