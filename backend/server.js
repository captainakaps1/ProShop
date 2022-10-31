const express = require("express");
const products = require("./data/products");
const dotenv = require("dotenv"); 

dotenv.config();

const app = express();

app.get('/api/products', (req, res) => {
    res.json(products);
});

app.get('/api/product/:id', (req, res) => {
    const id = req.params.id;
    const product = products.find((product) => product._id === id);
    res.json(product);
});

const port = process.env.PORT || 4200

app.listen(port, console.log(`server running in ${process.env.NODE_ENV} mode on port ${port}`));