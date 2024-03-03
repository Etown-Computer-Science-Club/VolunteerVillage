import json
from jose import jwt
from jose.exceptions import JWTError
from functools import wraps
from flask import request, jsonify, g
from urllib.request import urlopen

AUTH0_DOMAIN = 'henhacks24.us.auth0.com'
API_AUDIENCE = 'https://henhacks24.us.auth0.com/api/v2/'
ALGORITHMS = ["RS256"]


class AuthError(Exception):
    def __init__(self, error, status_code):
        self.error = error
        self.status_code = status_code


def requires_auth(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = get_token_auth_header()
        try:
            payload = verify_decode_jwt(token)
            g.user = payload  # Attach the payload to Flask's global object
        except AuthError as e:
            return jsonify(e.error), e.status_code
        return f(*args, **kwargs)
    return decorated


def get_token_auth_header():
    """Obtains the access token from the Authorization Header"""
    auth = request.headers.get("Authorization", None)
    if not auth:
        raise AuthError({"code": "authorization_header_missing",
                        "description": "Authorization header is expected."}, 401)
    parts = auth.split()
    if parts[0].lower() != "bearer":
        raise AuthError({"code": "invalid_header",
                        "description": "Authorization header must start with Bearer."}, 401)
    elif len(parts) == 1:
        raise AuthError({"code": "invalid_header",
                        "description": "Token not found."}, 401)
    elif len(parts) > 2:
        raise AuthError({"code": "invalid_header",
                        "description": "Authorization header must be Bearer token."}, 401)
    token = parts[1]
    return token


def verify_decode_jwt(token):
    """Decodes the JWT Token"""
    jsonurl = urlopen(f"https://{AUTH0_DOMAIN}/.well-known/jwks.json")
    jwks = json.loads(jsonurl.read())
    try:
        unverified_header = jwt.get_unverified_header(token)
    except JWTError:
        raise AuthError({"code": "invalid_header",
                        "description": "Invalid token header."}, 400)

    rsa_key = {}
    if 'kid' not in unverified_header:
        raise AuthError({"code": "invalid_header",
                        "description": "Authorization malformed."}, 401)

    for key in jwks["keys"]:
        if key["kid"] == unverified_header["kid"]:
            rsa_key = {
                "kty": key["kty"],
                "kid": key["kid"],
                "use": key["use"],
                "n": key["n"],
                "e": key["e"]
            }
    if rsa_key:
        try:
            payload = jwt.decode(
                token,
                rsa_key,
                algorithms=ALGORITHMS,
                audience=API_AUDIENCE,
                issuer=f"https://{AUTH0_DOMAIN}/"
            )
            return payload
        except jwt.ExpiredSignatureError:
            raise AuthError(
                {"code": "token_expired", "description": "Token expired."}, 401)
        except jwt.JWTClaimsError:
            raise AuthError(
                {"code": "invalid_claims", "description": "Incorrect claims, please check the audience and issuer."}, 401)
        except Exception:
            raise AuthError(
                {"code": "invalid_token", "description": "Unable to parse authentication token."}, 400)
    raise AuthError({"code": "invalid_header",
                    "description": "Unable to find appropriate key."}, 400)
