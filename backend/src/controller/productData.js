const express = require('express');
const Product = require('../models/product');
const Vendor = require('../models/vendor');
const router = express.Router();

router.get('/productData', async (req, res) => {
    try {
        const { productid } = req.headers;
        //console.log(req.headers);
        //console.log(vendorid);
        const product = await Product.find({ _id: productid });
        const vendor = await Vendor.find({ "_id": product[0].vendorId });

        return res.status(200).send({product, vendor});
    } catch(err) {
        return res.status(400).send({ error: 'Falha ao buscar produto!' });;
    }
});

module.exports = app => app.use('/', router);