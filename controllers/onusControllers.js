import { Op } from "sequelize";
import ONU from "../models/onuModel.js";

const onuControllers = {
  createOnu: async (req, res) => {
    try {
      const { name, gpon, admin, estado, descripcion_estado } = req.body;

      // Verificar si ya existe una ONU con el mismo nombre o gpon
      const existingOnu = await ONU.findOne({
        where: {
          [Op.or]: [{ gpon }, { name }],
        },
      });

      if (existingOnu) {
        return res.status(400).json({
          error: "Ya existe una ONU registrada con este nombre o GPON.",
        });
      }

      // Crear la nueva ONU si no existe duplicado
      const newOnu = await ONU.create({
        name,
        gpon,
        admin,
        estado,
        descripcion_estado,
      });

      res.status(201).json({ message: "ONU registrada con éxito", newOnu });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error al crear la ONU" });
    }
  },
};

export default onuControllers;
