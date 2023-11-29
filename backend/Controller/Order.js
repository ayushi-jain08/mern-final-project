import { Order } from "../Model/Order.js";

//=====================CREATE ORDER========================//
export const CreateOrder = async (req, res) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  try {
    const order = await Order.create({
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      paidAt: Date.now(),
      user: req.user._id,
    });
    // const orderSave = await order.save()
    res.status(201).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(500).json({ error: "Internal server error" });
  }
};

//======================GET ALL ORDER=========================//
export const GetAllOrder = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });

    res.status(200).json(orders.reverse());
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(500).json({ error: "Internal server error" });
  }
};

// ======================GET SINGLE ORDER===================
export const GetSingleOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id).populate("user", "name email");

    if (!order) {
      return next(new ErrorHander("Order not found with this Id", 404));
    }

    res.status(200).json(order);
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(500).json({ error: "Internal server error" });
  }
};
