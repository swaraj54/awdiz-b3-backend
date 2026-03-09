import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "seller", "user"], default: "user" },
  isActive: { type: Boolean, default: true },
});

const UserSchema = mongoose.model("users", schema);

export default UserSchema;
