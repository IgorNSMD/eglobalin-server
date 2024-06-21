
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categorySchema = new Schema({
    name: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    condition: {
        type: Boolean
    }
})

module.exports = mongoose.model('Category', categorySchema)