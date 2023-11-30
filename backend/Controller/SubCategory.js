import cloudinary from "../Cloudinary.js";
import { subCategory } from "../Model/SubCategory.js";
import Product from "../Model/Product.js";
//   ========================POST SUBCATEGORY===========================

export const CreateSubcategory = async (req, res) => {
  if (!req.files || !req.files.photo) {
    return res.status(400).json({ message: "Image file is required." });
  }
  const file = req.files.photo;
  const folder = "images";

  const result = cloudinary.uploader.upload(file.tempFilePath, {
    folder,
  });

  try {
    const { name } = req.body;
    const subcategory = new subCategory({
      name,
      image: (await result).secure_url,
    });
    const saveSubcategory = await subcategory.save();
    res.status(200).json(saveSubcategory);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error", error });
  }
};
// ==========================GET SUBCATEGORY===================================
export const GetAllSubCategory = async (req, res) => {
  try {
    const subcategories = await subCategory.find().limit(10);
    res.status(200).json(subcategories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error", error });
  }
};
//   ========================GET SINGLE SUBCATEGORY==================
export const GetSingleSubcategory = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perpage = 2;

    const startIndex = (page - 1) * perpage;
    const { subcategoryID } = req.params;

    const products = await Product.find({ subcategory: subcategoryID })
      .skip(startIndex)
      .limit(perpage);
    const totalProducts = await Product.countDocuments({
      subcategory: subcategoryID,
    });
    const totalPages = Math.ceil(totalProducts / perpage);

    if (!products || products.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found for the specified subcategory." });
    }
    res.status(200).json({
      products,
      totalPages,
      totalProducts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error", error });
  }
};
