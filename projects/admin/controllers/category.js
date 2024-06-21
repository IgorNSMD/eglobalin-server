const Categories = require('../models/Category')

//Add new Customer
exports.addCategory = async(req,res) => {
    //console.log(req.body)
    const category = new Categories(req.body)

    try {

        //save register
        const categoryDoc =  await category.save();
        res.json({
            ok:true,
            category:categoryDoc
        })        

    } catch (error) {
        //if there any error, console.log y next
        console.log(error);
    }
}

//show all Categories
exports.getCategories = async (req,res,next) => {
    try {
        console.log('initial...')
        const categories = await Categories.find({})
        res.json(categories)
        
    } catch (error) {
        // if there any error
        console.log(error)
        next();      
    }
}

//show a Customer by id
exports.getCategory = async (req,res, next) => {
    const category = await Categories.findById(req.params.id)

    if (!category){
        res.json({msg: 'Customer not exists...'})
        next()
    }

    // console.log(category)
    // show category

    res.json(category);

}

// update Category by ID
exports.updCategory = async (req,res,next) => {

    try {
        const category = await Categories.findOneAndUpdate({ _id:req.params.id },
            req.body, {
                new: true
            });
        res.json(category)
    } catch (error) {
        // si hay un error
        console.log(error)
        next();        
    }
    
}

// Delete Category by ID
exports.delCategory = async (req,res,next) => {
    try {

        await Categories.findOneAndDelete({ _id:req.params.id })
        res.json({
            msg:' Category deleted'
        })
    } catch (error) {
        // if there any error
        console.log(error)
        next();             
    }
}