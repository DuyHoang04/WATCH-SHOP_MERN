import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import mongoose from "mongoose";
import AuthRouter from "./routes/auth.js";
import UsersRouter from "./routes/users.js";
import ProductRouter from "./routes/products.js";
import CartRouter from "./routes/cart.js";
import OrderRouter from "./routes/order.js";
import StripeRouter from "./routes/stripe.js";

const app = express();

const PORT = process.env.PORT || 8080;

dotenv.config();

app.use(cors());

app.use(morgan("common"));

app.use(express.json());

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("CONNECTED MONGODB");
  } catch (error) {
    throw error;
  }
};

// MONGOOSE CONNECTION
mongoose.connection.on("disconnected", () => {
  console.log("MONGODB DISCONNECTED");
});
mongoose.connection.on("connected", () => {
  console.log("MONGODB CONNECTED");
});

app.use("/api/auth", AuthRouter);
app.use("/api/users", UsersRouter);
app.use("/api/products", ProductRouter);
app.use("/api/carts", CartRouter);
app.use("/api/orders", OrderRouter);
app.use("/api/checkout", StripeRouter);

app.listen(PORT, () => {
  connect();
  console.log("CONNECTED BACKEND SUCCESS");
});
