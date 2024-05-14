import firebase_admin
from firebase_admin import credentials, storage

cred = credentials.Certificate("turmerik-whatsapp-bot-firebase-adminsdk-kfdbi-174a20d593.json")
firebase_admin.initialize_app(cred, {
    'storageBucket': 'turmerik-whatsapp-bot.appspot.com'
})

bucket = storage.bucket()