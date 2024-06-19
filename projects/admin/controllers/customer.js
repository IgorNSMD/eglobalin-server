const Customers = require('../models/Customers')

//Add new Customer
exports.addCustomer = async(req,res) => {
    //console.log(req.body)
    const customer = new Customers(req.body)

    try {

        //save register
        const customerDoc =  await customer.save();
        res.json({
            ok:true,
            customer:customerDoc
        })        

    } catch (error) {
        //if there any error, console.log y next
        console.log(error);
    }
}

//show all Customers
exports.getCustomers = async (req,res,next) => {
    try {
        console.log('initial...')
        const customers = await Customers.find({})
        res.json(customers)
        
    } catch (error) {
        // if there any error
        console.log(error)
        next();      
    }
}

//show a Customer by id
exports.getCustomer = async (req,res, next) => {
    const customer = await Customers.findById(req.params.id)

    if (!customer){
        res.json({mensaje: 'Customer not exists...'})
        next()
    }

    // console.log(customer)
    // show Customer

    res.json(customer);

}

// update Customer by ID
exports.updCustomer = async (req,res,next) => {

    try {
        const customer = await Customers.findOneAndUpdate({ _id:req.params.id },
            req.body, {
                new: true
            });
        res.json(customer)
    } catch (error) {
        // si hay un error
        console.log(error)
        next();        
    }
    
}

// Delete Customer by ID
exports.delCustomer = async (req,res,next) => {
    try {

        await Customers.findOneAndDelete({ _id:req.params.id })
        res.json({
            mensaje:' Customer deleted'
        })
    } catch (error) {
        // if there any error
        console.log(error)
        next();             
    }
}