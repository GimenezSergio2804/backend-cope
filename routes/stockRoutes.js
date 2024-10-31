import express from "express";
import stockController from "../controllers/stockControllers.js";

const router = express.Router();

// Ruta para crear un nuevo producto
router.post("/crear-stock", stockController.createProduct);

// Ruta para actualizar cantidad de un producto
router.put("/modificar-stock/:id", stockController.updateProduct);

// Ruta para obtener todos los productos
router.get("/stock", stockController.getAllProducts);

// Ruta para eliminar un producto
router.delete("/eliminar-stock/:id", stockController.deleteProduct);

export default router;
