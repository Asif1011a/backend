const http = require('http');
const url = require('url');
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/freshmart');

// Order Schema
const orderSchema = new mongoose.Schema({
  orderId: String,
  userId: String,
  customerName: String,
  customerEmail: String,
  items: Array,
  totalAmount: Number,
  status: String,
  orderDate: Date
});

const Order = mongoose.model('Order', orderSchema);

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    
    if (path === '/orders' && req.method === 'GET') {
        Order.find({}).then(orders => {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(orders));
        }).catch(err => {
            res.writeHead(500);
            res.end('Database error');
        });
    } else if (path.startsWith('/orders/') && req.method === 'PUT') {
        const id = path.split('/')[2];
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            const orderData = JSON.parse(body);
            Order.findByIdAndUpdate(id, orderData, { new: true }).then(order => {
                if (order) {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(order));
                } else {
                    res.writeHead(404);
                    res.end('Order not found');
                }
            }).catch(err => {
                res.writeHead(500);
                res.end('Database error');
            });
        });
    } else {
        res.writeHead(404);
        res.end('Not found');
    }
});

server.listen(5001, () => {
    console.log('Orders server running on http://localhost:5001');
    console.log('Connected to MongoDB database');
    
    // Count orders in database
    Order.countDocuments().then(count => {
        console.log('Orders in database:', count);
    });
});