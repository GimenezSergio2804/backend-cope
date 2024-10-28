import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import onusControllers from "../controllers/onusControllers.js";

// modulo routing de express
const router = express.Router();

// registrar calle
router.post("/registrar-onu", onusControllers.createOnu);

export default router;
