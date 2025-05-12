const ProductModel = require("../model/ProductModel");
const PopularModel = require("../model/PopularModel");
exports.addproduct = async (req, res) => {
    console.log(req.params.id);
     try {
    let product=await ProductModel.findById(req.params.id)
    if(!product){
        console.log("product not found")
    }
    //console.log(product)
        let Popularproduct = new PopularModel({
            product_id:product._id,
            name: product.name,
            price: product.price,
            category: product.category,
            quantity: product.quantity,
            image: product.image
        })
        Popularproduct = await Popularproduct.save();
        if (Popularproduct) {
            return res.status(200).json({
                message: "popularproduct added successfully"
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
        let product = await PopularModel.find();
        res.send(product);
    }
    catch (Err) {
        res.status(400).json({
            message: "Failed to find product"
        });
        console.log(Err)
    }
}
exports.deleteproduct=async(req,res)=>{
   //console.log(req.params.id);
    try{
        const product=await PopularModel.findOne({product_id:req.params.id});
       // console.log(product)
        const deleteproduct= await PopularModel.findByIdAndDelete(product._id);
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