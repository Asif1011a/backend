const express = require('express');
const path = require('path');
const app = express();

// Serve static files
app.use(express.static(path.join(__dirname, '..')));

// Test route
app.get('/test', (req, res) => {
    res.json({ message: 'Test server working!' });
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Test server running on http://localhost:${PORT}`);
    console.log(`Open http://localhost:${PORT}/test-connection.html to test APIs`);
});