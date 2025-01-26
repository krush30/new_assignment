const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');



connectDB()
const app = express();
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));


app.use(express.json({ extended: false }));


app.use('/api/user', require('./routes/api/user'))
app.use('/api/login', require('./routes/api/login'))
app.use('/api/dashboard', require('./routes/api/dashboard'))





const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`App Started at ${PORT}`));
