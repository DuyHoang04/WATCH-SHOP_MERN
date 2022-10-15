import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    username: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    products: Array,
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: "đang gửi" },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);

export default Order;
