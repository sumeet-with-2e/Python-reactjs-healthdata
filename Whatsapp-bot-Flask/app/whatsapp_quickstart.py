import json
import os
import requests
import aiohttp
import asyncio
from dotenv import load_dotenv

# Specify the path to the .env.local file
dotenv_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), '.env.local')

# Load environment variables from the .env.local file
load_dotenv(dotenv_path)

# Retrieve environment variables
ACCESS_TOKEN = os.getenv("ACCESS_TOKEN")
RECIPIENT_WAID = os.getenv("RECIPIENT_WAID")
PHONE_NUMBER_ID = os.getenv("PHONE_NUMBER_ID")
VERSION = os.getenv("VERSION")
APP_ID = os.getenv("APP_ID")
APP_SECRET = os.getenv("APP_SECRET")

# Print environment variables for verification
print("VERSION:", VERSION)
print("ACCESS_TOKEN:", ACCESS_TOKEN)
print("RECIPIENT_WAID:", RECIPIENT_WAID)

# Start the conversation with the user
def start_conversation():
    url = f"https://graph.facebook.com/{VERSION}/{PHONE_NUMBER_ID}/messages"
    headers = {
        "Authorization": "Bearer " + ACCESS_TOKEN,
        "Content-Type": "application/json",
    }
    data = {
        "messaging_product": "whatsapp",
        "to": RECIPIENT_WAID,
        "type": "template",
        "template": {"name": "turmerik_new_user", "language": {"code": "en_US"}},
    }
    response = requests.post(url, headers=headers, json=data)
    return response


# # Send the message
# response = start_conversation()
# print(response.status_code)
# print(response.json())
 
# # Get the message status
# def get_text_message_input(recipient, text):
#     return json.dumps(
#         {
#             "messaging_product": "whatsapp",
#             "recipient_type": "individual",
#             "to": recipient,
#             "type": "text",
#             "text": {"preview_url": False, "body": text},
#         }
#     )

# # Continue the conversation with the user
# def send_message(data):
#     headers = {
#         "Content-type": "application/json",
#         "Authorization": f"Bearer {ACCESS_TOKEN}",
#     }

#     url = f"https://graph.facebook.com/{VERSION}/{PHONE_NUMBER_ID}/messages"

#     response = requests.post(url, data=data, headers=headers)
#     if response.status_code == 200:
#         print("Status:", response.status_code)
#         print("Content-type:", response.headers["content-type"])
#         print("Body:", response.text)
#         return response
#     else:
#         print(response.status_code)
#         print(response.text)
#         return response


# data = get_text_message_input(
#     recipient=RECIPIENT_WAID, text="Hello, this is a test message."
# )

# response = send_message(data)



# --------------------------------------------------------------
# Send a custom text WhatsApp message asynchronously
# --------------------------------------------------------------


# Does not work with Jupyter!
# async def send_message(data):
#     headers = {
#         "Content-type": "application/json",
#         "Authorization": f"Bearer {ACCESS_TOKEN}",
#     }

#     async with aiohttp.ClientSession() as session:
#         url = "https://graph.facebook.com" + f"/{VERSION}/{PHONE_NUMBER_ID}/messages"
#         try:
#             async with session.post(url, data=data, headers=headers) as response:
#                 if response.status == 200:
#                     print("Status:", response.status)
#                     print("Content-type:", response.headers["content-type"])

#                     html = await response.text()
#                     print("Body:", html)
#                 else:
#                     print(response.status)
#                     print(response)
#         except aiohttp.ClientConnectorError as e:
#             print("Connection Error", str(e))


# def get_text_message_input(recipient, text):
#     return json.dumps(
#         {
#             "messaging_product": "whatsapp",
#             "recipient_type": "individual",
#             "to": recipient,
#             "type": "text",
#             "text": {"preview_url": False, "body": text},
#         }
#     )


# data = get_text_message_input(
#     recipient=RECIPIENT_WAID, text="Hello, this is a test message."
# )

# loop = asyncio.get_event_loop()
# loop.run_until_complete(send_message(data))
# loop.close()
