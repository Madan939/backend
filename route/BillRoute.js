const express=require("express");
const BillController=require("../controller/BillController");
const router=express.Router();
router.post("/addBill",BillController.addBill);
router.get("/getBill",BillController.getBill);
module.exports=router;