const express = require('express');
const Vendor = require('../models/vendor');
const path = require("path");
const multer = require("multer");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

const storage = multer.diskStorage({
    destination: "./public/uploads/",
    filename: function(req, file, cb){
       cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
    }
 });
 
 const upload = multer({
    storage: storage,
    limits:{fileSize: 1000000},
 }).single("img");

const router = express.Router();

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 259200,
    });
}

router.post('/registervendor', async(req,res) => {
    upload(req, res, async(err) => {
        img = '/uploads/' + req.file.filename;
        resultado = JSON.parse(req.body.data);

        if(!err) {
            resultado.img = img;         
            try {
                const { email } = resultado;
        
                if(await Vendor.findOne({ email }))
                    return res.status(400).send({ error: 'Email ja cadastrado'});

                const vendor = await Vendor.create(resultado);
                vendor.password = undefined;
                return res.send({ vendor });

            } catch(err) {
                //console.log(err);
                return res.status(402).send({ error: 'Falha ao registrar'});
            }
        } else {
            return res.status(401).send({ erro: 'erro' });
        }

    });
});

router.post('/authenticatevendor', async (req, res) => {
    const { email, password } = req.body;

    const vendor = await Vendor.findOne({ email }).select('+password');

    if (!vendor) {
        return res.status(400).send({ error: 'Email não encontrado'});
    }

    if (!await bcrypt.compare(password, vendor.password)) {
        return res.status(400).send({ error: 'Senha incorreta'});
    }

    vendor.password = undefined;

    res.send({ vendor, token: generateToken({id: vendor.id}) });
});

module.exports = app => app.use('/auth', router);