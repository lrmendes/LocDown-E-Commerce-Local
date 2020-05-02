const express = require('express');
const Product = require('../models/product');
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: "./public/uploads/products/",
    filename: function(req, file, cb){
       cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
    }
 });
 
 const upload = multer({
    storage: storage,
    limits:{fileSize: 10000000},
 }).any();

const router = express.Router();

router.post('/vendorAddProduct', async(req,res) => {
    upload(req, res, async(err) => {
        img = '/uploads/products/' + req.files[0].filename;
        img2 = '/uploads/products/' + req.files[1].filename;
        resultado = JSON.parse(req.body.data);
        resultado.pictures = [img,img2];

        //console.log(resultado);

        if(!err) {

            try {
                const product = await Product.create(resultado);
                
                return res.send({ product });

            } catch(err) {
                //console.log(err);
                return res.status(400).send({ error: 'Falha ao registrar'});
            }

        } else {
            //console.log(err);
            return res.status(400).send({ erro: 'erro' });
        }

    });
});

module.exports = app => app.use('/', router);