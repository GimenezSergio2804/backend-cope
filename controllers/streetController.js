import Street from "../models/streetModel.js";

const streetControllers = {
  createStreet: async (req, res) => {
    try {
      const { name } = req.body;
      const newName = name.toUpperCase();
      const newStreet = await Street.create({ name: newName });
      res
        .status(201)
        .json({ message: " Calle registrada con Exito", newStreet });
    } catch (err) {
      res.status(500).json({ error: "Error al crear la Calle", err });
    }
  },

  getAllStreets: async (req, res) => {
    try {
      const streets = await Street.findAll();
      res.status(200).json(streets);
    } catch (err) {
      res.status(500).json({ error: "Error al obtener las calles", err });
    }
  },

  updateStreet: async (req, res) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const newName = name.toUpperCase();
      const street = await Street.findByPk(id);
      console.log(id);
      if (!street) {
        return res.status(404).json({ error: "Calle no encontrada" });
      }
      street.name = newName;
      await street.save();
      res.status(200).json(street);
    } catch (err) {
      res.status(500).json({ error: "Error al actualizar calle", err });
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const street = await Street.findByPk(id);
      if (!street) {
        return res.status(404).json({ error: "Calle no encontrada" });
      }
      await street.destroy();
      res.status(200).json({ message: "Calle eliminada correctamente" });
    } catch (err) {
      res.status(500).json({ error: "Error al eliminar la calle", err });
    }
  },
};

export default streetControllers;
