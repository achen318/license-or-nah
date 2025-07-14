# license-or-nah

LicenseOrNah uses questionable machine learning to determine if you will get a driver's license, or nah.

## Overview

This project utilizes a random forest model to predict whether a person will pass a driver's license test. Features include age, training, confidence, and theory test. The dataset is from [Kaggle](https://www.kaggle.com/datasets/ferdinandbaidoo/drivers-license-test-scores-data/).

To interact with the model, a Flask web application is provided. The frontend was developed using vanilla HTML, CSS, and JavaScript.

Data exploration and model training was done on a Jupyter notebook, with an 87% accuracy achieved on the test set.

## Installation

1. Run `pip3 install -r requirements.txt` to install packages.
2. Use the notebook in `models/drivers.ipynb` to train the model.
3. Run `python3 app.py` to start the Flask app.
