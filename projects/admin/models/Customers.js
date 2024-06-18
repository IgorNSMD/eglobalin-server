const mongoose = require('mongoose')
const Schema = mongoose.Schema

const customerSchema = new Schema({
    name: {
        type: String,
        trim: true
    },
    first_name: {
        type: String,
        trim: true
    },
    company: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true
    },
    phone: {
        type: String,
        trim: true
    }
})

module.exports = mongoose.model('Customer', customerSchema)