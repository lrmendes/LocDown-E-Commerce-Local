const mongoose = require('../database');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    vendorId: {
        type: String,
        require: true,
    },
    setor: {
        type: Number,
        require: true
    },
    desc: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    localidade: {
        type: String,
        require: true
    },
    pictures: [],
    stock: [{}],
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;