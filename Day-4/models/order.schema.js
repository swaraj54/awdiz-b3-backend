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
      price: { type: Number, required: true },
    },
  ],
  totalPrice: { type: Number, required: true },
  modeOfPayment: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
});

const OrderSchema = mongoose.model("orders", schema);

export default OrderSchema;
