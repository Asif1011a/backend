const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/freshmart');

const orderSchema = new mongoose.Schema({
  customerName: String,
  customerEmail: String,
  items: [{
    name: String,
    quantity: Number,
    price: Number
  }],
  total: Number,
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);

const sampleOrders = [
  {
    customerName: 'John Doe',
    customerEmail: 'john@example.com',
    items: [
      { name: 'Apples', quantity: 2, price: 150 },
      { name: 'Bananas', quantity: 1, price: 80 }
    ],
    total: 230,
    status: 'delivered'
  },
  {
    customerName: 'Jane Smith',
    customerEmail: 'jane@example.com',
    items: [
      { name: 'Milk', quantity: 1, price: 60 },
      { name: 'Bread', quantity: 2, price: 40 }
    ],
    total: 100,
    status: 'processing'
  },
  {
    customerName: 'Bob Wilson',
    customerEmail: 'bob@example.com',
    items: [
      { name: 'Rice', quantity: 1, price: 200 }
    ],
    total: 200,
    status: 'pending'
  },
  {
    customerName: 'Alice Brown',
    customerEmail: 'alice@example.com',
    items: [
      { name: 'Tomatoes', quantity: 3, price: 90 },
      { name: 'Onions', quantity: 2, price: 50 }
    ],
    total: 140,
    status: 'delivered'
  },
  {
    customerName: 'Mike Davis',
    customerEmail: 'mike@example.com',
    items: [
      { name: 'Chicken', quantity: 1, price: 300 }
    ],
    total: 300,
    status: 'processing'
  },
  {
    customerName: 'Sarah Johnson',
    customerEmail: 'sarah@example.com',
    items: [
      { name: 'Eggs', quantity: 1, price: 120 },
      { name: 'Butter', quantity: 1, price: 180 }
    ],
    total: 300,
    status: 'cancelled'
  }
];

Order.insertMany(sampleOrders)
  .then(() => {
    console.log('6 orders added successfully');
    process.exit();
  })
  .catch(err => {
    console.error('Error adding orders:', err);
    process.exit(1);
  });