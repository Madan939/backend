const MessageModel = require("../model/MessageModel");
const messageModel = require("../model/MessageModel");
exports.addmessage = async (req, res) => {
    // console.log(req.body)
    try {
        const message = new messageModel({
            fname: req.body.fname,
            lname: req.body.lname,
            email: req.body.email,
            comments: req.body.comments
        })
        // console.log(message)
        if (!message) {
            return res.status(400).json({
                message: "Failed to sent message"
            })
        }
        const Message = await message.save();
        if (Message) {
            return res.status(200).json({
                message: "Message sent successfully"
            })
        }
    }
    catch {
        return res.status(400).json({
            message: "Failed to sent message"
        })
    }
}
exports.getmessage = async (req, res) => {
    try {
        const message = await MessageModel.find();
        res.send(message);
    }
    catch {
        return res.status(400).json({
            message: "Failed to get message"
        })
    }
}