import express from "express";
import usersControllers from "../controllers/usersControllers.js";
import authMiddleware from "../middleware/authMiddleware.js";

// modulo routing de express
const router = express.Router();

// registrar usuario
router.post("/registrar-usuario", authMiddleware, usersControllers.register);
// login
router.post("/login", usersControllers.login);

export default router;
