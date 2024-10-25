import express from "express";
import userControllers from "../controllers/usuariosControllers.js";
import authMiddleware from "../middleware/authMiddleware.js";

// modulo routing de express
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Holi");
});

// registrar usuario
router.post("/registrar-usuario", authMiddleware, userControllers.register);
// login
router.post("/login", userControllers.login);

export default router;
