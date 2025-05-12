const express=require("express");
const orderController=require("../controller/OrderController");
const router=express.Router();
router.post("/addOrder",orderController.addOrder);
router.get("/getOrder",orderController.getOrder);
router.post("/cancelOrder",orderController.cancelOrder);
module.exports=router;