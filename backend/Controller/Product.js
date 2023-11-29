import Product from "../Model/Product.js";
import cloudinary from "../Cloudinary.js";
import User from "../Model/User.js";

// =============CREATE PRODUCT==================
export const CreateProduct = async (req, res, next) => {
  if (!req.files || !req.files.photo) {
    return res
      .status(400)
      .json({ success: false, message: "Image file is required." });
  }
  const { name, brand, desc, mrp, cost, discount, feature, category } =
    req.body;
  const imageFiles = req.files.photo;
  const imageUrls = [];
  const folder = "images";
  for (const file of imageFiles) {
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      folder,
    });
    imageUrls.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }
  try {
    const product = new Product({
      name,
      brand,
      desc,
      mrp,
      cost,
      discount,
      feature,
      category,
      images: imageUrls,
    });
    await product.save();
    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
// ==================UPDATE PRODUCT======================
export const UpdateProduct = async (req, res) => {
  const { id } = req.params;
  try {
    // Find the product by ID
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    // Update product properties based on request body
    if (req.body.name) {
      product.name = req.body.name;
    }

    if (req.body.description) {
      product.description = req.body.description;
    }

    if (req.body.price) {
      product.price = req.body.price;
    }

    if (req.body.brand) {
      product.brand = req.body.brand;
    }
    if (req.body.subcategory) {
      product.subcategory = req.body.subcategory;
    }

    // Save the updated product
    await product.save();

    res.status(200).json({
      message: "Product updated successfully",
      updatedProduct: product,
    });
  } catch (error) {
    res.status(500).json({
      message: `Server Error: ${error}`,
    });
  }
};
//===========================GET ALL PRODUCTS======================
export const GetAllProduct = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perpage = 3;

    const startIndex = (page - 1) * perpage;

    const brandFilter = req.query.brand ? { brand: req.query.brand } : {};
    const categoryFilter = req.query.category
      ? { category: req.query.category }
      : {};
    console.log("brns", brandFilter);
    console.log("catego", categoryFilter);
    const totalProducts = await Product.countDocuments();
    const totalPages = Math.ceil(totalProducts / perpage);

    let query = Product.find({ ...brandFilter, ...categoryFilter })
      .skip(startIndex)
      .limit(perpage);

    if (req.query.sort) {
      // Apply sorting if a sorting option is provided
      const sortDirection = req.query.sort === "desc" ? -1 : 1;
      query = query.sort({ cost: sortDirection });
    }

    const products = await query;
    if (!products) {
      res.status(400).json({
        meassage: "no product found",
      });
    } else {
      res.status(200).json({
        products,
        totalProducts,
        totalPages,
        currentPage: page,
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};

//=======================GET PRODUCT BY CATEGORY===================
export const GetProductByCategory = async (req, res) => {
  try {
    const defaultCategory = "women";
    const frontendCategory = req.query.category
      ? req.query.category.trim()
      : defaultCategory;

    const products = await Product.find({
      category: { $regex: frontendCategory, $options: "i" },
    }).limit(4);
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

//============================GET SINGLE PRODUCT===========================//
export const getSingleProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(400).json({
        message: "product not found",
      });
    }
  } catch (error) {
    res.status(500).json({ meassage: `Server Error: ${error}` });
  }
};

// ========================GET RELATED PRODUCT=================
export const GetRelatedProuct = async (req, res) => {
  const { productId } = req.params;
  try {
    const product = await Product.findById(productId);
    const relatedProduct = await Product.find({
      $or: [
        { name: { $regex: product.name, $options: "i" } },
        { category: { $regex: product.category, $options: "i" } },
      ],
      _id: { $ne: productId },
    }).limit(10);

    res.status(200).json(relatedProduct);
  } catch (error) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
// ====================ADD TO CART PRODUCTS===================
export const PostAddToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(401).json({ message: "Invalid User" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      console.error(`Product with ID ${productId} not found.`);
      return res.status(404).json({ message: "Product not found" });
    }

    const existingCartItem = user.cart.find((cartItem) =>
      cartItem.product.equals(product._id)
    );

    if (existingCartItem) {
      existingCartItem.quantity += quantity;
      user.markModified("cart");
    } else {
      user.cart.push({ product: product._id, quantity: quantity });
    }

    await user.save();

    return res.status(200).json({ message: "Item added to cart successfully" });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(500).json({ error: "Internal server error" });
  }
};
// ======================GET ADD TO CART PRODUCTS===================
export const getCart = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("cart.product");
    if (!user) {
      return res.status(401).json({ error: "Invalid User" });
    }

    const cartWithSubtotal = user.cart.map((cartItem) => ({
      ...cartItem.toObject(),
      subtotal: cartItem.product.cost * cartItem.quantity,
    }));
    res.status(200).json(cartWithSubtotal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const UpdateCart = async (req, res) => {
  try {
    const { productId, operation } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(401).json({ error: "Invalid User" });
    }
    const cartItems = user.cart.find(
      (cartitem) => cartitem.product.toString() === productId
    );

    if (!cartItems) {
      return res.status(404).json({ error: "Product not found in cart" });
    }
    if (operation === "increase") {
      cartItems.quantity += 1;
    } else if (operation === "decrease") {
      if (cartItems.quantity > 1) {
        cartItems.quantity -= 1;
      }
    }
    user.markModified("cart");
    await user.save();

    res.status(200).json({ message: "Cart quantity updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// ===============DELETE ITEM FROM CART================
export const DeleteCartProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(401).json({ error: "Invalid User" });
    }
    const productIndex = user.cart.findIndex(
      (cartitem) => cartitem.product.toHexString() === productId
    );

    if (productIndex === -1) {
      return res.status(404).json({ error: "Product not found in cart" });
    }
    // Remove the product from the cart array
    user.cart.splice(productIndex, 1);

    await user.save();
    res.status(200).json({ message: "Product removed from cart" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//=================CLEAR ALL CART PRODUCT================//
export const DeleteWholeCartProduct = async (req, res, next) => {
  const userId = req.user._id;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: { cart: [] } },
      { new: true }
    );
    res.status(200).json("whole cart product deleted");
  } catch (error) {
    next(error);
  }
};
// ==================ADD TO WISHLIST==================
export const AddToWishList = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(401).json({ error: "Invalid User" });
    }
    const product = await Product.findById(productId);
    if (!product) {
      console.error(`Product with ID ${productId} not found.`);
      return res.status(404).json({ message: "Product not found" });
    }
    const existingwishItem = user.wishlist.find(
      (wishitem) => wishitem.product.toString() === productId
    );

    if (existingwishItem) {
      user.wishlist.pull({ product: product._id });
      await user.save();
      return res.status(200).json({ success: true, productId, added: false });
    } else {
      user.wishlist.push({ product: product._id });
      await user.save();
      return res.status(200).json({ success: true, productId, added: true });
    }
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(500).json({ error: "Internal server error" });
  }
};

// ==========================GET WISHLIST====================
export const GetWishList = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("wishlist.product");
    if (!user) {
      return res.status(401).json({ error: "Invalid User" });
    }
    const wishlistItem = user.wishlist.map((wishitem) => ({
      ...wishitem.toObject(),
    }));
    res.status(200).json(wishlistItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// ==========================SEARCH PRODUCT API===========================
export const SearchProduct = async (req, res) => {
  try {
    const search = req.query.searchTerm || " ";
    const product = await Product.find({
      $or: [
        { name: { $regex: search, $options: "i" } },
        { brand: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ],
    });
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

export const ProductByCategory = async (req, res) => {
  const { category } = req.params;

  try {
    const products = await Product.find({ category });
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
