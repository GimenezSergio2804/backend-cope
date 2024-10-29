import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import onusControllers from "../controllers/onusControllers.js";

// modulo routing de express
const router = express.Router();

// registrar onu
router.post("/registrar-onu", onusControllers.createOnu);

export default router;
