import UserSchema from "../models/user.schema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import CartSchema from "../models/cart.schema.js";
import OrderSchema from "../models/order.schema.js";

export const Register = async (req, res) => {
  try {
    const { name, email, password, role = "user" } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    const isEmailExist = await UserSchema.findOne({ email });
    if (isEmailExist) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await UserSchema.create({
      name,
      email,
      password: hashedPassword,
      role,
    });
    return res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error in register route",
      error: error.message,
    });
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    const user = await UserSchema.findOne({ email });
    console.log(user, "user");
    if (!user) {
      return res.status(400).json({
        message: "Invalid email. Please register first.",
      });
    }
    const isPassswordCorret = await bcrypt.compare(password, user.password);
    console.log(isPassswordCorret, "isPassswordCorret");
    if (!isPassswordCorret) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }
    // jwt token , cookies set

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    res.cookie("token", token);

    return res.status(200).json({
      message: "User logged in successfully",
      userData: { name: user.name, role: user.role },
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error in login route",
      error: error.message,
    });
  }
};

export const AddCart = async (req, res) => {
  try {
    console.log(req.userData, "req.userData");
    const { productId, quantity } = req.body;
    if (!productId || !quantity) {
      return res.status(400).json({
        message: "Product ID and quantity are required",
      });
    }

    const cart = await CartSchema.findOne({ user: req.userData._id });
    if (!cart) {
      const newCart = await CartSchema.create({
        user: req.userData._id,
        products: [{ product: productId, quantity }],
      });
      console.log(newCart, "newCart");
    } else {
      const productIndex = cart.products.findIndex(
        (item) => item.product.toString() === productId,
      );
      if (productIndex > -1) {
        cart.products[productIndex].quantity += quantity;
      } else {
        cart.products.push({ product: productId, quantity });
      }
      await cart.save();
    }
    return res
      .status(200)
      .json({ message: "Product added to cart successfully" });
  } catch (error) {
    return res.status(500).json({
      message: "Error in login route",
      error: error.message,
    });
  }
};

export const GetCart = async (req, res) => {
  try {
    console.log(req.userData, "req.userData");
    const cart = await CartSchema.findOne({ user: req.userData._id }).populate(
      "products.product",
    );
    return res.status(200).json({
      message: "Cart retrieved successfully",
      cart: cart,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error in getting cart",
      error: error.message,
    });
  }
};

export const MakeOrder = async (req, res) => {
  try {
    console.log(req.userData, "req.userData");

    const result = await CartSchema.aggregate([
      { $match: { user: req.userData._id } },
      { $unwind: "$products" },
      {
        $lookup: {
          from: "products",
          localField: "products.product",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      { $unwind: "$productDetails" },
      {
        $project: {
          product: "$products.product",
          quantity: "$products.quantity",
          price: "$productDetails.price",
        },
      },
      {
        $group: {
          _id: "$product",
          totalPrice: { $sum: { $multiply: ["$quantity", "$price"] } },
        },
      },
    ]);
    console.log(result, "result");

    const products = [];
    const cart = await CartSchema.findOne({ user: req.userData._id }).populate(
      "products.product",
    );

    if (!cart) {
      return res.status(400).json({
        message: "Cart is empty",
      });
    }
    console.log(1, cart, "cart");
    for (let i = 0; i < cart.products.length; i++) {
      products.push({
        product: cart.products[i].product._id,
        quantity: cart.products[i].quantity,
        price: cart.products[i].product.price,
        // price :
      });
    }

    console.log(2);
    // console.log(products,"products")
    const newOrder = await OrderSchema.create({
      user: req.userData._id,
      products: products,
      totalPrice: result[0].totalPrice,
      modeOfPayment: "COD",
    });

    console.log(3);
    await CartSchema.findOneAndDelete({
      user: req.userData._id,
    });

    return res.status(200).json({
      message: "Order created successfully",
      // order: newOrder,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error in getting cart",
      error: error.message,
    });
  }
};

export const GetOrders = async (req, res) => {
  try {
    console.log(req.userData, "req.userData");
    const orders = await OrderSchema.find({ user: req.userData._id }).populate(
      "products.product",
    );
    return res.status(200).json({
      message: "Orders retrieved successfully",
      orders: orders,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error in getting cart",
      error: error.message,
    });
  }
};
