const http = require('http');
const url = require('url');

let products = [];
let orders = [
  {
    id: 1,
    customerName: 'John Doe',
    customerEmail: 'john@example.com',
    items: [
      { name: 'Basmati Rice', quantity: 2, price: 150 },
      { name: 'Wheat Flour', quantity: 1, price: 80 }
    ],
    total: 380,
    status: 'pending',
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    customerName: 'Jane Smith',
    customerEmail: 'jane@example.com',
    items: [
      { name: 'Toor Dal', quantity: 1, price: 120 },
      { name: 'Sunflower Oil', quantity: 1, price: 200 }
    ],
    total: 320,
    status: 'processing',
    createdAt: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: 3,
    customerName: 'Mike Johnson',
    customerEmail: 'mike@example.com',
    items: [
      { name: 'Turmeric Powder', quantity: 1, price: 50 }
    ],
    total: 50,
    status: 'delivered',
    createdAt: new Date(Date.now() - 172800000).toISOString()
  }
];
let nextProductId = 1;
let nextOrderId = 4;

const server = http.createServer((req, res) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Max-Age', '86400');
    
    if (req.method === 'OPTIONS') {
        console.log('Handling OPTIONS request');
        res.writeHead(200);
        res.end();
        return;
    }

    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    console.log('Parsed path:', path);
    
    if (path === '/') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Server is working!' }));
    } else if (path === '/api/auth/login' && req.method === 'POST') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ 
            message: 'Login working',
            user: { name: 'Test User', email: 'test@test.com' },
            token: 'test-token'
        }));
    } else if (path === '/api/products' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(products));
    } else if (path === '/api/products' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            const productData = JSON.parse(body);
            const newProduct = { id: nextProductId++, ...productData };
            products.push(newProduct);
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(newProduct));
        });
    } else if (path.startsWith('/api/products/') && req.method === 'PUT') {
        const id = parseInt(path.split('/')[3]);
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            const productData = JSON.parse(body);
            const index = products.findIndex(p => p.id === id);
            if (index !== -1) {
                products[index] = { id, ...productData };
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(products[index]));
            } else {
                res.writeHead(404);
                res.end('Product not found');
            }
        });
    } else if (path.startsWith('/api/products/') && req.method === 'DELETE') {
        const id = parseInt(path.split('/')[3]);
        const index = products.findIndex(p => p.id === id);
        if (index !== -1) {
            products.splice(index, 1);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Product deleted' }));
        } else {
            res.writeHead(404);
            res.end('Product not found');
        }
    } else if (path === '/api/orders' && req.method === 'GET') {
        console.log('GET /api/orders called, returning:', orders.length, 'orders');
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(orders));
    } else if (path === '/api/test-orders' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Orders API working', count: orders.length, orders }));
    } else if (path === '/api/orders' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            const orderData = JSON.parse(body);
            const newOrder = { 
                id: nextOrderId++, 
                ...orderData, 
                createdAt: new Date().toISOString(),
                status: 'pending'
            };
            orders.push(newOrder);
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(newOrder));
        });
    } else if (path.startsWith('/api/orders/') && req.method === 'PUT') {
        const id = parseInt(path.split('/')[3]);
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            const orderData = JSON.parse(body);
            const index = orders.findIndex(o => o.id === id);
            if (index !== -1) {
                orders[index] = { ...orders[index], ...orderData };
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(orders[index]));
            } else {
                res.writeHead(404);
                res.end('Order not found');
            }
        });
    } else {
        res.writeHead(404);
        res.end('Not found');
    }
});

server.listen(5000, () => {
    console.log('Simple server running on http://localhost:5000');
    console.log('Sample orders available:', orders.length);
    console.log('Press Ctrl+C to stop');
    console.log('Test the orders API at: http://localhost:5000/api/orders');
});