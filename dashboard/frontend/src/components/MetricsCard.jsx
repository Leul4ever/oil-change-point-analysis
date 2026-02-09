import React from 'react';

const MetricsCard = ({ title, value, subValue, color }) => {
    return (
        <div className="card" style={{ borderLeftColor: color }}>
            <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                {title}
            </h3>
            <div style={{ fontSize: '1.875rem', fontWeight: 'bold' }}>{value}</div>
            <div style={{ color: color, fontSize: '0.875rem', marginTop: '0.25rem' }}>{subValue}</div>
        </div>
    );
};

export default MetricsCard;
