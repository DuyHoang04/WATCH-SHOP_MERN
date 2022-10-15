import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  updateProduct,
  getProduct,
} from "../controllers/productController.js";
import { verifyToken } from "../verifyToken.js";
const router = express.Router();

router.post("/", verifyToken, createProduct);
router.put("/:id", verifyToken, updateProduct);
router.delete("/:id", verifyToken, deleteProduct);
router.get("/find/:id", getProduct);
router.get("/", getAllProduct);

export default router;
