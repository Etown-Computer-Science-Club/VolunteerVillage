from flask import jsonify, g, Blueprint, jsonify
from flask import request
from auth import requires_auth
from auth0Mgmt import get_user_info_with_userids, get_name

bp = Blueprint('profile', __name__)


@bp.route('/profile', methods=['GET'])
@requires_auth
def get_profile_details():
    user_id = g.user.get('sub')

    user_ids = [user_id]
    user_info = get_user_info_with_userids(user_ids)
    user_info = user_info[0]

    return jsonify({
        'picture': user_info.get("picture"), 'name': get_name(user_info)
    }), 200


@bp.route('/profile', methods=['PUT'])
@requires_auth
def update_profile_details():
    user_id = g.user.get('sub')

    file = request.files['file']

    if file and file.filename != '':
        # firebase
        pass

    name = request.form.get('name', '')

    if name:
        # update name
        pass
