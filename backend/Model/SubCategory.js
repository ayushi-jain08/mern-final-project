// models/Subcategory.js
import mongoose from "mongoose";
const subcategorySchema = new mongoose.Schema({
  name: String,
  image: {
    type: String,
    required: true,
  }, // URL to the subcategory image
});

export const subCategory = mongoose.model("subcategories", subcategorySchema);
