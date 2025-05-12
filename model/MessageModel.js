const mongoose=require("mongoose");
const messageSchema=new mongoose.Schema({
    fname:{
        type:String,
        require:true
    },
    lname:{
        type:String,
        require:true
    },
     email:{
        type:String,
        require:true
    },
    comments:{
        type:String,
        require:true
    },
   
},{timestamps:true});
module.exports=mongoose.model("Message",messageSchema);