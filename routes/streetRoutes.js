import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import streetControllers from "../controllers/streetControllers.js";

// modulo routing de express
const router = express.Router();

// registrar calle
router.post("/registrar-calle", streetControllers.createStreet);
// consultar todas las calles
router.get("/calles", streetControllers.getAllStreets);
// editar calle
router.put("/editar-calle/:id", streetControllers.updateStreet);
// eliminar calle
router.delete("/eliminar-calle/:id", streetControllers.delete);

export default router;
