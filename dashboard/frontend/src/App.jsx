import React, { useState, useEffect, useMemo } from 'react';
import PriceChart from './components/PriceChart';
import EventHighlight from './components/EventHighlight';
import MetricsCard from './components/MetricsCard';
import DateFilter from './components/DateFilter';
import ImpactModal from './components/ImpactModal';
import InsightSection from './components/InsightSection';
import './App.css';

function App() {
    const [prices, setPrices] = useState([]);
    const [events, setEvents] = useState([]);
    const [changePoints, setChangePoints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeEvent, setActiveEvent] = useState(null);
    const [selectedImpactEvent, setSelectedImpactEvent] = useState(null);

    // Filtering state
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [category, setCategory] = useState('All');
    const [impactLevel, setImpactLevel] = useState('All');

    useEffect(() => {
        const fetchData = async () => {
            console.log("Fetching dashboard data...");
            try {
                const [priceRes, eventRes, cpRes] = await Promise.all([
                    fetch('/api/prices').then(res => {
                        if (!res.ok) throw new Error(`Prices API failed: ${res.status}`);
                        return res.json();
                    }),
                    fetch('/api/events').then(res => {
                        if (!res.ok) throw new Error(`Events API failed: ${res.status}`);
                        return res.json();
                    }),
                    fetch('/api/change-points').then(res => {
                        if (!res.ok) throw new Error(`Change points API failed: ${res.status}`);
                        return res.json();
                    })
                ]);

                console.log("Data received:", {
                    pricesCount: priceRes.length,
                    eventsCount: eventRes.length,
                    hasChangePoints: !!cpRes.change_points
                });

                setPrices(priceRes || []);
                setEvents(eventRes || []);
                setChangePoints(cpRes.change_points || []);

                if (priceRes && priceRes.length > 0) {
                    setStartDate(priceRes[0].Date);
                    setEndDate(priceRes[priceRes.length - 1].Date);
                }

                setLoading(false);
            } catch (error) {
                console.error("CRITICAL DASHBOARD ERROR:", error);
                // Set fallback data for demo if API fails
                setChangePoints([{
                    date: "2021-12-05",
                    label: "Demo Mode (API ERROR)",
                    mu_before: 62.10,
                    mu_after: 99.31,
                    percentage_change: 60.0
                }]);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const filteredData = useMemo(() => {
        let p = prices;
        let e = events;

        if (startDate && endDate) {
            p = p.filter(item => item.Date >= startDate && item.Date <= endDate);
            e = e.filter(item => item.Date >= startDate && item.Date <= endDate);
        }

        if (category !== 'All') {
            e = e.filter(item => item.Category === category);
        }

        if (impactLevel !== 'All') {
            e = e.filter(item => item.Impact === impactLevel);
        }

        return { filteredPrices: p, filteredEvents: e };
    }, [prices, events, startDate, endDate, category, impactLevel]);

    const currentActiveEvent = useMemo(() => {
        return events.find(e => e.Date === activeEvent) || events[events.length - 1];
    }, [events, activeEvent]);

    const handleReset = () => {
        if (prices.length > 0) {
            setStartDate(prices[0].Date);
            setEndDate(prices[prices.length - 1].Date);
            setCategory('All');
            setImpactLevel('All');
        }
    };

    if (loading) {
        return <div className="loading">Loading Amazing Dashboard...</div>;
    }

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>Brent Oil Analysis Dashboard</h1>
                <p>Advanced interactive exploration of price trends and event impacts</p>
            </header>

            <DateFilter
                startDate={startDate}
                endDate={endDate}
                onStartChange={setStartDate}
                onEndChange={setEndDate}
                selectedCategory={category}
                onCategoryChange={setCategory}
                selectedImpact={impactLevel}
                onImpactChange={setImpactLevel}
                onReset={handleReset}
            />

            <div className="metrics-grid">
                <MetricsCard
                    title="Current Price Regime"
                    value={`$${changePoints[0]?.mu_after?.toFixed(2) || '0.00'}`}
                    subValue={`+${changePoints[0]?.percentage_change?.toFixed(1) || '0.0'}% Shift`}
                    color="#10b981"
                />
                <MetricsCard
                    title="Historical Baseline"
                    value={`$${changePoints[0]?.mu_before?.toFixed(2) || '0.00'}`}
                    subValue="Pre-2021 Mean"
                    color="#6b7280"
                />
                <MetricsCard
                    title="Detected Change Point"
                    value={changePoints[0]?.date || 'N/A'}
                    subValue={changePoints[0]?.label || 'No change point detected'}
                    color="#3b82f6"
                />
            </div>

            <main className="dashboard-main">
                <div className="chart-section">
                    <PriceChart
                        data={filteredData.filteredPrices}
                        changePoints={changePoints}
                        events={filteredData.filteredEvents}
                        activeEvent={activeEvent}
                    />
                </div>

                <aside className="events-sidebar">
                    <h2>Significant Events ({filteredData.filteredEvents.length})</h2>
                    <div className="events-list">
                        {filteredData.filteredEvents.map((event, index) => (
                            <EventHighlight
                                key={index}
                                event={event}
                                isActive={activeEvent === event.Date}
                                onHover={() => setActiveEvent(event.Date)}
                                onLeave={() => setActiveEvent(null)}
                                onClick={() => setSelectedImpactEvent(event)}
                            />
                        ))}
                    </div>
                </aside>
            </main>

            <InsightSection
                changePoint={changePoints[0]}
                activeEvent={currentActiveEvent}
            />

            {selectedImpactEvent && (
                <ImpactModal
                    event={selectedImpactEvent}
                    prices={prices}
                    onClose={() => setSelectedImpactEvent(null)}
                />
            )}
        </div>
    );
}

export default App;
