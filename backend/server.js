const express = require('express');
const app = express();

app.use(express.json());

const dbConfig = require('./db');
const userRoute = require('./routes/userRoute');
const bookingRoute = require('./routes/bookingRoute');

app.use('/api/bookings', bookingRoute);
app.use('/api/user', userRoute);

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
});