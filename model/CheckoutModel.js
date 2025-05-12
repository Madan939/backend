const mongoose=require("mongoose");
const checkSchema=new mongoose.Schema({
    products:{
        type:Array,
        require:true
    },
    c_id:{
        type:String,
        require:true
    },
    rd_code:{
        type:String,
        require:true
    },
    subtotal:{
        type:Number,
        require:true
    }
},{timestamps:true});
module.exports=mongoose.model("Checkout",checkSchema);
