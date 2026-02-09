import React, { useState, useEffect } from 'react';
import PriceChart from './components/PriceChart';
import EventHighlight from './components/EventHighlight';
import MetricsCard from './components/MetricsCard';
import './App.css';

function App() {
    const [prices, setPrices] = useState([]);
    const [events, setEvents] = useState([]);
    const [changePoints, setChangePoints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeEvent, setActiveEvent] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [priceRes, eventRes, cpRes] = await Promise.all([
                    fetch('/api/prices').then(res => res.json()),
                    fetch('/api/events').then(res => res.json()),
                    fetch('/api/change-points').then(res => res.json())
                ]);

                setPrices(priceRes);
                setEvents(eventRes);
                setChangePoints(cpRes.change_points);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div className="loading">Loading Amazing Dashboard...</div>;
    }

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>Brent Oil Analysis Dashboard</h1>
                <p>Interactive exploration of price trends and change points</p>
            </header>

            <div className="metrics-grid">
                <MetricsCard
                    title="Current Price Regime"
                    value={`$${changePoints[0]?.mu_after.toFixed(2)}`}
                    subValue={`+${changePoints[0]?.percentage_change}% Shift`}
                    color="#10b981"
                />
                <MetricsCard
                    title="Historical Baseline"
                    value={`$${changePoints[0]?.mu_before.toFixed(2)}`}
                    subValue="Pre-2021 Mean"
                    color="#6b7280"
                />
                <MetricsCard
                    title="Detected Change Point"
                    value={changePoints[0]?.date}
                    subValue={changePoints[0]?.label}
                    color="#3b82f6"
                />
            </div>

            <main className="dashboard-main">
                <div className="chart-section">
                    <PriceChart
                        data={prices}
                        changePoints={changePoints}
                        events={events}
                        activeEvent={activeEvent}
                    />
                </div>

                <aside className="events-sidebar">
                    <h2>Significant Events</h2>
                    <div className="events-list">
                        {events.map((event, index) => (
                            <EventHighlight
                                key={index}
                                event={event}
                                isActive={activeEvent === event.Date}
                                onHover={() => setActiveEvent(event.Date)}
                                onLeave={() => setActiveEvent(null)}
                            />
                        ))}
                    </div>
                </aside>
            </main>
        </div>
    );
}

export default App;
