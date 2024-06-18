const { response } = require('express')

const Supplier = require('../models/Supplier')

const getSuppliers = async ( req, res = response ) => {
    console.log('getSuppliers...')

    const suppliers = await Supplier.find().populate('user','name')

    res.json({
        ok:true,
        suppliers
    })
}

const addSupplier = async( req, res = response ) => {

    // verificar que tenga el supplier..
    //console.log(req.body)

    const supplier = new Supplier( req.body )

    try {

        supplier.user = req.uid

        const supplierDoc =  await supplier.save()

        res.json({
            ok:true,
            supplier:supplierDoc
        })

    } catch (error) {

        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'There was a problem, please talk to the administrator...'
        })

    }


}

const updSupplier = async ( req, res = response ) => {

    const supplierId = req.params.id
    const uid = req.uid

    try {

        const supplier = await Supplier.findById( supplierId )

        if (!supplier) {
            return res.status(404).json({
                ok:false,
                msg:'supplier does not exist'
            })
        }

        if (supplier.user.toString() !== uid){
            return res.status(401).json({
                ok:false,
                msg:'You do not have privileges to edit this document'
            })
        }

        const newSupplier = {
            ...req.body,
            user:uid
        }

        const supplierUpdated = await Supplier.findByIdAndUpdate(supplierId, newSupplier, { new: true } )

        res.json({
            ok:true,
            supplier:supplierUpdated
        })

    } catch (error) {

        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'There was a problem, please talk to the administrator...'
        })        

    }



}

const delSupplier = async ( req, res = response ) => {

    const supplierId = req.params.id
    const uid = req.uid

    try {

        const supplier = await Supplier.findById( supplierId )

        if (!supplier) {
            return res.status(404).json({
                ok:false,
                msg:'supplier does not exist'
            })
        }

        if (supplier.user.toString() !== uid){
            return res.status(401).json({
                ok:false,
                msg:'You do not have privileges to edit this document'
            })
        }

        await Supplier.findByIdAndDelete( supplierId )

        res.json({
            ok:true,
        })

    } catch (error) {

        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'There was a problem, please talk to the administrator...'
        })        

    }
}

module.exports = {
    getSuppliers,
    addSupplier,
    updSupplier,
    delSupplier
}