const ProductModel = require("../model/ProductModel");
const CartModel = require("../model/CartModel");
exports.addProduct = async (req, res) => {
    //console.log(req.body)
    try {
        const product = await ProductModel.findById(req.body.p_id)
        if (!product) {
            console.log("product not found")
            return res.status(400).json({
                message: "product not found"
            });
        }
        const cart = new CartModel({
            c_id: req.body.c_id,
            p_id: product._id,
            p_name: product.name,
            p_price: product.price,
            image: product.image
        });
        let findcart = await CartModel.findOne({ p_id: req.body.p_id })
        if (findcart) {
            console.log("Already exist")
            return res.status(400).json({
                message: "failed to add,product already exist"
            });
        }
        if (!cart) {
            console.log("failed to add to cart");
            return res.status(400).json({
                message: "failed to add"
            });
        }
        let Cart = await cart.save();
        if (Cart) {
            console.log("added to cart");
            return res.status(200).json({
                message: `${product.name} added to cart successfully`
            });
        }

    }
    catch {
        return res.status(400).json({
            message: "failed to add to cart"
        });
    }
}
exports.getProduct = async (req, res) => {
try{
    const Cart=await CartModel.find();
    res.send(Cart);
}
catch{
    return res.status(400).json({
        message: "failed to find cart"
    });
}
}
exports.removeProduct = async (req, res) => {
    console.log(req.body)
    try{
        const product=await CartModel.findOne({
            p_id:req.body.p_id,
            c_id:req.body.c_id
        })
        if(!product){
            return res.status(400).json({
                message: "failed to find product"
            });
        }
        //console.log("product found",product);
        const remove=await CartModel.deleteOne({
            _id: product._id,
        });
        if(!remove){
            return res.status(400).json({
                message: "failed to remove product"
            }); 
        }
        res.status(200).json({
            message: `${product.p_name} removed from cart successfully`
        });
    }
    catch{
        return res.status(400).json({
            message: "failed to find product"
        });
    }

}