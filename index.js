const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());
require('dotenv').config()


mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log('Connected to database');
})
.catch((err)=>{
    console.log('Connection failed', err);
});


const productSchema = new mongoose.Schema({
    product_name : {
        type: String,
        required: true
    },
    product_price : {
        type: String,
        required: true
    },
    isInStock : {
        type: Boolean,
        required: true
    },
    category : {
        type: String,
        required: true
    }
});

const productModel = mongoose.model('products', productSchema);

app.post('/products', async(req, res) => {   
    productModel.create({
        product_name : req.body.product_name,
        product_price : req.body.product_price,
        isInStock : req.body.isInStock,
        category : req.body.category
    });
    return res.status(201).json({message : "Product created successfully"});
});

app.listen(8086, () => {
    console.log('Server is running on http://localhost:8086');
});

app.get('/', (req, res) => {
    res.send('Home page');
});
