const mongoose = require('mongoose');
const dotevn = require('dotenv');
const connectDB = require('./config/db');
const Order = require('./models/orderModel');
const Product = require('./models/productModel');
const User = require('./models/userModel');
const products = require('./data/products');
const users = require('./data/users');

dotevn.config()

connectDB()

const importData = async() => {
    try {
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()


        const createdUsers  = await User.insertMany(users);

        const adminUser = createdUsers.find( user => user.isAdmin === true)

        const samProducts = products.map(product => {
            return { ...product, user: adminUser._id }
        })

        await Product.insertMany(samProducts);

        console.log("Data imported successfully");
        process.exit();
    } catch (error) {
        console.error(error); 
        process.exit(1)
    }
}

const destroyData = async() => {
    try {
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        console.log("Data destoryed successfully");
        process.exit();
    } catch (error) { 
        console.error(error); 
        process.exit(1)
    }
}


if(process.argv[2] === '-d'){
    destroyData();
}else{
    importData();
}