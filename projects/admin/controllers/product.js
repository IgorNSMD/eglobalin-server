const { response } = require('express')
const { validationResult } = require('express-validator')

const Products = require('../models/Product')  //require('../../admin/models/Product') 

const multer = require('multer');
const shortid = require('shortid');

const settingMulter = {
    limits : { fileSize : 100000 },
    storage: fileStorage = multer.diskStorage({
        destination: (req, file, next) => {
            next(null, __dirname+'/../uploads/'); //'/../uploads/');
        },
        filename : (req, file, next) => {
            const extension = file.mimetype.split('/')[1];
            next(null, `${shortid.generate()}.${extension}`);
        }
    }), 
    fileFilter(req, file, next) {
        if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            // valid format
            next(null, true);
        } else {
            // invalid format
            next(new Error('invalid format'), false);
        }
    }
}

const upload = multer(settingMulter).single('image');

// load image in the server
exports.uploadFile = (req, res, next) => {
    upload(req, res, function(error) {
        if(error) {
            res.json({msg: error})
        }
        next();
    })
}

//add new Product
exports.addProduct = async(req,res) => {

    // console.log(req.body)
    // res.json({msg:"POST products 123..."})

    const product = new Products(req.body)

    try {

        if (req.file){
            product.image = req.file.filename
        }

        const productDoc =  await product.save()

        res.json({
            ok:true,
            product:productDoc
        })        

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'There was a problem, please talk to the administrator...'
        })
    }
}

//Get all Products
exports.getProducts = async (req,res, next) => {
    try {

        const products = await Products.find({})
        res.json(products)
        
    } catch (error) {
        // if there any error
        console.log(error)
        next();      
    }
}

//Get Product specifically by id
exports.getProduct = async (req,res, next) => {
    const product = await Products.findById(req.params.id)

    if (!product){
        res.json({msg: 'Product not exists...'})
        next()
    }

    // Get product
    res.json(product);

}

// update product by ID
exports.updProduct = async (req,res,next) => {
    
    try {
        console.log('update product...')
        let previousProduct = await Products.findById(req.params.id);

        let newProduct = req.body;

        // check if there is a new image
        if (req.file){
            newProduct.image = req.file.filename
        } else {
            newProduct.imagen = previousProduct.image
        }

        let product = await Products.findOneAndUpdate({ _id:req.params.id },
            newProduct, {
                new: true
            });
        res.json(product)
    } catch (error) {
        // if there any error
        console.log(error)
        next();        
    }
    
}

// delete product by ID
exports.delProduct = async (req,res,next) => {
    try {

        await Products.findOneAndDelete({ _id:req.params.id })
        res.json({
            msg:'Product deleted..'
        })
    } catch (error) {
        // if there any error
        console.log(error)
        next();             
    }
}