const express=require('express');
const UserController=require('../controller/CustomerController');
const router=express.Router();
router.post('/userRegister',UserController.UserRegister);
router.get('/verifyEmail/:token',UserController.verifyEmail);
router.post('/userLogin',UserController.UserLogin);
router.post('/forgotPassword',UserController.forgotPassword);
router.post('/resetPassword',UserController.resetPassword);
router.get("/getUser",UserController.getUser)
module.exports=router;