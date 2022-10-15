import express from "express";
import {
  CreateOrder,
  deleteOrder,
  getAllOrder,
  getMonthLyInCome,
  getOrderUser,
  updateOrder,
} from "../controllers/orderController.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

router.post("/", CreateOrder);
router.put("/:id", verifyToken, updateOrder);
router.delete("/:id", verifyToken, deleteOrder);
router.get("/find/:userId", verifyToken, getOrderUser);
router.get("/", verifyToken, getAllOrder);
router.get("/income", verifyToken, getMonthLyInCome);

export default router;
