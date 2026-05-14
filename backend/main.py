from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

REVIEWS_FILE = "reviews.json"
USED_REVIEWS_FILE = "used_reviews.json"


def load_json(file_name):
    with open(file_name, "r", encoding="utf-8") as file:
        return json.load(file)


def save_json(file_name, data):
    with open(file_name, "w", encoding="utf-8") as file:
        json.dump(data, file, indent=4)


@app.get("/get-review")
def get_review():

    reviews = load_json(REVIEWS_FILE)
    used_reviews = load_json(USED_REVIEWS_FILE)

    used_ids = [review["id"] for review in used_reviews]

    for review in reviews:

        if review["id"] not in used_ids:

            used_reviews.append(review)

            save_json(USED_REVIEWS_FILE, used_reviews)

            return review

    return {
        "message": "No reviews left"
    }