const { spawn } = require('child_process');

console.log('Starting FreshMart Backend Server...');

const server = spawn('node', ['server.js'], {
    stdio: 'inherit',
    cwd: __dirname
});

server.on('error', (err) => {
    console.error('Failed to start server:', err);
});

server.on('close', (code) => {
    console.log(`Server process exited with code ${code}`);
});

// Keep the process running
process.on('SIGINT', () => {
    console.log('\nShutting down...');
    server.kill();
    process.exit(0);
});