const { Router } = require('express')
const { check } = require('express-validator')
const multer = require('multer');

const { isDate } = require('../helpers/isDate')
const { fieldValidation } = require('../middlewares/fieldValidation')
const { jwtValidation } = require('../middlewares/jwtValidation')

const { uploadFile, addProduct, getProducts, getProduct, updProduct, delProduct } = require('../controllers/product')
const router = Router()

// router.post('/', (req,res) => {
//     res.json({msg:"POST products..."})
// })

router.post('/',
    uploadFile, 
    [
        check('name', 'The name is required').not().isEmpty(),
        check('price', 'The price is required').not().isEmpty(),
        fieldValidation
    ],    
    addProduct 
)

// get all products
router.get('/', 
    getProducts)

// get product
router.get('/:id', 
    getProduct)

// Update Product
router.put('/:id', 
    uploadFile,
    updProduct)

// Eliminar Producto
router.delete('/:id', 
    delProduct)    

module.exports = router