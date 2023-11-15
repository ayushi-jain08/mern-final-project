import Product from "../Model/Product.js";

// =============CREATE PRODUCT==================
export const CreateProduct = async (req, res, next) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json({
      success: false,
      product,
    });
  } catch (error) {
    console.log(error);
  }
};

//===========================GET ALL PRODUCTS======================
export const GetAllProduct = async (req, res) => {
  try {
    const product = await Product.find();
    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.log(error);
  }
};
