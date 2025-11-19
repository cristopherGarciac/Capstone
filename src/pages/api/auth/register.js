import prisma from "../../../../lib/prisma";
import bcrypt from 'bcryptjs';
import nodemailer from "nodemailer";
// -------------------------------
// ⭐ FUNCION PARA GEOCODIFICAR
// -------------------------------
async function getCoords(region, comuna, calle, numero) {
  const address = `${calle} ${numero}, ${comuna}, ${region}, Chile`;
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (!data || data.length === 0) {
      console.warn("No se encontraron coordenadas para:", address);
      return { lat: null, lng: null };
    }

    return {
      lat: parseFloat(data[0].lat),
      lng: parseFloat(data[0].lon)
    };
  } catch (err) {
    console.error("Error geocoding:", err);
    return { lat: null, lng: null };
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { 
    nombre, apellido, rut, email, telefono, password, 
    region_id, comuna_id, calle, numero 
  } = req.body;

  // Campos obligatorios
  if (!email || !password || !nombre || !apellido || !rut) {
    return res.status(400).json({
      error: 'Email, Contraseña, Nombre, Apellido y RUT son obligatorios',
    });
  }

  try {
    // Verificar si el email ya existe
    const existingUser = await prisma.usuarios.findUnique({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ error: 'El email ya está registrado' });
    }

    // Hashear contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // --------------------------------------
    // ⭐ OBTENER NOMBRE DE REGION Y COMUNA
    // --------------------------------------
    const regionObj = await prisma.regiones.findUnique({
      where: { id: Number(region_id) }
    });

    const comunaObj = await prisma.comunas.findUnique({
      where: { id: Number(comuna_id) }
    });

    const regionNombre = regionObj?.nombre || "";
    const comunaNombre = comunaObj?.nombre || "";

    // --------------------------------------
    // ⭐ OBTENER COORDENADAS
    // --------------------------------------
    const { lat, lng } = await getCoords(regionNombre, comunaNombre, calle, numero);

    // --------------------------------------
    // ⭐ CREAR USUARIO + DIRECCIÓN
    // --------------------------------------
    const user = await prisma.usuarios.create({
      data: {
        email,
        nombre,
        apellido,
        rut,
        telefono,
        hash_pwd: hashedPassword,
        direcciones: {
          create: {
            region: regionNombre,
            comuna: comunaNombre,
            calle,
            numero,
            lat,
            lng,
          },
        },
      },
      include: { direcciones: true },
    });

    // Seleccionar la dirección creada
    const direccion = user.direcciones.length ? user.direcciones[0] : null;

    // --------------------------------------
    // 🚀 ENVIAR CORREO
    // --------------------------------------
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "c57521116@gmail.com",
        pass: "zsemaojsmvnvhfoa"
      },
    });

    transporter.sendMail({
      from: '"Blitz Hardware" <c57521116@gmail.com>',
      to: user.email,
      subject: "Registro exitoso - Blitz Hardware",
      text: `Hola ${user.nombre}, tu registro se completó exitosamente.`,
    });

    // --------------------------------------
    // RESPUESTA
    // --------------------------------------
    res.status(201).json({
      id: user.id,
      email: user.email,
      nombre: user.nombre,
      apellido: user.apellido,
      telefono: user.telefono,
      direccion
    });

  } catch (error) {
    console.error('Error al crear usuario:', error);
    res.status(500).json({ error: 'Error al crear el usuario' });
  }
}
