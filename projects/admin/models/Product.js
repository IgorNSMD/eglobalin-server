
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    name: {
        type: String,
        trim: true
    },
    price: {
        type: Number
    },
    image: {
        type: String
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: false // Hacemos que la categoría sea opcional
    }
})

module.exports = mongoose.model('Product', productSchema)