import express from "express";
import {
  CreateCart,
  deleteAll,
  DeleteItemCart,
  getAllCart,
  getCartUser,
  updateCart,
} from "../controllers/cartController.js";

const router = express.Router();

router.post("/", CreateCart);
router.put("/:id", updateCart);
router.get("/find/:userId", getCartUser);
router.get("/", getAllCart);
router.post("/deleteItem", DeleteItemCart);
router.post("/deleteAllItem/:userId", deleteAll);

export default router;
