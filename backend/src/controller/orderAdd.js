const express = require('express');
const Order = require('../models/order');
const router = express.Router();

router.post('/orderAdd', async(req,res) => {

    try {
        //console.log(req.body);
        const order = await Order.create(req.body);
        return res.send({ order });

    } catch(err) {
        //console.log(err);
        return res.status(400).send({ error: 'Falha ao Registrar Pedido!' });;
    }
});

module.exports = app => app.use('/', router);