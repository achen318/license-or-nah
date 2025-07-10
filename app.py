from flask import Flask, render_template, request, jsonify
import pandas as pd
from pickle import load

with open("models/forest_model.pickle", "rb") as f:
    forest_model = load(f)

FEATURES = [
    "Gender",
    "Age Group",
    "Race",
    "Training",
    "Signals",
    "Yield",
    "Speed Control",
    "Night Drive",
    "Road Signs",
    "Steer Control",
    "Mirror Usage",
    "Confidence",
    "Parking",
    "Theory Test",
    "Reactions",
]

app = Flask(__name__)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = pd.DataFrame([request.get_json()])
        data_used = data[FEATURES]

        pred = forest_model.predict(data_used)

        return jsonify({"prediction": bool(pred[0])})

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": str(e)}), 400


if __name__ == "__main__":
    app.run(debug=True)
