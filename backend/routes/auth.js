const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');  // Asegúrate de que el modelo User esté correctamente importado
const router = express.Router();
const dotenv = require("dotenv")

dotenv.config()

// Registro de usuario
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'El correo electrónico ya está registrado' });
    }

    // Crear el nuevo usuario
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    // Crear un token JWT
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    res.status(201).json({ message: 'Usuario registrado con éxito', token });
  } catch (error) {
    console.error(error); // Ver en la consola del servidor
    res.status(500).json({ message: 'Hubo un error al registrar el usuario' });
  }
});

// Login de usuario
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email,password);
    
    // Buscar al usuario por el correo electrónico
    const user = await User.findOne({email:email });
    console.log(user);
    
    if (!user) {
      return res.status(400).json({ message: 'Correo electrónico no encontrado' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch);
    
    if (!isMatch) {
      return res.status(400).json({ message: 'Contraseña incorrecta' });
    }

    // Crear un token JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ message: 'Login exitoso', token });
  } catch (error) {
    console.error(error); // Ver en la consola del servidor
    res.status(500).json({ message: 'Hubo un error al iniciar sesión' });
  }
});

module.exports = router;
