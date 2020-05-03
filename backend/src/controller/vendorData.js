const express = require('express');
const Vendor = require('../models/vendor');

const router = express.Router();

router.get('/vendorData', async (req, res) => {
    try {
        const { buyid } = req.headers;
        const vendor = await Vendor.find({ _id: buyid });

        return res.status(200).send({vendor});
    } catch(err) {
        return res.status(400).send({ error: 'Falha ao buscar dados do vendedor' });;
    }
});

module.exports = app => app.use('/', router);