const CheckoutModel=require("../model/CheckoutModel");
exports.addProduct=async(req,res)=>{
   // console.log(req.body)
    try{
        const check=new CheckoutModel({
            products:req.body.products,
            c_id:req.body.c_id,
            rd_code:req.body.r_code,
            subtotal:req.body.subtotal
        })
        let checkout=await check.save();
        if(checkout){
            res.status(200).json({
                message:"success"
            })
            console.log("successfully added")
        }
    }
    catch{
        console.log("Error")
    }
}
exports.getProduct=async(req,res)=>{
    //console.log(req.body);
    try{
        const check=await CheckoutModel.findOne({
            c_id:req.body.c_id,
            rd_code:req.body.r_code
        })
        if(check){
            //console.log("found",check)
            res.send(check)
        }
    }
    catch{
        return res.status(400).json({
            message:"not found"
        })
    }
}
exports.removeProduct=async(req,res)=>{
    console.log(req.body)
}