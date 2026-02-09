from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
import os

app = Flask(__name__)
CORS(app)

# Path configuration
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_PATH = os.path.join(BASE_DIR, '../../data/raw/BrentOilPrices.csv')
EVENTS_PATH = os.path.join(BASE_DIR, '../../data/raw/events.csv')

def load_data():
    df = pd.read_csv(DATA_PATH)
    df['Date'] = pd.to_datetime(df['Date'], dayfirst=True)
    df = df.sort_values('Date')
    return df

@app.route('/api/prices', methods=['GET'])
def get_prices():
    try:
        df = load_data()
        # To keep payload small, we'll send it as a list of dicts
        # Formatting dates for JSON
        data = df[['Date', 'Price']].copy()
        data['Date'] = data['Date'].dt.strftime('%Y-%m-%d')
        return jsonify(data.to_dict(orient='records'))
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/change-points', methods=['GET'])
def get_change_points():
    # Hardcoded based on Task 2 results for demonstration
    # In a production app, these would be loaded from a results database or file
    return jsonify({
        "change_points": [
            {
                "date": "2021-12-05",
                "label": "Global Energy Crisis Shift",
                "mu_before": 62.10,
                "mu_after": 99.31,
                "percentage_change": 60.0
            }
        ]
    })

@app.route('/api/events', methods=['GET'])
def get_events():
    try:
        df = pd.read_csv(EVENTS_PATH)
        # Filter for events within our analysis period (2014-2022)
        # Assuming events.csv has Date, Event, Description
        return jsonify(df.to_dict(orient='records'))
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy"}), 200

if __name__ == '__main__':
    app.run(debug=True, port=8501)
