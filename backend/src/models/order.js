const mongoose = require('../database');

const OrderSchema = new mongoose.Schema({
    userId: {
        type: String,
        require: true,
    },
    productId: {
        type: String,
        require: true
    },
    vendorId: {
        type: String,
        require: true
    },
    tipo: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;