const express=require("express");
const productcontroller=require("../controller/CartController");
const router=express.Router();
router.post("/addproduct",productcontroller.addProduct);
router.get("/getproduct",productcontroller.getProduct);
router.post("/removeproduct",productcontroller.removeProduct);
module.exports=router;