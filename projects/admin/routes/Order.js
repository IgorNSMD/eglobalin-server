const { Router } = require('express')
const { check } = require('express-validator')
const multer = require('multer');

const { isDate } = require('../../../helpers/isDate') //require('../helpers/isDate')
const { fieldValidation } = require('../../../middlewares/fieldValidation') //require('../middlewares/fieldValidation')
const { jwtValidation } = require('../../../middlewares/jwtValidation') //require('../middlewares/jwtValidation')

const { addOrder, getOrders, getOrder, updOrder, delOrder } = require('../controllers/order')
const router = Router()

router.post('/',
    addOrder 
)

// get all customers
router.get('/', 
    getOrders)

// get customer
router.get('/:id', 
    getOrder)

// Update Customer
router.put('/:id', 
    updOrder)

// delete customer
router.delete('/:id', 
    delOrder)    
    

module.exports = router