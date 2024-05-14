import logging
from flask import current_app, jsonify
from firebase_config import bucket
from io import BytesIO, StringIO
import json
import requests
import pandas as pd

# from app.services.openai_service import generate_response
import re

def log_http_response(response):
    logging.info(f"Status: {response.status_code}")
    logging.info(f"Content-type: {response.headers.get('content-type')}")
    logging.info(f"Body: {response.text}")


def get_text_message_input(recipient, text):
    return json.dumps(
        {
            "messaging_product": "whatsapp",
            "recipient_type": "individual",
            "to": recipient,
            "type": "text",
            "text": {"preview_url": False, "body": text},
        }
    )

user_dict = {}

def get_all_users():
    blob = bucket.blob('patient_data.csv')
    if not blob.exists():
        print("File not found in the specified path.")
        return None
    csv_data = blob.download_as_string()
    # Read the CSV data into a pandas DataFrame
    all_users = pd.read_csv(BytesIO(csv_data))
    return all_users

def post_user_data(all_users):
    blob = bucket.blob('patient_data.csv')
    updated_csv = all_users.to_csv(index=False)
    # Upload the updated CSV back to Firebase Storage
    blob.upload_from_string(updated_csv, content_type='text/csv')

def generate_response(response):
    # Return text in uppercase
    response = response.lower()
    if response[0:11] == "my name is ":
        user_dict['name'] = response[11:]
        return f"Nice to meet you {response[11:]}, Can you share your date of birth? Use the format 'my date of birth is mm/dd/yyyy'"
    elif response[0:20] == "my date of birth is ":
        user_dict['dob'] = response[20:]
        return f"Thank you for sharing your date of birth. Can you share your Gender? Use the format 'my gender is ...'"
    elif response[0:13] == "my gender is ":
        user_dict['gender'] = response[13:]
        return f"Thank you for sharing your gender. Can you share your address? Use the format 'my address is ...'. Use semicolon(;) instead of commas(,)."
    elif response[0:14] == "my address is ":
        user_dict['address'] = response[14:]
        return f"Thank you for sharing your address. Can you share your Medical History (e.g., allergies, previous surgeries)? Use the format 'my medical history is ...'. Use semicolon(;) instead of commas(,)"
    elif response[0:22] == "my medical history is ":
        user_dict['medical_history'] = response[22:]
        return f"Thank you for sharing your Medical History. Can you share your current medications? Use the format 'my current medications ...'. Use semicolon(;) instead of commas(,)"
    elif response[0:23] == "my current medications ":
        user_dict['current_medications'] = response[23:]
        return f"Thank you for sharing your current medications. If you have entered all the details, please type 'done', else use the same format to update any of the details you provided."
    elif response == "done":
        if user_dict.get('name') and user_dict.get('dob') and user_dict.get('gender') and user_dict.get('address') and user_dict.get('medical_history') and user_dict.get('current_medications'):
            all_users = get_all_users()
            all_users = pd.concat([all_users, pd.DataFrame([user_dict])], ignore_index=True)
            post_user_data(all_users)
            return f"Thank you for sharing all the details. We will get back to you soon."
        else:
            return f"Please provide all the details. If you have entered all the details, please type 'done', else use the same format to update any of the details you provided."
                                   


def send_message(data):
    headers = {
        "Content-type": "application/json",
        "Authorization": f"Bearer {current_app.config['ACCESS_TOKEN']}",
    }

    url = f"https://graph.facebook.com/{current_app.config['VERSION']}/{current_app.config['PHONE_NUMBER_ID']}/messages"

    try:
        response = requests.post(
            url, data=data, headers=headers, timeout=10
        )  # 10 seconds timeout as an example
        response.raise_for_status()  # Raises an HTTPError if the HTTP request returned an unsuccessful status code
    except requests.Timeout:
        logging.error("Timeout occurred while sending message")
        return jsonify({"status": "error", "message": "Request timed out"}), 408
    except (
        requests.RequestException
    ) as e:  # This will catch any general request exception
        logging.error(f"Request failed due to: {e}")
        return jsonify({"status": "error", "message": "Failed to send message"}), 500
    else:
        # Process the response as normal
        log_http_response(response)
        return response


def process_text_for_whatsapp(text):
    # Remove brackets
    pattern = r"\【.*?\】"
    # Substitute the pattern with an empty string
    text = re.sub(pattern, "", text).strip()

    # Pattern to find double asterisks including the word(s) in between
    pattern = r"\*\*(.*?)\*\*"

    # Replacement pattern with single asterisks
    replacement = r"*\1*"

    # Substitute occurrences of the pattern with the replacement
    whatsapp_style_text = re.sub(pattern, replacement, text)

    return whatsapp_style_text


def process_whatsapp_message(body):
    wa_id = body["entry"][0]["changes"][0]["value"]["contacts"][0]["wa_id"]
    name = body["entry"][0]["changes"][0]["value"]["contacts"][0]["profile"]["name"]

    message = body["entry"][0]["changes"][0]["value"]["messages"][0]
    message_body = message["text"]["body"]

    # TODO: implement custom function here
    response = generate_response(message_body)

    # OpenAI Integration
    # response = generate_response(message_body, wa_id, name)
    # response = process_text_for_whatsapp(response)

    data = get_text_message_input(current_app.config["RECIPIENT_WAID"], response)
    send_message(data)


def is_valid_whatsapp_message(body):
    """
    Check if the incoming webhook event has a valid WhatsApp message structure.
    """
    return (
        body.get("object")
        and body.get("entry")
        and body["entry"][0].get("changes")
        and body["entry"][0]["changes"][0].get("value")
        and body["entry"][0]["changes"][0]["value"].get("messages")
        and body["entry"][0]["changes"][0]["value"]["messages"][0]
    )
