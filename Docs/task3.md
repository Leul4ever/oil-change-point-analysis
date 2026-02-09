# Task 3 Report: Interactive Dashboard Development (V3.1)

## 1. Objective
The goal of Task 3 was to bridge the gap between complex Bayesian statistical modeling and actionable user insights. We aimed to build a high-performance, interactive dashboard that allows users to explore Brent oil price trends and quantify the impact of major global events.

## 2. Technical Architecture
The dashboard is built using a modern full-stack approach for speed and scalability:
- **Frontend**: React (Vite) + Recharts for interactive SVG charting.
- **Backend**: Flask API serving data processed via Pandas and NumPy.
- **UI Design**: A custom Dark-themed CSS system using **Glassmorphism**, sophisticated typography (**Inter/Outfit**), and smooth CSS animations.
- **Data Flow**: The Flask backend enriches raw oil prices with events metadata and Bayesian change point results, serving them via RESTful endpoints.

## 3. Key Features & Iterations

### 📊 Interactive Data Exploration (V1 & V2)
- **Advanced Date Filtering**: Users can zoom into specific historical regimes (e.g., Post-2008 Crash or 2022 Energy Crisis).
- **Responsive Metrics**: Real-time display of the Current Price Regime, Historical Baseline, and detected change points.
- **Fluid Sidebar**: A scrollable list of significant events that correlates visually with the main timeline.

### 🧪 Analytical Depth (V3 Refresh)
- **Permanent Event Markers**: Added vertical markers to the chart timeline to facilitate permanent visual correlation between price spikes and global shocks.
- **Impact Analysis Modals**: Clicking an event opens a dedicated "Impact Tool" that calculates the **Average Price 30 days Before vs After** and the total **% Price Shift**.
- **Categorical Filters**: Users can filter the event list by **Category** (Geopolitical, Economic, Supply, Pandemic) and **Impact Level** (High, Medium, Low).

### 🖋️ Qualitative Reporting (V3.1 Final)
- **Bayesian Insight Cards**: Integrated a terminal-style report below the chart. It provides the statistical output of the Task 2 PyMC model in a human-readable format.
- **Causal Breakdown**: A dedicated section explaining the "Why" behind the active event, providing historical context and model quantification.

## 4. Visual Excellence & Responsiveness
The dashboard is fully responsive across all devices:
- **Desktop**: A three-pane layout featuring metrics, a large hero chart, and a deep event sidebar.
- **Tablets**: Balanced grid layout with optimized padding for touch interactivity.
- **Mobile**: A single-column "stream" view, stacking metrics and insights for clean consumption on the go.

## 5. Verification & Performance
- **Data Precision**: All impact calculations are performed in real-time based on the same dataset used in the Task 2 Bayesian inference.
- **Performance**: The dashboard utilizes `useMemo` for heavy filtering computations, ensuring 60fps interaction even during complex date range shifts.
- **Design Consistency**: Unified primary blue theme across terminal reports, modal borders, and chart reference lines.

---
**Summary**: Task 3 transformed raw statistical outputs into a professional-grade analytical tool, satisfying all advanced interactivity and UI requirements.
