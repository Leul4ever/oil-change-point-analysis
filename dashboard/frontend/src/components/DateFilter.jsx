import React from 'react';
import { Calendar } from 'lucide-react';

const DateFilter = ({ startDate, endDate, onStartChange, onEndChange, onReset }) => {
    return (
        <div className="date-filter-container">
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
            <button className="reset-btn" onClick={onReset}>Reset Analysis</button>

            <style jsx>{`
        .date-filter-container {
          display: flex;
          gap: 2rem;
          align-items: center;
          margin-bottom: 2.5rem;
          background: var(--bg-card);
          padding: 0.75rem 1.5rem;
          border-radius: 1rem;
          border: 1px solid var(--border);
          width: fit-content;
        }
        .filter-group {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .filter-group label {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .filter-group input {
          background: rgba(15, 23, 42, 0.5);
          border: 1px solid var(--border);
          color: var(--text-main);
          padding: 0.5rem 0.75rem;
          border-radius: 0.5rem;
          outline: none;
          font-family: inherit;
          transition: border-color 0.2s;
        }
        .filter-group input:focus {
          border-color: var(--primary);
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
