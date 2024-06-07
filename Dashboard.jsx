import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

const Dashboard = () => {
    const usageChartRef = useRef(null);
    const dailyUsageChartRef = useRef(null);
    
    const [usageData, setUsageData] = useState([]);
    const [dailyUsageData, setDailyUsageData] = useState({});
    const [usageLabels, setUsageLabels] = useState([]);

    useEffect(() => {
        // Fetch data from API and update state
        fetchUsageData();
        fetchDailyUsageData();
    }, []);

    useEffect(() => {
        if (usageData.length > 0 && Object.keys(dailyUsageData).length > 0) {
            const ctx = usageChartRef.current.getContext('2d');
            const dailyCtx = dailyUsageChartRef.current.getContext('2d');

            const usageChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: usageLabels,
                    datasets: [{
                        label: 'Monthly Energy Usage (kWh)',
                        data: usageData,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    onClick: (e) => {
                        const activePoints = usageChart.getElementsAtEventForMode(e, 'nearest', { intersect: true }, false);
                        if (activePoints.length > 0) {
                            const monthIndex = activePoints[0].index;
                            const monthLabel = usageLabels[monthIndex];
                            updateDailyUsageChart(monthLabel);
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });

            const dailyUsageChart = new Chart(dailyCtx, {
                type: 'line',
                data: {
                    labels: [],
                    datasets: [{
                        label: 'Daily Energy Usage (kWh)',
                        data: [],
                        backgroundColor: 'rgba(153, 102, 255, 0.2)',
                        borderColor: 'rgba(153, 102, 255, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });

            function updateDailyUsageChart(month) {
                const dailyData = dailyUsageData[month];
                const days = Array.from({ length: dailyData.length }, (_, i) => i + 1);
                dailyUsageChart.data.labels = days;
                dailyUsageChart.data.datasets[0].data = dailyData;
                dailyUsageChart.update();
            }
        }
    }, [usageData, dailyUsageData, usageLabels]);

    const fetchUsageData = async () => {
        // Replace with your API call
        // const response = await fetch('API_ENDPOINT');
        // const data = await response.json();
        const data = [300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850]; // mock data
        setUsageLabels(['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']);
        setUsageData(data);
    };

    const fetchDailyUsageData = async () => {
        // Replace with your API call
        // const response = await fetch('API_ENDPOINT');
        // const data = await response.json();
        const data = {
            January: Array.from({ length: 31 }, () => Math.floor(Math.random() * 20) + 10),
            February: Array.from({ length: 28 }, () => Math.floor(Math.random() * 20) + 10),
            March: Array.from({ length: 31 }, () => Math.floor(Math.random() * 20) + 10),
            April: Array.from({ length: 30 }, () => Math.floor(Math.random() * 20) + 10),
            May: Array.from({ length: 31 }, () => Math.floor(Math.random() * 20) + 10),
            June: Array.from({ length: 30 }, () => Math.floor(Math.random() * 20) + 10),
            July: Array.from({ length: 31 }, () => Math.floor(Math.random() * 20) + 10),
            August: Array.from({ length: 31 }, () => Math.floor(Math.random() * 20) + 10),
            September: Array.from({ length: 30 }, () => Math.floor(Math.random() * 20) + 10),
            October: Array.from({ length: 31 }, () => Math.floor(Math.random() * 20) + 10),
            November: Array.from({ length: 30 }, () => Math.floor(Math.random() * 20) + 10),
            December: Array.from({ length: 31 }, () => Math.floor(Math.random() * 20) + 10)
        }; // mock data
        setDailyUsageData(data);
    };

    return (
        <div>
            <header>
                <h1>Smart Energy Dashboard</h1>
            </header>
            <nav>
                <ul>
                    <li><button className="nav button"><a href="/Overview" style={{ fontSize: 'xx-large' }}>Overview</a></button></li>
                    <li><button className="nav button"><a href="/HistoricalUsage" style={{ fontSize: 'xx-large' }}>Historical Usage</a></button></li>
                    <li><button className="nav button"><a href="/Devices" style={{ fontSize: 'xx-large' }}>Devices</a></button></li>
                    <li><button className="nav button"><a href="/Analytics" style={{ fontSize: 'xx-large' }}>Analytics</a></button></li>
                    <li><button className="nav button"><a href="/Settings" style={{ fontSize: 'xx-large' }}>Settings</a></button></li>
                </ul>
            </nav>

            <main>
                <section id="overview">
                    <h2>Overview</h2>
                    <p>Welcome to the Smart Energy Dashboard. Here you can monitor and manage your energy consumption efficiently.</p>
                </section>

                <section id="usage">
                    <h2>Analytics</h2>
                    <div className="usage-container">
                        <div className="usage-item">
                            <h3>Current Usage</h3>
                            <p>450 kWh</p>
                        </div>
                        <div className="usage-item">
                            <h3>Average Usage</h3>
                            <p>400 kWh</p>
                        </div>
                        <div className="usage-item">
                            <h3>Peak Usage</h3>
                            <p>600 kWh</p>
                        </div>
                    </div>
                </section>

                <section id="historical-usage">
                    <h2>Historical Usage</h2>
                    <div className="chart-container">
                        <canvas id="usageChart" ref={usageChartRef} className="chart"></canvas>
                    </div>
                    <div className="chart-container">
                        <canvas id="dailyUsageChart" ref={dailyUsageChartRef} className="chart"></canvas>
                    </div>
                </section>

                <section id="Devices">
                    <h2>Devices</h2>
                </section>

                <section id="settings">
                    <h2>Settings</h2>
                    <p>Configure your energy preferences and notifications here.</p>
                </section>
            </main>

            <footer>
                <p>&copy; 2024 MMR Smart Energy Solutions</p>
            </footer>
        </div>
    );
}

export default Dashboard;
