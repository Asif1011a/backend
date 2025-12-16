const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({
    origin: ['http://localhost:5174', 'http://localhost:3000', 'http://127.0.0.1:5174'],
    credentials: true
}));
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'Backend is working!' });
});

app.post('/api/auth/login', (req, res) => {
    console.log('Login request received:', req.body);
    res.json({ 
        message: 'Login endpoint working',
        user: { name: 'Test User', email: 'test@test.com' },
        token: 'test-token'
    });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Test server running on http://localhost:${PORT}`);
    console.log('Press Ctrl+C to stop the server');
});

// Keep server alive
process.on('SIGINT', () => {
    console.log('\nShutting down server...');
    process.exit(0);
});