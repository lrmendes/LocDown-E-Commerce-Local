const express = require('express');
const Product = require('../models/product');
const router = express.Router();

router.get('/vendorProducts', async (req, res) => {
    try {
        const { vendorid } = req.headers;
        //console.log(req.headers);
        //console.log(vendorid);
        const list = await Product.find({ "vendorId": vendorid });

        return res.status(200).send(list);
    } catch(err) {
        return res.status(400).send({ error: 'Falha ao buscar produtos do vendedor!' });;
    }
});

module.exports = app => app.use('/', router);