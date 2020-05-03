const express = require('express');
const Order = require('../models/order');
const Vendor = require('../models/vendor');
const Product = require('../models/product');
const User = require('../models/User');

const router = express.Router();

router.get('/orderList', async (req, res) => {
    try {
        const { searchid, contid } = req.headers;

        if (contid == 1) {
            let orders = await Order.find({ userId: searchid });   

            const vendors = await Promise.all(orders.map(element => {
                return Vendor.find({  _id: element.vendorId })
            }));

            const products = await Promise.all(orders.map(element => {
                return Product.find({  _id: element.productId })
            }));

            return res.status(200).send({orders, vendors, products});

        } else {
            const orders = await Order.find({ vendorId: searchid });
            
            const users = await Promise.all(orders.map(element => {
                return User.find({  _id: element.userId })
            }));

            const products = await Promise.all(orders.map(element => {
                return Product.find({  _id: element.productId })
            }));

            return res.status(200).send({orders, users, products});
        }   
    } catch(err) {
        return res.status(400).send({ error: 'Falha ao buscar vendedores da sua regiao!' });;
    }
});

module.exports = app => app.use('/', router);