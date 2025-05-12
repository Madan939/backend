const express=require("express");
const checkOut=require("../controller/CheckOutController");
const router=express.Router();
router.post("/addproduct",checkOut.addProduct);
router.post("/getproduct",checkOut.getProduct);
router.post("/removeproduct",checkOut.removeProduct);
module.exports=router;