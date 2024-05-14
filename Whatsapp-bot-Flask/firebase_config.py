import firebase_admin
from firebase_admin import credentials, storage

cred = credentials.Certificate("")
firebase_admin.initialize_app(cred, {
    'storageBucket': ''
})

bucket = storage.bucket()