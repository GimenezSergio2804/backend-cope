import User from "../models/userModel.js";
// libreria para hashear password
import bcrypt from "bcryptjs";
// libreria para generar token para autentificacion
import jwt from "jsonwebtoken";
import db from "../config/db.js";

const userControllers = {
  // registrar un usuario en la base de datos
  register: async (req, res) => {
    // tomamos los datos que vienen por el body
    const { name, email, password } = req.body;
    try {
      // vamos a verificar si el usuario existe
      const existingUser = await User.findByEmail(email);
      if (existingUser) {
        return res.status(409).json({ message: "El usuario ya existe" });
      }

      // encrytamos la contraseña
      const hash = await bcrypt.hash(password, 10);

      // Crear el usuario con la contraseña hasheada
      const newUser = await User.create({
        name,
        email,
        password: hash,
      });

      return res
        .status(201)
        .json({ message: "Usuario registrado exitosamente", user: newUser });
    } catch (err) {
      console.error("Error al registrar el usuario:", err); // Muestra el error en la consola
      return res
        .status(500)
        .json({ error: "Error al registrar el usuario", err });
    }
  },

  // login
  login: async (req, res) => {
    // Tomamos los datos del body
    const { email, password } = req.body;

    try {
      // Buscamos el usuario en la base de datos
      const user = await User.findByEmail(email);
      // Verificamos si el usuario existe
      if (!user) {
        return res.status(401).json({ error: "Usuario no encontrado" });
      }

      // Comparamos la contraseña con la que esta en la base de datos
      const isMatch = await bcrypt.compare(password, user.password);

      // si la contraseña es incorrecta
      if (!isMatch) {
        return res.status(401).json({ error: "Contraseña Incorrecta" });
      }

      // generamos un token y le damos un tiempo determinado para estar dentro del sistema
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.status(200).json({ message: "Login exitoso", token });
    } catch (err) {
      // Manejo de errores
      console.error(err);
      res.status(500).json({ error: "Error al procesar la solicitud" });
    }
  },
};

export default userControllers;
