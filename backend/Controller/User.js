import cloudinary from "../Cloudinary.js";
import User from "../Model/User.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/Error.js";
import Jwt from "jsonwebtoken";

//=================REGISTER USER====================//
const uploadImage = async (file) => {
  const folder = "images";
  const result = await cloudinary.uploader.upload(file.tempFilePath, {
    folder,
  });
  return {
    public_id: result.public_id,
    url: result.secure_url,
  };
};

export const RegisterUser = async (req, res, next) => {
  const { name, email, mobile, password } = req.body;

  try {
    let user;
    const hashPassword = bcryptjs.hashSync(password, 10);
    if (!req.files || !req.files.img) {
      // No image present, create user without image
      user = new User({
        name,
        email,
        mobile,
        password: hashPassword,
      });
    } else {
      const imageInfo = await uploadImage(req.files.img);

      user = new User({
        name,
        email,
        mobile,
        password: hashPassword,
        pic: imageInfo,
      });
    }

    const userExist = await User.findOne({ email });
    const Noexist = await User.findOne({ mobile });
    if (userExist) {
      next(errorHandler(400, "This email already exist"));
    } else {
      if (Noexist) {
        next(errorHandler(400, "This no. already have an account"));
      } else {
        await user.save();
        res.status(200).json({
          msg: "User register Successfully!!",
        });
      }
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//======================LOGIN USER======================//
export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      next(errorHandler(404, "User not found"));
    }
    const ComparePass = bcryptjs.compareSync(password, validUser.password);
    if (!ComparePass) {
      next(errorHandler(401, "Inavlid Credentials"));
    } else {
      const token = Jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...otherDeatils } = validUser._doc;

      return res.status(200).json({
        users: { otherDeatils, token },
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// ===================USER DATA=======================
export const aboutUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
export const AddShippingAddress = async (req, res) => {
  try {
    const userId = req.user._id;
    const { street, city, state, country, pinCode, phone } = req.body;

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the address fields
    user.address.street = street;
    user.address.city = city;
    user.address.state = state;
    user.address.country = country;
    user.address.pinCode = pinCode;
    user.address.phone = phone;

    // Save the updated user
    const updatedUser = await user.save();

    res
      .status(200)
      .json({ message: "Address updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error adding address:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// ======================CONTACT US FORM======================
export const PostContact = async (req, res) => {
  const { name, email, message, userId } = req.body;
  try {
    const ConatctSubmit = { name, email, message, timestamp: new Date() };
    console.log("oo", userId);
    const user = await User.findById(userId);
    user.contactFormSubmissions.push(ConatctSubmit);

    await user.save();

    res.status(200).json({ message: "Contact form submitted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
};
