const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./config/db');
const multer = require('multer');
// const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
// const orderRoutes = require("./routes/orderRoutes.js");
// const cartRoutes = require("./routes/cartRoutes");
const {notFound, errorHandler} = require('./middleware/errorMiddleware');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Parse incoming URL-encoded data
app.use(express.urlencoded({ extended: true }));

// Multer setup for file uploads
const upload = multer();
// Test route


 app.get('/', (req, res) => {
    res.send('API is running...');
});

// Routes
// app.use('/api/products', productRoutes);
app.use('/api/auth', upload.none(), authRoutes);
// app.use('/api/order', orderRoutes);
// app.use('/api/cart', cartRoutes);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});