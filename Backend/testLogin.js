const axios = require('axios');

async function testLogin() {
    try {
        const response = await axios.post('http://localhost:3001/api/auth/login', {
            email: 'test@example.com',
            password: '123456'
        });
        console.log('Login Success:', response.data);
    } catch (error) {
        console.log('Login Error:', error.response?.data || error.message);
    }
}

testLogin();