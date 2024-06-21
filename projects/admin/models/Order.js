const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    customer: {
        type: Schema.ObjectId, 
        ref: 'Customer'
    }, 
    order: [{
        product: {
            type: Schema.ObjectId,
            ref: 'Product'
        }, 
        quantity: Number
    }],
    total: {
        type: Number
    }
});

module.exports = mongoose.model('Order', orderSchema);