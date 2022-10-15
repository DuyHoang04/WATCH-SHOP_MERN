import express from "express";
import {
  DeleteUser,
  getUser,
  UpdateUser,
  getAllUser,
  getUserStats,
} from "../controllers/userController.js";
import { verifyToken } from "../verifyToken.js";
const router = express.Router();

//UPDATE
router.put("/:id", verifyToken, UpdateUser);
//DELETE
router.delete("/:id", verifyToken, DeleteUser);
//GET USER
router.get("/find/:id", verifyToken, getUser);
//GET ALL USER
router.get("/", verifyToken, getAllUser);
router.get("/stats", verifyToken, getUserStats);

export default router;
