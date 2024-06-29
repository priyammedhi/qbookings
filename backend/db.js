const mongoose = require('mongoose');

const mongoDBURL = 'mongodb+srv://priyammedhi:77492657@cluster1.n9ubhqs.mongodb.net/qbookings';

mongoose.connect(mongoDBURL, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('connected', () => {
    console.log('MongoDB connection successful');
});

db.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});

module.exports = mongoose;
