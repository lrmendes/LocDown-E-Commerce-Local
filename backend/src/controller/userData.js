const express = require('express');
const User = require('../models/User');

const router = express.Router();

router.get('/userData', async (req, res) => {
    try {
        const { buyid } = req.headers;
        const user = await User.find({ _id: buyid });

        return res.status(200).send({user});
    } catch(err) {
        return res.status(400).send({ error: 'Falha ao buscar dados do usuario' });;
    }
});

module.exports = app => app.use('/', router);