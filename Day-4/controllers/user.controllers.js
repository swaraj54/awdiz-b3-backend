import UserSchema from "../models/user.schema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
    console.log(req.userData,"req.userData")
    res.send(true)
  } catch (error) {
    return res.status(500).json({
      message: "Error in login route",
      error: error.message,
    });
  }
};
