import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import onusControllers from "../controllers/onusControllers.js";

// modulo routing de express
const router = express.Router();

// get de onus
router.get("/onus", onusControllers.getAllOnus);

// registrar onu
router.post("/registrar-onu", onusControllers.createOnu);

// editar onu
router.put("/editar-onu/:id", onusControllers.updateOnu);

// eliminar onu
router.delete("/eliminar-onu/:id", onusControllers.deleteOnu);

export default router;
