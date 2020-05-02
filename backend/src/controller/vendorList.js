const express = require('express');
const Vendor = require('../models/vendor');

const router = express.Router();

router.get('/vendorlist', async (req, res) => {
    try {
        const { localidade, categoria } = req.headers;
        const list = await Vendor.find({ "setor": categoria, "endereco.localidade": localidade });
        console.log(list);

        return res.status(200).send(list);
    } catch(err) {
        return res.status(400).send({ error: 'Falha ao buscar vendedores da sua regiao!' });;
    }
    

    console.log(localidade);
    console.log(categoria);



    /*const vendor = await Vendor.findOne({ email }).select('+password');

    if (!vendor) {
        return res.status(400).send({ error: 'Email não encontrado'});
    }

    if (!await bcrypt.compare(password, vendor.password)) {
        return res.status(400).send({ error: 'Senha incorreta'});
    }

    vendor.password = undefined;

    res.send({ vendor, token: generateToken({id: vendor.id}) });*/

});

module.exports = app => app.use('/', router);