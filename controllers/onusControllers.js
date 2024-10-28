import ONU from "../models/onuModel.js";

const onuControllers = {
  createOnu: async (req, res) => {
    try {
      const { name, gpon, admin, estado, descripcion_estado } = req.body;
      const newOnu = await ONU.create({
        name,
        gpon,
        admin,
        estado,
        descripcion_estado,
      });
      res
        .status(201)
        .json({ message: "ONU creada exitosamente", data: newOnu });
    } catch (err) {
      res.status(500).json({ error: "Error al crear la ONU", err });
    }
  },
};

export default onuControllers;
