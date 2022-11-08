const express = require("express");
const dotenv = require("dotenv"); 
const connectDB = require("./config/db");
const productRoutes = require('./routes/productsRoutes');
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

dotenv.config();

connectDB();

const app = express();

app.use('/api/products', productRoutes);

app.use(notFound);

app.use(errorHandler)

const port = process.env.PORT || 4200

app.listen(port, console.log(`server running in ${process.env.NODE_ENV} mode on port ${port}`));