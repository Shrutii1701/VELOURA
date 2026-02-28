const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static(__dirname));

// Data Helpers
const DATA_DIR = path.join(__dirname, 'data');
function readJSON(file) {
    const filePath = path.join(DATA_DIR, file);
    if (!fs.existsSync(filePath)) return [];
    try {
        return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch (e) { return []; }
}
function writeJSON(file, data) {
    const filePath = path.join(DATA_DIR, file);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

// ========== FEEDBACK ==========
app.post('/api/feedback', (req, res) => {
    try {
        const { type, name, email, message, rating, category } = req.body;
        if (!name || !email || !message) {
            return res.status(400).json({ error: 'Name, email, and message are required' });
        }
        const feedback = readJSON('feedback.json');
        const entry = {
            id: Date.now().toString(),
            type: type || 'feedback',
            name, email, message,
            rating: rating || null,
            category: category || null,
            date: new Date().toISOString()
        };
        feedback.unshift(entry);
        writeJSON('feedback.json', feedback);
        res.status(201).json({ entry });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

app.get('/api/feedback/:email', (req, res) => {
    try {
        const feedback = readJSON('feedback.json');
        const userFeedback = feedback.filter(f => f.email === req.params.email);
        res.json({ feedback: userFeedback });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

app.listen(PORT, '127.0.0.1', () => {
    console.log(`\n  🌸 VELOURA Server running at http://127.0.0.1:${PORT}\n`);
});
