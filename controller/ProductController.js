const fs = require('fs');
const path = require('path');
const ProductModel = require("../model/ProductModel");
exports.addproduct = async (req, res) => {
    console.log(req.body);
    try {
        let Product = new ProductModel({
            name: req.body.name,
            price: req.body.price,
            category: req.body.category,
            quantity: req.body.quantity,
            image: req.file.path
        })
        Product = await Product.save();
        if (Product) {
            return res.status(200).json({
                message: "product added successfully"
            })
        }
    }
    catch (Err) {
        res.status(400).json({
            message: "Failed to add product"
        });
        console.log(Err)
    }
}
exports.getproduct = async (req, res) => {
    try {
        let product = await ProductModel.find();
        res.send(product);
    }
    catch (Err) {
        res.status(400).json({
            message: "Failed to find product"
        });
        console.log(Err)
    }
}
exports.editproduct = async (req, res) => {
    // console.log(req.params._id)
    try {
        let product = await ProductModel.findById(req.params._id);
        if (product) {
            res.send(product)
        }
    }
    catch(Err) {
        res.status(400).json({
            message: "Failed to find product"
        });
        console.log(Err)
    }
}
exports.updateproduct = async (req, res) => {
    //console.log(req.body);
    try {
        const id=req.body._id;
        let product=await ProductModel.findById(id);
        if(!product){
            res.status(400).json({
                message:"product not found"
            })
        }
        const {name,price,category,quantity}=req.body;
        let image=product.image;
        if (req.file && req.file.path) {
            const oldimgpath = path.join(__dirname, '../', product.image)
           // console.log(oldimgpath)
            fs.unlink(oldimgpath, (err) => {
                if (err) {
                    console.log("failed to delete old image")
                }
                else {
                    console.log("deleted")
                }
            })
            image = req.file.path
        }
        let update = await ProductModel.findByIdAndUpdate(id, { name,price,quantity,category,image});
        if (update) {
            console.log("updated")
            res.status(200).json({
                message: "Product updated successfully"
            })
        }
    }
    catch(Err) {
        res.status(400).json({
            message: "Failed to update product"
        });
        console.log(Err)
    }
}
exports.deleteproduct=async(req,res)=>{
    console.log(req.params.id);
    try{
        const product=await ProductModel.findById(req.params.id);
        if(!product){
            res.status(400).json({
                message:"product not found"
            })
        }
        const oldImgPath = path.join(__dirname, '../', product.image);
        fs.unlink(oldImgPath, (err) => {
            if (err) {
                console.error("Failed to delete old image:", err);
            } else {
                console.log("Old image deleted successfully");
            }
        });
        const deleteproduct= await ProductModel.findByIdAndDelete(req.params.id);
        if(!deleteproduct){
            return res.status(400).json({
                message:"failed to delete product"
            })
        }
        else{
            res.status(200).json({
                message:"product deleted successfully"
            })
        }
    }
    catch (Err){
        res.status(400).json({
            message: "Failed to delete product"
        });
        console.log(Err)
    }
}