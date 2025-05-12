const mongoose=require("mongoose");
const productSchema=new mongoose.Schema({
    c_id:{
        type:String,
        require:true
    },
    p_id:{
        type:String,
        require:true
    },
    p_name:{
        type:String,
        require:true
    },
    p_price:{
        type:Number,
        require:true
    },
    image:{
        type:String,
        require:true
    }
},{timestamps:true});
module.exports=mongoose.model("Cart",productSchema);
