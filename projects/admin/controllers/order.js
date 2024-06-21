const Orders = require('../models/Order');

exports.addOrder = async (req, res ) => {
    const order = new Orders(req.body);
    try {
        const orderDoc =  await order.save();
        res.json({
            ok:true,
            order:orderDoc
        })   
    } catch (error) {
        console.log(error);
    }
}

// Get all orders
exports.getOrders = async (req, res, next) => {
    try {
        const orders = await Orders.find({}).populate('customer').populate({
            path: 'order.product',
            model: 'Product'
        });

        res.json(orders);
    } catch (error) {
        console.log(error);
        next();
    }
}

// get order by ID
exports.getOrder = async (req, res, next) => {
    const order = await Orders.findById(req.params.id).populate('customer').populate({
        path: 'order.product',
        model: 'Product'
    })

    if(!order) {
        res.json({msg : 'Order not exists...'});
        return next();
    }

    // get order..
    res.json(order);
}

// Update order by Id
exports.updOrder = async (req, res, next) => {
    try {
        let order = await Orders.findOneAndUpdate({_id : req.params.id }, req.body, {
            new: true
        } )
        .populate('customer')
        .populate({
            path: 'customer.product',
            model: 'Product'
        });

        res.json(order)
    } catch (error) {
        console.log(error);
        next();
    }
}

// delete order by id
exports.delOrder = async (req, res, next) => {
    try {
        await Orders.findOneAndDelete({ _id : req.params.id });
        res.json({ msg : 'Order deleted...' });
    } catch (error) {
        console.log(error);
        next();
    }
}