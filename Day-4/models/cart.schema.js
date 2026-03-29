import mongoose from "mongoose";

const schema = new mongoose.Schema({
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
        required: true,
      },
      quantity: { type: Number, default: 1 },
    },
  ],
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
});

const CartSchema = mongoose.model("carts", schema);

export default CartSchema;
