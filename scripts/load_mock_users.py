import json
from typing import List, Dict

import requests
import argparse


def load_users_from_json(filename: str) -> List[Dict]:
    with open(filename, 'r') as f:
        return json.load(f)


def send_users_to_api(api_url: str, users: List):
    for i, user in enumerate(users):
        try:
            response = requests.post(api_url, json=user)
            print(f"User {i + 1}: {user['userName']}")
            print(f"Response Status: {response.status_code}")
            print(f"Response Body: {response.text}\n")
        except requests.exceptions.RequestException as e:
            print(f"Request failed for user {user['userName']}: {e}\n")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Send mock users to API endpoint.')
    parser.add_argument('endpoint', type=str, help='API endpoint URL, e.g. localhost:8210')
    parser.add_argument('--file', type=str, default='mock_users.json', help='JSON file with mock users '
                                                                            '(e.g. mock_users.json)')

    args = parser.parse_args()
    users = load_users_from_json(args.file)
    send_users_to_api(f"http://{args.endpoint}/api/user/createUser", users)
    print(f"Finished sending {len(users)} users.")
