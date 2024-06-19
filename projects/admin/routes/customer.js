const { Router } = require('express')
const { check } = require('express-validator')
const multer = require('multer');

const { isDate } = require('../../../helpers/isDate') //require('../helpers/isDate')
const { fieldValidation } = require('../../../middlewares/fieldValidation') //require('../middlewares/fieldValidation')
const { jwtValidation } = require('../../../middlewares/jwtValidation') //require('../middlewares/jwtValidation')

const { addCustomer, getCustomers, getCustomer, updCustomer, delCustomer } = require('../controllers/customer')
const router = Router()

// router.post('/', (req,res) => {
//     res.json({msg:"POST products..."})
// })

router.post('/',
    [
        check('name', 'The name is required').not().isEmpty(),
        check('email', 'The email is required').not().isEmpty(),
        fieldValidation
    ],    
    addCustomer 
)

// get all customers
router.get('/', 
    getCustomers)

// get customer
router.get('/:id', 
    getCustomer)

// Update Customer
router.put('/:id', 
    updCustomer)

// delete customer
router.delete('/:id', 
    delCustomer)    

module.exports = router