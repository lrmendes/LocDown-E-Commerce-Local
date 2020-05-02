const express = require('express');
const Vendor = require('../models/vendor');

const router = express.Router();

router.get('/vendorlist', async (req, res) => {
    try {
        const { localidade, categoria } = req.headers;
        const list = await Vendor.find({ "setor": categoria, "endereco.localidade": localidade });

        return res.status(200).send(list);
    } catch(err) {
        return res.status(400).send({ error: 'Falha ao buscar vendedores da sua regiao!' });;
    }
});

module.exports = app => app.use('/', router);