const CartModel = require("../model/CartModel");
const CheckoutModel = require("../model/CheckoutModel");
const OrderModel = require("../model/OrderModel")

exports.addOrder=async(req,res)=>{
   // console.log(req.body);
   try{
    const order=new OrderModel({
        c_id:req.body.c_id,
        c_name:req.body.c_name,
        c_email:req.body.c_email,
        c_phn:req.body.c_phn,
        c_msg:req.body.c_msg,
        c_district:req.body.c_district,
        c_address:req.body.c_address,
        c_landmark:req.body.c_landmark,
        paymentmethod:req.body.paymentmethod,
        products:req.body.products,
        subtotal:req.body.subtotal,
    })
    const added=await order.save();
    if(added){
        console.log("added succesfully");
        const findcart=await CartModel.find({
            c_id:req.body.c_id
        })
        if(findcart){
           // console.log("cart found",findcart)
            const remove=await CartModel.deleteMany({
                c_id:req.body.c_id
            })
            if(remove){
                console.log("removed successfully");
                // res.status(200).json({
                //     message:"successfully remove product from cart"
                // })
            }
        }
        const check=await CheckoutModel.find({
            c_id:req.body.c_id
        })
        if(check){
            console.log("checkout found",check)
            const remove=await CheckoutModel.deleteMany({
                c_id:req.body.c_id
            })
            if(remove){
               console.log("removed checkout successfully");
                // res.status(200).json({
                //     message:"successfully removed checkout"
                // })
            }
        }
        res.status(200).json({
            message:"Your order has been sent successfully"
        })
    }
   }
   catch{
    return res.status(400).json({
        message:"failed to add order"
    })
   }

}
exports.getOrder = async (req, res) => {
    try {
        const orders = await OrderModel.find().sort({ createdAt: -1 }); // Sort by createdAt in descending order
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
exports.cancelOrder=async(req,res)=>{
    console.log(req.body)
    try{
        const findorder= await OrderModel.findByIdAndDelete(req.body.id);
        if(findorder){
            console.log("order found and deleted succesfully");
            res.status(200).json({
                message:"Order cancel successfully"
            })
        }
    }
    catch{
        return res.status(400).json({
            message:"failed "
        })
    }
}