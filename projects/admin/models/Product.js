
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    code: {
        type: String,
        trim: true
    },    
    name: {
        type: String,
        trim: true
    },
    price: {
        type: Number
    },
    stock: {
        type: Number
    },
    description: {
        type: String,
        trim: true
    },        
    image: {
        type: String
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: false // Hacemos que la categoría sea opcional
    },
    condition: {
        type: Boolean
    }
})

module.exports = mongoose.model('Product', productSchema)