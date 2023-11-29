import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: String,
  subcategories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "subcategories",
      required: true,
    },
  ],
});

export const Category = mongoose.model("categories", categorySchema);
