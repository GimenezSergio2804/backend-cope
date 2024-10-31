import { Op } from "sequelize";
import ONU from "../models/onuModel.js";

const onuControllers = {
  getAllOnus: async (req, res) => {
    try {
      const onus = await ONU.findAll();
      res.status(200).json(onus);
    } catch (error) {
      console.log(err);
      res.status(500).json({ error: "Error al obtener las ONU´s" });
    }
  },

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

  updateOnu: async (req, res) => {
    try {
      const { id } = req.params; // obtenemos el id por url
      const { name, gpon, admin, estado, descripcion_estado } = req.body;

      // buscamos por id la onu
      const onu = await ONU.findByPk(id);
      if (!onu) {
        return res.status(404).json({ error: "Onu No Encontrada" });
      }

      // Verificar si ya hay una onu con el numero que queremos cargar
      const existingOnu = await ONU.findOne({
        where: {
          [Op.or]: [{ gpon: gpon }, { name: name }],
          id: { [Op.ne]: id }, // nos asegura q no es la misma onu q vamos a cargar o estamos utilizando
        },
      });

      if (existingOnu) {
        return res.status(400).json({
          error: "Ya existe una ONU registrada con este nombre o GPON",
        });
      }

      // se actualiza la onu
      onu.name = name;
      onu.gpon = gpon;
      onu.admin = admin;
      onu.estado = estado;
      onu.descripcion_estado = descripcion_estado;

      // guardo cambios
      await onu.save();
      res.status(200).json({ message: "ONU actualizada con exito", onu });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Error al actualizar ONU" });
    }
  },

  deleteOnu: async (req, res) => {
    try {
      const { id } = req.params;

      // buscar la ONU por ID
      const onu = await ONU.findByPk(id);
      if (!onu) {
        return res.status(404).json({ error: "ONU no encontrada" });
      }

      // eliminar la onu
      await onu.destroy();

      res.status(200).json({ message: "ONU eliminada con exito" });
    } catch (error) {
      console.error(err);
      res.status(500).json({ error: "Error al eliminar la ONU" });
    }
  },
};

export default onuControllers;
