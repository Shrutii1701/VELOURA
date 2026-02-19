const express = require('express');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static(__dirname)); // Serve index.html, styles.css, script.js

// ========== DATA HELPERS ==========
const DATA_DIR = path.join(__dirname, 'data');

function readJSON(file) {
    const filePath = path.join(DATA_DIR, file);
    if (!fs.existsSync(filePath)) return [];
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function writeJSON(file, data) {
    const filePath = path.join(DATA_DIR, file);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

// ========== AUTH ENDPOINTS ==========

// POST /api/signup
app.post('/api/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Name, email, and password are required' });
        }

        const users = readJSON('users.json');

        // Check if user exists
        if (users.find(u => u.email === email)) {
            return res.status(409).json({ error: 'Account already exists — sign in instead' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = {
            id: Date.now().toString(),
            name,
            email,
            password: hashedPassword,
            saved: [],
            fb: {},
            createdAt: new Date().toISOString()
        };

        users.push(newUser);
        writeJSON('users.json', users);

        // Return user without password
        const { password: _, ...safeUser } = newUser;
        res.status(201).json({ user: safeUser });

    } catch (err) {
        console.error('Signup error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// POST /api/login
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const users = readJSON('users.json');
        const user = users.find(u => u.email === email);

        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Return user without password
        const { password: _, ...safeUser } = user;
        res.json({ user: safeUser });

    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// ========== PREFERENCES ==========

// POST /api/save-prefs
app.post('/api/save-prefs', (req, res) => {
    try {
        const { email, saved, fb } = req.body;

        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        }

        const users = readJSON('users.json');
        const idx = users.findIndex(u => u.email === email);

        if (idx === -1) {
            return res.status(404).json({ error: 'User not found' });
        }

        users[idx].saved = saved || [];
        users[idx].fb = fb || {};
        writeJSON('users.json', users);

        res.json({ success: true });

    } catch (err) {
        console.error('Save prefs error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// ========== FEEDBACK ==========

// POST /api/feedback
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
            name,
            email,
            message,
            rating: rating || null,
            category: category || null,
            date: new Date().toISOString()
        };

        feedback.unshift(entry);
        writeJSON('feedback.json', feedback);

        res.status(201).json({ entry });

    } catch (err) {
        console.error('Feedback error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// GET /api/feedback/:email
app.get('/api/feedback/:email', (req, res) => {
    try {
        const feedback = readJSON('feedback.json');
        const userFeedback = feedback.filter(f => f.email === req.params.email);
        res.json({ feedback: userFeedback });

    } catch (err) {
        console.error('Get feedback error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// ========== START SERVER ==========
app.listen(PORT, () => {
    console.log(`\n  🌸 VELOURA Server running at http://localhost:${PORT}\n`);
});
