const axios = require('axios');

async function testAdminLogin() {
    try {
        // Login as admin
        const response = await axios.post('http://localhost:3001/api/auth/login', {
            email: 'admin@freshmart.com',
            password: 'admin123'
        });
        
        console.log('Admin Login Success:');
        console.log('User:', response.data.user);
        console.log('Role:', response.data.user.role);
        console.log('Token:', response.data.token.substring(0, 50) + '...');
        
        // Test admin-only route
        const token = response.data.token;
        const usersResponse = await axios.get('http://localhost:3001/api/auth/users', {
            headers: { Authorization: `Bearer ${token}` }
        });
        
        console.log('\nAdmin can access users:', usersResponse.data.length, 'users found');
        
    } catch (error) {
        console.log('Error:', error.response?.data || error.message);
    }
}

testAdminLogin();