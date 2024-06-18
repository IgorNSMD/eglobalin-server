const { Schema, model } = require('mongoose')


const supplierSchema = Schema({

    name: {
        type: String,
        required:true
    },
    addres: {
        type: String,
    },
    createDate: {
        type:Date,
        default: Date.now()
    },
    user: {
        type: Schema.Types.ObjectId,
        ref:'User',
        required:true
    }


})

supplierSchema.method('toJSON', function(){

    const { __v, _id, ...object } = this.toObject()
    object.id = _id
    return object

})

module.exports = model('Supplier', supplierSchema)