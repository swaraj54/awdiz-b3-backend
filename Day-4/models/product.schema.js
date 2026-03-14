import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  category: { type: String },
  stock: { type: Number, default: 0 },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
});

const ProductSchema = mongoose.model("products", schema);

export default ProductSchema;
