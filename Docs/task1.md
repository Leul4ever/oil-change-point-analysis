# Task 1: Laying the Foundation for Analysis

This document serves as the primary plan for the Brent Oil Price Analysis project. Detailed statistical assumptions, stakeholder strategies, and event datasets are maintained in supporting documents linked below.

## 1. Analysis Workflow & Deliverables
This project follows a structured Bayesian data science workflow.
- **Workflow Overview**: [See Data Analysis Workflow](data_analysis_workflow.md)
- **Detailed Requirements (Assumptions, Stakeholders, Causality)**: [**See Foundation Details Supplement**](foundation_details.md)
- **Structured Event Data**: [**events.csv**](../data/raw/events.csv)

### Step 1: Data Acquisition & Preprocessing
- **Source**: Daily Brent crude oil prices (1987 – 2022).
- **Processing**: Convert dates to datetime objects, handle gaps via forward-filling, and calculate daily log returns.

### Step 2: Exploratory Data Analysis (EDA)
- **Trend Analysis**: Long-term upward trend with significant volatility spikes.
- **Stationarity Testing**: 
  - **Raw Price**: Non-stationary ($p \approx 0.29$).
  - **Log Returns**: Highly stationary ($p \approx 2.5 \times 10^{-29}$).
- **Volatility Pattern**: Significant clustering (Heteroskedasticity) observed during major events.

### Step 3: Bayesian Change Point Detection
- **Model**: "Switch Point" model implemented in `src/analysis/model.py`.
- **Inference**: Uses PyMC MCMC sampling (NUTS) to identify the probability distribution of the switch date $\tau$.

---

## 2. Model Understanding & Expectations
- **Purpose**: Identify structural breaks where market regimes (mean/variance) shift abruptly.
- **Expected Outputs**: 
  - Probability distribution of the break date.
  - Quantified shifts in price means ($\mu_1 \to \mu_2$) and risk ($\sigma$).
- **Limitations**: The current model assumes a single primary change point; identifying multiple regimes would require hierarchical extensions.

---

## 3. Strategic Considerations
- **Causality**: We rigorously distinguish between temporal correlation and causal impact. [Read our Causal Disclaimer in Foundation Details](foundation_details.md#correlation-vs-causation).
- **Stakeholders**: Results are tailored for Investors, Policymakers, and Analysts. [View Communication Formats](foundation_details.md#3-targeted-communication-strategy).

---

## 4. Key References
1. **Hamilton, J. D. (1989)**. "A New Approach to the Economic Analysis of Nonstationary Time Series..."
2. **Perron, P. (2006)**. "Dealing with Structural Breaks."
3. **PyMC Documentation**: "Bayesian Analysis with Python" - Switch Point models.
