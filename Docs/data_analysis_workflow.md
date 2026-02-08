# Data Analysis Workflow: Brent Oil Price Change Point Analysis

This document outlines the systematic process for analyzing Brent oil prices, identifying structural breaks, and communicating findings to stakeholders.

---

## 1. Data Collection & Preprocessing
The foundation of the study is daily historical price data.
- **Source**: Historical Brent crude oil prices (1987-2022).
- **Date Handling**: Standardize formats (DD-MM-YYYY) and ensure a continuous time series.
- **Missing Values**: Financial markets are closed on weekends and holidays. We use **Forward Filling (ffill)** to represent the last known price, maintaining the temporal spacing.
- **Normalization**: 
  - Raw prices for long-term trend visualization.
  - **Log Returns** ($\ln(P_t / P_{t-1})$) for statistical tests and modeling to achieve stationarity and stabilize variance.

## 2. Exploratory Data Analysis (EDA)
Before modeling, we must understand the data's statistical properties.
- **Time Series Visualization**: Plotting both price levels and returns to identify volatility spikes and obvious regime shifts.
- **Stationarity Testing**: Use the **Augmented Dickey-Fuller (ADF) Test**.
  - *Null Hypothesis ($H_0$)*: The series has a unit root (is non-stationary).
  - *Alternative Hypothesis ($H_1$)*: The series is stationary.
- **Volatility Analysis**: Identifying "volatility clustering," where large price swings are followed by more large swings, common in energy markets.

## 3. Bayesian Change Point Modeling
We use a Bayesian approach to treat the change point date as a probability distribution rather than a fixed point.
- **Framework**: **PyMC** (Python MCMC library).
- **Model Definition**: 
  - **Switch Point ($\tau$)**: Modeled with a `DiscreteUniform` prior across the entire time range.
  - **Regimes**: Two or more regimes defined by different mean ($\mu$) and standard deviation ($\sigma$).
- **Inference**: Using the **NUTS (No-U-Turn Sampler)** to sample the posterior distribution.
- **Diagnostics**: Evaluate convergence using **Trace Plots** and the **Gelman-Rubin statistic ($\hat{R}$)**.

## 4. Insight Generation & Event Correlation
Detected change points are cross-referenced with the `events.csv` dataset.
- **Temporal Alignment**: Do the peaks in the posterior distribution of $\tau$ align within a window of major geopolitical events?
- **Impact Quantification**: Calculate the percentage change in mean price and volatility before vs. after the switch point.

## 5. Communication & Stakeholder Engagement
Results are disseminated through tailored channels:
1. **Investors & Energy Companies**: 
   - **Interactive Dashboard**: Visualizing the "before and after" impact of events.
   - **Weekly Briefings**: Short-form summaries of detected market regime shifts.
2. **Policymakers & Government**: 
   - **White Papers**: Detailed analysis of how geopolitical conflicts impact price stability.
   - **Policy Simulation**: Using historical change points to model potential future shocks.
3. **Academic & Technical Peer Review**: 
   - **Project Wiki/GitHub**: Detailed logs, code, and methodology for reproducibility.

---

## Assumptions & Limitations
1. **Single Switch Assumption**: Simple models often assume a single major switch. Real markets have multiple breaks (requires hierarchical modeling).
2. **Causality vs. Correlation**: A statistical change point does not *prove* an event caused the shift; it identifies the timing of the shift.
3. **Distributional Choice**: We assume a Normal likelihood for returns, though oil prices often exhibit "Heavy Tails" (Leptokurtosis).
4. **Market Lag**: Information absorption time varies; prices might react before (anticipation) or after (lag) an event.
