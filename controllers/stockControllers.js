import Stock from "../models/stockModel.js";

const stockControllers = {
  createProduct: async (req, res) => {
    try {
      const { nombre, cantidad } = req.body;

      const newProduct = await Stock.create({
        nombre: nombre.toUpperCase(),
        cantidad,
      });

      res
        .status(201)
        .json({ message: "Producto añadido al stock", newProduct });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error al agregar el producto al stock" });
    }
  },

  // Método para actualizar la cantidad de un producto en stock
  updateProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const { cantidad } = req.body;

      const product = await Stock.findByPk(id);
      if (!product)
        return res.status(404).json({ error: "Producto no encontrado" });

      product.cantidad = cantidad;
      await product.save();

      res.status(200).json({ message: "Cantidad actualizada", product });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error al actualizar el producto" });
    }
  },

  // Método para obtener todos los productos en stock
  getAllProducts: async (req, res) => {
    try {
      const products = await Stock.findAll();
      res.status(200).json(products);
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "Error al obtener los productos del stock" });
    }
  },

  // Método para eliminar un producto del stock
  deleteProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Stock.findByPk(id);

      if (!product)
        return res.status(404).json({ error: "Producto no encontrado" });

      await product.destroy();
      res.status(200).json({ message: "Producto eliminado del stock" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error al eliminar el producto" });
    }
  },
};

export default stockControllers;
