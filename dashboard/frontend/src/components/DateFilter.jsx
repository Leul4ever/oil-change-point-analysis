import React from 'react';
import { Calendar } from 'lucide-react';

const DateFilter = ({
    startDate,
    endDate,
    onStartChange,
    onEndChange,
    onReset,
    selectedCategory,
    onCategoryChange,
    selectedImpact,
    onImpactChange
}) => {
    return (
        <div className="filters-container">
            <div className="date-filter-toolbar">
                <div className="filter-group">
                    <label><Calendar size={14} /> From</label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => onStartChange(e.target.value)}
                    />
                </div>
                <div className="filter-group">
                    <label><Calendar size={14} /> To</label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => onEndChange(e.target.value)}
                    />
                </div>

                <div className="divider"></div>

                <div className="filter-group">
                    <label>Category</label>
                    <select value={selectedCategory} onChange={(e) => onCategoryChange(e.target.value)}>
                        <option value="All">All Categories</option>
                        <option value="Geopolitical">Geopolitical</option>
                        <option value="Economic">Economic</option>
                        <option value="Supply">Supply</option>
                        <option value="Pandemic">Pandemic</option>
                        <option value="OPEC">OPEC</option>
                    </select>
                </div>

                <div className="filter-group">
                    <label>Impact</label>
                    <select value={selectedImpact} onChange={(e) => onImpactChange(e.target.value)}>
                        <option value="All">All Impacts</option>
                        <option value="High">High Impact</option>
                        <option value="Medium">Medium Impact</option>
                        <option value="Low">Low Impact</option>
                    </select>
                </div>

                <button className="reset-btn" onClick={onReset}>Reset Analysis</button>
            </div>

            <style jsx>{`
        .filters-container {
          margin-bottom: 2.5rem;
        }
        .date-filter-toolbar {
          display: flex;
          gap: 1.5rem;
          align-items: center;
          background: var(--bg-card);
          padding: 0.75rem 1.5rem;
          border-radius: 1rem;
          border: 1px solid var(--border);
          width: fit-content;
          flex-wrap: wrap;
        }
        .divider {
          width: 1px;
          height: 2rem;
          background: var(--border);
          margin: 0 0.5rem;
        }
        .filter-group {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .filter-group label {
          font-size: 0.7rem;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .filter-group input, .filter-group select {
          background: rgba(15, 23, 42, 0.5);
          border: 1px solid var(--border);
          color: var(--text-main);
          padding: 0.5rem 0.75rem;
          border-radius: 0.5rem;
          outline: none;
          font-family: inherit;
          font-size: 0.85rem;
          transition: all 0.2s;
        }
        .filter-group select {
          cursor: pointer;
          appearance: none;
          padding-right: 2rem;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 0.5rem center;
        }
        .filter-group input:focus, .filter-group select:focus {
          border-color: var(--primary);
          background: rgba(15, 23, 42, 0.8);
        }
        .reset-btn {
          background: rgba(96, 165, 250, 0.1);
          border: 1px solid rgba(96, 165, 250, 0.2);
          color: var(--primary);
          padding: 0.5rem 1.25rem;
          border-radius: 0.5rem;
          cursor: pointer;
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.025em;
          transition: all 0.2s;
          margin-left: auto;
        }
        .reset-btn:hover {
          background: var(--primary);
          color: white;
          transform: translateY(-1px);
        }
      `}</style>
        </div>
    );
};

export default DateFilter;
