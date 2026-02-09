import React, { useState } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer, ReferenceLine, ReferenceArea
} from 'recharts';

const PriceChart = ({ data, changePoints, events, activeEvent }) => {
    const [selectedPoint, setSelectedPoint] = useState(null);
    const activeEventData = events.find(e => e.Date === activeEvent);

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip" style={{
                    backgroundColor: 'rgba(15, 23, 42, 0.95)',
                    padding: '12px 16px',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)',
                    backdropFilter: 'blur(8px)'
                }}>
                    <p style={{ margin: 0, color: '#64748b', fontSize: '11px', fontWeight: '600' }}>{label}</p>
                    <p style={{ margin: '4px 0', color: '#f8fafc', fontWeight: '800', fontSize: '1.1rem' }}>
                        ${payload[0].value.toFixed(2)}
                    </p>
                    <p style={{ margin: 0, fontSize: '10px', color: '#60a5fa', fontWeight: '500' }}>CLICK FOR DETAILS</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ height: 420 }}>
                <ResponsiveContainer>
                    <LineChart
                        data={data}
                        margin={{ top: 20, right: 30, left: 10, bottom: 0 }}
                        onClick={(v) => v && v.activePayload && setSelectedPoint(v.activePayload[0].payload)}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                        <XAxis
                            dataKey="Date"
                            stroke="#64748b"
                            tick={{ fontSize: 11, fontWeight: 500 }}
                            axisLine={false}
                            tickLine={false}
                            minTickGap={60}
                            dy={10}
                        />
                        <YAxis
                            stroke="#64748b"
                            tick={{ fontSize: 11, fontWeight: 500 }}
                            axisLine={false}
                            tickLine={false}
                            domain={['auto', 'auto']}
                            tickFormatter={(val) => `$${val}`}
                            dx={-5}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(96, 165, 250, 0.2)', strokeWidth: 2 }} />

                        <Line
                            type="monotone"
                            dataKey="Price"
                            stroke="#60a5fa"
                            strokeWidth={3}
                            dot={false}
                            activeDot={{ r: 6, fill: '#60a5fa', stroke: '#fff', strokeWidth: 2 }}
                            animationDuration={1500}
                        />

                        {changePoints.map((cp, idx) => (
                            <ReferenceLine
                                key={idx}
                                x={cp.date}
                                stroke="#eab308"
                                strokeDasharray="4 4"
                                strokeWidth={2}
                            />
                        ))}

                        {activeEvent && (
                            <ReferenceLine
                                x={activeEvent}
                                stroke="#10b981"
                                strokeWidth={2}
                            />
                        )}
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {selectedPoint && (
                <div className="drill-down-pane" style={{
                    padding: '1.25rem 2rem',
                    background: 'rgba(255, 255, 255, 0.03)',
                    borderRadius: '1rem',
                    border: '1px solid rgba(255,255,255,0.05)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ color: '#64748b', fontSize: '0.7rem', fontWeight: '600', textTransform: 'uppercase' }}>Selected Date</span>
                            <span style={{ fontWeight: '700', fontSize: '1.1rem' }}>{selectedPoint.Date}</span>
                        </div>
                        <div style={{ width: '1px', height: '2rem', background: 'rgba(255,255,255,0.1)' }}></div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ color: '#64748b', fontSize: '0.7rem', fontWeight: '600', textTransform: 'uppercase' }}>Brent Price</span>
                            <span style={{ fontWeight: '700', fontSize: '1.1rem', color: '#60a5fa' }}>${selectedPoint.Price.toFixed(2)}</span>
                        </div>
                    </div>
                    <button
                        onClick={() => setSelectedPoint(null)}
                        style={{
                            background: 'rgba(255,255,255,0.05)',
                            border: 'none',
                            color: '#94a3b8',
                            cursor: 'pointer',
                            padding: '0.5rem 1rem',
                            borderRadius: '0.5rem',
                            fontSize: '0.8rem',
                            fontWeight: '600',
                            transition: 'all 0.2s'
                        }}
                    >
                        ✕ Close View
                    </button>
                </div>
            )}
        </div>
    );
};

export default PriceChart;
