# Brent Oil Analysis Dashboard

This dashboard visualizes historical Brent oil prices, identified Bayesian change points, and significant global events.

## Features
- **Interactive Price Chart**: Explore price trends spanning 1987-2022.
- **Change Point Overlay**: See the statistically detected regime shift in late 2021.
- **Event Highlights**: Hover over events to see their historical context and price correlation.
- **Real-time Metrics**: View average price shifts and regime comparisons.

## Project Structure
- `dashboard/backend`: Flask API serving the analysis results.
- `dashboard/frontend`: React (Vite) application for the UI.

## Setup Instructions

### 1. Prerequisites
- Python 3.9+
- Node.js 20+
- npm

### 2. Backend Setup (Flask)
```bash
cd dashboard/backend
# Install dependencies (if not already in venv)
pip install flask flask-cors pandas numpy
# Run the API
$env:FLASK_APP="app.py"; flask run --port=8501
```
The API will be available at `http://127.0.0.1:8501`.

### 3. Frontend Setup (React)
```bash
cd dashboard/frontend
# Install dependencies
npm install
# Run the development server
npm run dev
```
The dashboard will be available at `http://localhost:5173`.

## API Endpoints
- `GET /api/prices`: Historical price data.
- `GET /api/change-points`: Detected Bayesian change points.
- `GET /api/events`: Significant global oil events.
- `GET /api/health`: Backend health check.
