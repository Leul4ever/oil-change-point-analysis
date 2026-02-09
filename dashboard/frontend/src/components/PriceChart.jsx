import React from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer, ReferenceLine, ReferenceArea
} from 'recharts';

const PriceChart = ({ data, changePoints, events, activeEvent }) => {
    // Find the event record for the active date to highlight it
    const activeEventData = events.find(e => e.Date === activeEvent);

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip" style={{
                    backgroundColor: '#1e293b',
                    padding: '10px',
                    border: '1px solid #3b82f6',
                    borderRadius: '4px'
                }}>
                    <p style={{ margin: 0, color: '#94a3b8' }}>{label}</p>
                    <p style={{ margin: 0, color: '#f8fafc', fontWeight: 'bold' }}>
                        Price: ${payload[0].value.toFixed(2)}
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div style={{ width: '100%', height: 450 }}>
            <ResponsiveContainer>
                <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                    <XAxis
                        dataKey="Date"
                        stroke="#94a3b8"
                        tick={{ fontSize: 12 }}
                        minTickGap={50}
                    />
                    <YAxis
                        stroke="#94a3b8"
                        tick={{ fontSize: 12 }}
                        domain={['auto', 'auto']}
                        tickFormatter={(val) => `$${val}`}
                    />
                    <Tooltip content={<CustomTooltip />} />

                    {/* Main Price Line */}
                    <Line
                        type="monotone"
                        dataKey="Price"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        dot={false}
                        activeDot={{ r: 6, fill: '#60a5fa' }}
                    />

                    {/* Change Point Reference Line */}
                    {changePoints.map((cp, idx) => (
                        <ReferenceLine
                            key={idx}
                            x={cp.date}
                            stroke="#fbbf24"
                            strokeDasharray="5 5"
                            strokeWidth={2}
                            label={{
                                value: cp.label,
                                position: 'top',
                                fill: '#fbbf24',
                                fontSize: 12
                            }}
                        />
                    ))}

                    {/* Active Event Highlight - Reference Area */}
                    {activeEvent && (
                        <ReferenceLine
                            x={activeEvent}
                            stroke="#10b981"
                            strokeWidth={2}
                            label={{
                                value: activeEventData?.Event,
                                position: 'insideBottomRight',
                                fill: '#10b981',
                                fontSize: 10
                            }}
                        />
                    )}

                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default PriceChart;
