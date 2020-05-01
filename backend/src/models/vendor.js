const mongoose = require('../database');
const bcrypt = require('bcryptjs');

const VendorSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },
    endereco: [
        {
            _id:false,
            cep: {
                type: String,
                require: true
            },
            logradouro : {
                type: String,
                require: true
            },
            bairro: {
                type: String,
                require: true
            },
            localidade : {
                type: String,
                require: true
            },
            uf : {
                type: String,
                require: true
            },
            numero : {
                type: String,
                require: true
            },
        }
    ],
    img: {
        type: String,
        require: true 
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
});

VendorSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    next();
});

const Vendor = mongoose.model('Vendor', VendorSchema);

module.exports = Vendor;