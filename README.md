# 🛢️ Brent Oil Price Change Point Analysis

> **A Professional Bayesian Modeling & Interactive Dashboard Project**

![Dashboard Preview](https://raw.githubusercontent.com/Leul4ever/oil-change-point-analysis/task-3/dashboard/preview.png)

This project provides an end-to-end framework for analyzing structural breaks in historical Brent crude oil prices. It combines the statistical rigor of **Bayesian Change Point Detection** with a high-performance **Interactive React Dashboard** for exploring geopolitical impacts on global energy markets.

---

## 🌟 Executive Summary
The global oil market is influenced by complex geopolitical shifts, economic cycles, and sudden shocks. This project identifies when these shifts occur using **MCMC sampling (PyMC)** to detect latent change points. By mapping statistical breaks to curated historical data, we provide a deep quantitative and qualitative perspective on market volatility.

## 🚀 Key Features

### 💻 Interactive Dashboard (V3.1)
- **Real-Time Data Explorer**: Filter through 30+ years of Brent oil prices with precision date controls.
- **Analytical Impact Modals**: Click any significant event to perform an instant **Impact Analysis** (Average Price Before/After, % Change, Market Response).
- **Permanent Event Markers**: Visual vertical markers correlate price spikes directly with historical events.
- **Advanced Filtering**: Categorical controls for event types (Geopolitical, Economic, Supply) and impact levels.
- **Terminal Insights**: Qualitative cards showing Bayesian model results in a professional monospaced report format.

### 🧠 Bayesian Analysis Engine
- **MCMC Sampling**: Uses No-U-Turn Sampler (NUTS) to identify $\tau$ (the switch point).
- **Regime Quantification**: Statistically measures the shift in mean price ($\mu$) and variance ($\sigma$) between market eras.
- **EDA Rigor**: Integrated stationarity tests (ADF), seasonality analysis, and volatility clustering.

---

## 🛠️ Tech Stack
- **Frontend**: React (Vite), Recharts, Lucide Icons, Glassmorphism UI.
- **Backend**: Flask API (Python), Pandas, NumPy.
- **Analysis**: PyMC (Bayesian Inference), Statsmodels, Matplotlib/Seaborn.
- **Environment**: Virtualenv / Anaconda.

---

## 📂 Project Structure
```text
oil-change-point-analysis/
├── data/
│   ├── raw/               # BrentOilPrices.csv, events.csv
│   └── processed/         # Model outputs and change point results
├── notebooks/             # Bayesian Modeling & EDA Notebooks
├── src/                   # Core Python Analysis Modules
├── dashboard/             
│   ├── backend/           # Flask API Implementation
│   └── frontend/          # React App (Modern UI)
├── Docs/                  # Task Reports (1, 2, 3) & Manuals
├── README.md              # Project Portal
```

---

## ⚡ Quick Start

### 1. Prerequisites
- Python 3.9+ 
- Node.js & npm (for Dashboard)

### 2. Analysis Setup
```bash
git clone https://github.com/Leul4ever/oil-change-point-analysis.git
cd oil-change-point-analysis
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 3. Launch Dashboard
**Backend:**
```bash
cd dashboard/backend
export FLASK_APP=app.py
flask run --port=8501
```

**Frontend:**
```bash
cd dashboard/frontend
npm install
npm run dev
```
Visit `http://localhost:5173` to explore!

---

## 📑 Documentation
- [**Task 1: Foundation**](Docs/task1.md) - Setup & Data Preprocessing.
- [**Task 2: Bayesian Modeling**](Docs/task2.md) - MCMC Inference & Results.
- [**Task 3: Dashboard V3.1**](Docs/task3.md) - Full-Stack Interactive Implementation.

---
*Created as part of the Advanced Data Analysis Portfolio.*
