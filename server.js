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

// Database API for Chart Data
const supabase = require('./supabaseClient');

app.get('/api/production-chart', async (req, res) => {
    const period = req.query.period || 'weekly';
    
    // Default Mock Data Fallback
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

    if (supabase) {
        try {
            // Attempt to fetch from Supabase
            const { data: reports, error } = await supabase
                .from('production_reports')
                .select('*')
                .order('report_date', { ascending: true });
                
            if (error) {
                console.error('Error fetching from Supabase (Table might not exist yet):', error.message);
            } else if (reports && reports.length > 0) {
                // Parse reports into Chart.js format
                const labels = [...new Set(reports.map(r => r.report_date))].sort();
                
                const lines = {
                    'MT212': { label: 'Three Phase (MT212)', backgroundColor: '#1e40af', data: Array(labels.length).fill(0) },
                    'Siconia': { label: 'Water Meters (Siconia)', backgroundColor: '#10b981', data: Array(labels.length).fill(0) },
                    'ECS1100': { label: 'Single Phase (ECS1100)', backgroundColor: '#64748b', data: Array(labels.length).fill(0) }
                };
                
                reports.forEach(report => {
                    const index = labels.indexOf(report.report_date);
                    if (index !== -1 && lines[report.production_line]) {
                        lines[report.production_line].data[index] += report.quantity;
                    }
                });
                
                data = {
                    labels: labels,
                    datasets: Object.values(lines).map(line => ({
                        ...line,
                        borderRadius: 5,
                        barThickness: 15
                    }))
                };
            }
        } catch (err) {
            console.error('Supabase query failed:', err);
        }
    }
    
    res.json(data);
});

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`);
    });
}

module.exports = app;
