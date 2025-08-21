const path = require('path');
const fs = require('fs');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// Paths
const staticRoot = path.join(__dirname, '../portfolio');
const dataDir = path.join(__dirname, 'data');
const submissionsFile = path.join(dataDir, 'contact-submissions.json');

// Ensure data directory exists
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/api/health', (req, res) => {
    res.json({ ok: true });
});

// Contact endpoint
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body || {};

    if (!name || !email || !message) {
        return res.status(400).json({ ok: false, error: 'Missing required fields' });
    }

    const entry = {
        id: Date.now().toString(36),
        name: String(name).trim(),
        email: String(email).trim(),
        message: String(message).trim(),
        createdAt: new Date().toISOString()
    };

    try {
        let existing = [];
        if (fs.existsSync(submissionsFile)) {
            const raw = fs.readFileSync(submissionsFile, 'utf8');
            existing = raw ? JSON.parse(raw) : [];
        }
        existing.push(entry);
        fs.writeFileSync(submissionsFile, JSON.stringify(existing, null, 2));
        return res.json({ ok: true });
    } catch (err) {
        console.error('Failed to persist contact submission', err);
        return res.status(500).json({ ok: false, error: 'Internal error' });
    }
});

// Serve static site
app.use(express.static(staticRoot));

// Fallback to index.html for other GET requests
app.get('*', (req, res) => {
    res.sendFile(path.join(staticRoot, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});


