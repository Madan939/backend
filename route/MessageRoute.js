const express=require('express');
const messageController=require('../controller/MessageController');
const router=express.Router();
router.post('/addmessage',messageController.addmessage);
router.get('/getmessage',messageController.getmessage);
module.exports=router;