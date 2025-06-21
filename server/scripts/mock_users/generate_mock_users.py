import json
import random
import uuid
from typing import List

from faker import Faker

fake = Faker()

NUM_USERS = 10

ROLE_TYPES = ['MENTOR', 'MENTEE']


# WARNING: If you generate a new users, you need to update the mentor ids in profiles.json
def generate_user():
    return {
        "id": str(uuid.uuid4()),
        "userName": fake.user_name(),
        "password": fake.password(length=10),
        "name": {
            "title": random.choice(["Mr.", "Ms.", "Mrs.", "Dr.", "Prof."]),
            "firstName": fake.first_name(),
            "middleName": fake.first_name(),
            "lastName": fake.last_name()
        },
        "contact": {
            "email": fake.email(),
            "phoneNumber": fake.phone_number(),
            "mobileNumber": fake.phone_number()
        },
        "address": {
            "city": fake.city(),
            "country": fake.country()
        },
        "roleType": random.choice(ROLE_TYPES)
    }


def generate_users(num_users: int):
    return [generate_user() for _ in range(num_users)]


def save_to_json(users: List, filename):
    with open(filename, "w") as f:
        json.dump(users, f, indent=2)


if __name__ == "__main__":
    users = generate_users(NUM_USERS)
    save_to_json(users, "resources/mock_users.json")
    print(f"Generated {NUM_USERS} mock users and saved to 'mock_users.json'")