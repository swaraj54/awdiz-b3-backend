import { decodeToken } from "../helpers/authHelpers.js";
import UserSchema from "../models/user.schema.js";

export const checkToken = async (req, res, next) => {
  try {
    // console.log(req.headers.token, "req");
    const data = decodeToken(req.headers.token);
    // console.log(data, "data");
    const isUserValid = await UserSchema.findById(data.userId);
    if (!isUserValid) {
      return res.status(401).json({ message: "User not found." });
    }
    req.userData = isUserValid;
    next();
  } catch (error) {
    return res.status(500).json({
      message: "Error in login route",
      error: error.message,
    });
  }
};
