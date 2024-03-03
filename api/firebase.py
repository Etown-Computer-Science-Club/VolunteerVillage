import firebase_admin
from firebase_admin import credentials, storage
import json
import os
import base64
from dotenv import load_dotenv

load_dotenv()

service_account_info = json.loads(base64.b64decode(
    os.getenv('FIREBASE_SERVICE_ACCOUNT_BASE64')).decode('utf-8')
)
cred = credentials.Certificate(service_account_info)
firebase_admin.initialize_app(cred, {
    'storageBucket': 'volunteer-village-94f65.appspot.com'
})


def upload_profile_picture(file_path, user_id):
    """
    Uploads a profile picture to Firebase Storage.

    Args:
    - file_path: The path to the profile picture on the local system.
    - user_id: The user's ID, used to name the file in Storage.

    Returns:
    - The URL to the uploaded profile picture.
    """
    bucket = storage.bucket()
    blob = bucket.blob(f'profile_pictures/{user_id}')
    blob.upload_from_filename(file_path)

    # Make the file publicly accessible
    blob.make_public()

    # Return the file's URL
    return blob.public_url
