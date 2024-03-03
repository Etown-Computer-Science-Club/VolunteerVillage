import requests
from datetime import datetime, timedelta
import os

# Assuming these are your real Auth0 credentials and endpoint
AUTH0_DOMAIN = "henhacks24.us.auth0.com"
CLIENT_ID = "Jx3UY9GKTN47gnBQaEs072mqKrX0ASey"
CLIENT_SECRET = os.getenv("AUTH0_CLIENT_SECRET")
AUDIENCE = "https://henhacks24.us.auth0.com/api/v2/"

# Memory storage for the token and expiration
token_info = {
    "access_token": None,
    "expires_at": None
}


def get_auth0_token():
    """Fetch a new token from Auth0."""
    url = f"https://{AUTH0_DOMAIN}/oauth/token"
    payload = {
        "grant_type": "client_credentials",
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET,
        "audience": AUDIENCE
    }
    headers = {'content-type': "application/x-www-form-urlencoded"}

    response = requests.post(url, data=payload, headers=headers)
    data = response.json()

    return {
        "access_token": data["access_token"],
        "expires_at": datetime.now() + timedelta(seconds=data["expires_in"])
    }


def check_token():
    """Check if the token is in memory and valid, otherwise fetch a new one."""
    if token_info["access_token"] is None or datetime.now() >= token_info["expires_at"]:
        new_token = get_auth0_token()
        token_info["access_token"] = new_token["access_token"]
        token_info["expires_at"] = new_token["expires_at"]
    return token_info["access_token"]


def get_user_info_with_userids(userids):
    """Get the user info from Auth0."""
    token = check_token()

    user_id_queries = ' OR '.join(
        [f'user_id:"{userid}"' for userid in userids])
    query = f"q={user_id_queries}&fields=user_id,name,email,username,nickname,picture&include_fields=true&search_engine=v3"
    url = f"https://{AUTH0_DOMAIN}/api/v2/users?{query}"

    headers = {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token
    }

    response = requests.request("GET", url, headers=headers)
    return response.json()


def get_name(user_obj):
    if "username" in user_obj:
        return user_obj["username"]
    if "name" in user_obj:
        return user_obj["name"]
    if "nickname" in user_obj:
        return user_obj["nickname"]


def update_user_profilepic(user_id, profile_pic_url=None, name=None):
    token = check_token()
    url = f"https://{AUTH0_DOMAIN}/api/v2/users/{user_id}"
    headers = {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token
    }

    payload = {}
    if profile_pic_url:
        payload['picture'] = profile_pic_url
    if name:
        payload['username'] = name
        payload['connection'] = 'Username-Password-Authentication'

    response = requests.request("PATCH", url, headers=headers, json=payload)
    return response.json()


# @app.route('/get-token')
# def get_token():
#     """Endpoint to get a valid Auth0 token."""
#     token = check_token()
#     return jsonify({"access_token": token})
