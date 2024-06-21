const { Router } = require('express')
const { check } = require('express-validator')

const { fieldValidation } = require('../../../middlewares/fieldValidation') //require('../middlewares/fieldValidation')
const { jwtValidation } = require('../../../middlewares/jwtValidation') //require('../middlewares/jwtValidation')

const { addCategory, getCategories, getCategory, updCategory, delCategory } = require('../controllers/category')
const router = Router()

// router.post('/', (req,res) => {
//     res.json({msg:"POST products..."})
// })

router.post('/',
    [
        check('name', 'The name is required').not().isEmpty(),
        check('description', 'The description is required').not().isEmpty(),
        fieldValidation
    ],    
    addCategory 
)

// get all categories
router.get('/', 
    getCategories)

// get category
router.get('/:id', 
    getCategory)

// Update Category
router.put('/:id', 
    updCategory)

// delete category
router.delete('/:id', 
    delCategory)    

module.exports = router