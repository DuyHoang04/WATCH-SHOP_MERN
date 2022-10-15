import express from "express";
import { Register, Login } from "../controllers/authController.js";
const router = express.Router();

router.post("/register", Register);
router.post("/login", Login);
// router.post("/:id", UpdateUser);
// router.get("/logout/:id", LogOut);

export default router;
