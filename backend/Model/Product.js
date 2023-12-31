import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  desc: {
    type: String,
    required: true,
  },
  ratings: {
    type: Number,
    default: 0,
  },
  brand: {
    type: String,
    required: true,
  },
  mrp: {
    type: Number,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
  discount: {
    type: String,
    required: true,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  feature: {
    type: Boolean,
    // require: true,
    default: false,
  },
  category: {
    type: String,
    // required: [true, "Please Enter Product Category"],
  },
  subcategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subcategory",
    // required: true,
  },
  Stock: {
    type: Number,
    required: [true, "Please Enter product Stock"],
    maxLength: [4, "Stock cannot exceed 4 characters"],
    default: 1,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const product = mongoose.model("Product", productSchema);
export default product;
