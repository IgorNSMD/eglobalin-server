
const { Router } = require('express')
const { check } = require('express-validator')

const { fieldValidation } = require('../../../middlewares/fieldValidation') 
const { createUser, userLogin, renewToken } = require('../controllers/auth')
const { jwtValidation } = require('../../../middlewares/jwtValidation')

const router = Router()



router.post(
    '/new', 
    [ // midlewares
        check('name', 'The name is required').not().isEmpty(),
        check('email', 'The email is required').isEmail(),
        check('password', 'The password must be at least 6 characters').isLength({ min:6 }),
        fieldValidation
    ],
    createUser
    )

router.post(
    '/login', 
    [ // midlewares
        check('email', 'The email is required').isEmail(),
        check('password', 'The password must be at least 6 characters').isLength({min:6}),
        fieldValidation
    ], 
    userLogin)

router.get('/renew', jwtValidation, renewToken)

module.exports = router;
