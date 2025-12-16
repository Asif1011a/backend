const axios = require('axios');

async function testSignup() {
    try {
        const response = await axios.post('http://localhost:3001/api/auth/signup', {
            name: 'Test User',
            email: 'test@example.com',
            password: '123456'
        });
        console.log('Signup Success:', response.data);
    } catch (error) {
        console.log('Signup Error:', error.response?.data || error.message);
    }
}

testSignup();