// /server/seed/seed.js
const axios = require('axios');
const mongoose = require('mongoose');
const Transaction = require('../models/Transaction');
const connectDB = require('../config/db');

const SEED_API_URL = 'https://s3.amazonaws.com/roxiler.com/product_transaction.json';

const seedDatabase = async () => {
    await connectDB();
    
    const { data } = await axios.get(SEED_API_URL);
    await Transaction.insertMany(data);
    
    console.log('Database seeded');
    mongoose.connection.close();
};

seedDatabase();
