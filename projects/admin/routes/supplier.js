const { Router } = require('express')
const { check } = require('express-validator')

const { isDate } = require('../../../helpers/isDate')
const { fieldValidation } = require('../../../middlewares/fieldValidation')
const { jwtValidation } = require('../../../middlewares/jwtValidation')
const { getSuppliers,addSupplier,updSupplier,delSupplier } = require('../controllers/supplier')

const router = Router()

// todas las peticiones que esten abajo de jwtvalidation son validadas 
router.use( jwtValidation )

router.get('/',  getSuppliers)

router.post(
    '/',
    [
        check('name', 'The name is required').not().isEmpty(),
        check('createDate').isISO8601().withMessage('The creation date is mandatory and must be in a valid format.'),
        fieldValidation
    ],
    addSupplier)

router.put('/:id',  updSupplier)

router.delete('/:id', delSupplier)

module.exports = router