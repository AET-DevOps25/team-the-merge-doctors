# !/usr/bin/env python3
import json
from typing import Dict, List

import requests
from pathlib import Path

# Change the endpoint if it will be used for production
BASE_URL = "https://mentor-pulse-devops25.student.k8s.aet.cit.tum.de/api/mentorship"
ENDPOINTS = {
    "skill": f"{BASE_URL}/createSkill",
    "category": f"{BASE_URL}/createCategory",
}
HEADERS = {"Content-Type": "application/json"}


def load_json(filepath: str):
    path = Path(filepath)
    if not path.exists():
        raise FileNotFoundError(f"{filepath} not found")
    return json.loads(path.read_text())


def post_skill(skill):
    payload = {"id": skill["id"], "skill": skill["skill"]}
    return requests.post(ENDPOINTS["skill"], json=payload, headers=HEADERS)


def post_category(category):
    payload = {"id": category["id"], "category": category["name"]}
    return requests.post(ENDPOINTS["category"], json=payload, headers=HEADERS)


def eliminate_existent_skills(skills: Dict):
    try:
        existing_skills: List[Dict] = requests.get(f"{BASE_URL}/listSkills", json={}, headers=HEADERS).json()['skills']
    except Exception as err:
        print(f"Unable to fetch existing skills: {err}")
        raise err
    existing_skill_ids = [s['id'] for s in existing_skills]
    missing_skills = [skill for skill in skills if skill['id'] not in existing_skill_ids]

    return missing_skills


def eliminate_existent_categories(categories: List):
    try:
        existing_categories: List[Dict] = requests.get(f"{BASE_URL}/listCategories", json={}, headers=HEADERS).json()[
            'categories']
    except Exception as err:
        print(f"Unable to fetch existing categories: {err}")
        raise err
    existing_category_ids = [category['id'] for category in existing_categories]
    missing_categories = [category for category in categories if category['id'] not in existing_category_ids]

    return missing_categories


if __name__ == "__main__":

    skills = eliminate_existent_skills(load_json("skills.json"))
    categories = eliminate_existent_categories(load_json("categories.json"))

    print("=== Creating Skills ===")
    for skill in skills:
        print(skill)
        r = post_skill(skill)
        print(f"{skill['skill']}: {r.status_code} {r.text}")

    print("\n=== Creating Categories ===")
    for c in categories:
        r = post_category(c)
        print(f"{c['name']}: {r.status_code} {r.text}")
