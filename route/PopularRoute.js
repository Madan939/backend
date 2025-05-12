const express=require("express");
const popularcontroller=require("../controller/PopularController");
const router=express.Router();
router.post("/addproduct/:id",popularcontroller.addproduct);
router.get("/getproduct",popularcontroller.getproduct);
router.post("/deleteproduct/:id",popularcontroller.deleteproduct);
module.exports=router;