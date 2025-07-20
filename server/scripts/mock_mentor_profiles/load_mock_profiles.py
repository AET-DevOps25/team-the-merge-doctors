#!/usr/bin/env python3
import json
import requests
from pathlib import Path

# Change the endpoint if it will be used for production
BASE_URL = "http://localhost:8310/api/mentorship"
BASE_URL
ENDPOINTS = {
    "skill":    f"{BASE_URL}/createSkill",
    "category": f"{BASE_URL}/createCategory",
    "profile":  f"{BASE_URL}/createMentorProfile",
    "application": f"{BASE_URL}/createApplication",
}
HEADERS = {"Content-Type": "application/json"}


def load_json(filepath: str):
    path = Path(filepath)
    if not path.exists():
        raise FileNotFoundError(f"{filepath} not found")
    return json.loads(path.read_text())


def post_skill(skill):
    payload = {"id": skill["id"], "skill": skill["name"]}
    return requests.post(ENDPOINTS["skill"], json=payload, headers=HEADERS, verify=False)


def post_category(category):
    payload = {"id": category["id"], "category": category["name"]}
    return requests.post(ENDPOINTS["category"], json=payload, headers=HEADERS, verify=False)


def post_profile(profile):
    payload = {"mentorProfile": profile}
    return requests.post(ENDPOINTS["profile"], json=payload, headers=HEADERS, verify=False)

def post_application(application):
    payload = {"mentorId": application["mentorId"], "menteeId": application["menteeId"], "applicationMessage": application["applicationMessage"]}
    return requests.post(ENDPOINTS["application"], json=payload, headers=HEADERS, verify=False)


if __name__ == "__main__":
    skills = load_json("./skills.json")
    categories = load_json("./categories.json")
    profiles = load_json("./profiles.json")
    applications = load_json('./applications.json')

    print("=== Creating Skills ===")
    for s in skills:
        print(s)
        r = post_skill(s)
        print(f"{s['name']}: {r.status_code} {r.text}")

    print("\n=== Creating Categories ===")
    for c in categories:
        r = post_category(c)
        print(f"{c['name']}: {r.status_code} {r.text}")

    print("\n=== Creating Mentor Profiles ===")
    for p in profiles:
        mid = p["mentorId"]
        r = post_profile(p)
        print(f"Mentor {mid}: {r.status_code} {r.text}")

    print("\n=== Creating Applications ===")
    for application in applications:
        r = post_application(application)
        print(f"Mentor {application["mentorId"]}, Mentee {application["menteeId"]}: {r.status_code} {r.text}")
