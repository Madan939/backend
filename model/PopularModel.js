const mongoose=require("mongoose");
const productSchema=new mongoose.Schema({
    product_id:{
        type:String,
        require:true
    },
    name:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
    },
    category:{
        type:String,
        require:true
    },
    quantity:{
        type:Number,
        require:true
    },
    image:{
        type:String,
        require:true
    }
},{timestamps:true});
module.exports=mongoose.model("PopularProducts",productSchema);
