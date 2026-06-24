const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Root route - serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Dashboard route
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

// Mock Database API for Chart Data
app.get('/api/production-chart', (req, res) => {
    const period = req.query.period || 'weekly';
    
    let data;
    if (period === 'daily') {
        data = {
            labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
            datasets: [
                { label: 'Three Phase', data: [5, 12, 45, 60, 30, 10], backgroundColor: '#1e40af', borderRadius: 5, barThickness: 15 },
                { label: 'Water Meters', data: [2, 8, 30, 45, 20, 5], backgroundColor: '#10b981', borderRadius: 5, barThickness: 15 },
                { label: 'Single Phase', data: [8, 15, 50, 55, 35, 12], backgroundColor: '#64748b', borderRadius: 5, barThickness: 15 }
            ]
        };
    } else {
        data = {
            labels: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
            datasets: [
                { label: 'Three Phase', data: [40, 55, 35, 45, 38, 42, 20], backgroundColor: '#1e40af', borderRadius: 5, barThickness: 15 },
                { label: 'Water Meters', data: [35, 48, 28, 52, 42, 38, 15], backgroundColor: '#10b981', borderRadius: 5, barThickness: 15 },
                { label: 'Single Phase', data: [30, 42, 25, 48, 35, 32, 25], backgroundColor: '#64748b', borderRadius: 5, barThickness: 15 }
            ]
        };
    }
    
    res.json(data);
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
