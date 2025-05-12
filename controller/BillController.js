const OrderModel = require("../model/OrderModel")
const BillModel=require("../model/BillModel");
exports.addBill = async (req, res) => {
    console.log(req.body);
    try {
        const order = new BillModel({
            o_id: req.body.o_id,
            c_id: req.body.c_id,
            c_name: req.body.c_name,
            c_email: req.body.c_email,
            c_phn: req.body.c_phn,
            c_msg: req.body.c_msg,
            c_district: req.body.c_district,
            c_address: req.body.c_address,
            c_landmark: req.body.c_landmark,
            paymentmethod: req.body.paymentmethod,
            products: req.body.products,
            subtotal: req.body.subtotal,
        })
        const added = await order.save();
        if (added) {
            console.log("added succesfully");
            const findorder = await OrderModel.find({
                _id: req.body.o_id
            })
            if (findorder) {
                console.log("order found")
                const removeOrder = await OrderModel.deleteOne({
                    _id: req.body.o_id
                })
                if (removeOrder) {
                    console.log("removed successfully");
                }
            }         
            res.status(200).json({
                message: "Order has been accepted "
            })
        }        
    }
    catch {
        return res.status(400).json({
            message: "failed to add order"
        })
    }

}
exports.getBill = async (req, res) => {
    try {
        const orders = await BillModel.find().sort({ createdAt: -1 }); // Sort by createdAt in descending order
        if (orders) {
            res.send(orders);
        }
    } catch (error) {
        return res.status(400).json({
            message: "Error occurred while finding orders",
            error: error.message // Optional: include the error details
        });
    }
};

