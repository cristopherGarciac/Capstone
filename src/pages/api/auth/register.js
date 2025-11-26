import prisma from "../../../../lib/prisma";
import bcrypt from 'bcryptjs';
import nodemailer from "nodemailer";

// -------------------------------  
// ⭐ FUNCION PARA GEOCODIFICAR (CORREGIDA)
// -------------------------------
async function getCoords(region, comuna, calle, numero) {
  // Construimos una dirección limpia para la búsqueda
  const address = `${calle} ${numero}, ${comuna}, ${region}, Chile`;
  
  // Usamos 'q' para búsqueda libre y limitamos a 1 resultado
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`;

  console.log("📍 Buscando coordenadas para:", address); // Log para depurar

  try {
    const res = await fetch(url, {
      headers: {
        // 🛑 CRÍTICO: Nominatim REQUIERE un User-Agent válido o bloquea la petición
        'User-Agent': 'BlitzHardware-Capstone/1.0 (contacto@blitzhardware.cl)' 
      }
    });

    if (!res.ok) {
        console.error("❌ Error respuesta Nominatim:", res.status, res.statusText);
        return { lat: null, lng: null };
    }

    const data = await res.json();

    if (!data || data.length === 0) {
      console.warn("⚠️ No se encontraron coordenadas. Verifica que la dirección exista en OSM.");
      return { lat: null, lng: null };
    }

    const lat = parseFloat(data[0].lat);
    const lng = parseFloat(data[0].lon); // Nominatim devuelve 'lon', pero tu BD usa 'lng'

    console.log("✅ Coordenadas encontradas:", lat, lng);
    
    return { lat, lng };

  } catch (err) {
    console.error("❌ Error fatal en geocoding:", err);
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
    let regionNombre = "";
    let comunaNombre = "";

    if (region_id) {
        const regionObj = await prisma.regiones.findUnique({
            where: { id: Number(region_id) }
        });
        if (regionObj) regionNombre = regionObj.nombre;
    }

    if (comuna_id) {
        const comunaObj = await prisma.comunas.findUnique({
            where: { id: Number(comuna_id) }
        });
        if (comunaObj) comunaNombre = comunaObj.nombre;
    }

    // --------------------------------------
    // ⭐ OBTENER COORDENADAS (CON LA FUNCIÓN CORREGIDA)
    // --------------------------------------
    // Solo buscamos si tenemos datos de dirección mínimos
    let coords = { lat: null, lng: null };
    if (calle && comunaNombre) {
        coords = await getCoords(regionNombre, comunaNombre, calle, numero);
    }

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
            calle: calle || "",
            numero: numero || "",
            lat: coords.lat, // Aquí se guardará el float o null
            lng: coords.lng, // Aquí se guardará el float o null
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
    try {
        const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "c57521116@gmail.com",
            pass: "zsemaojsmvnvhfoa"
        },
        });

        await transporter.sendMail({
        from: '"Blitz Hardware" <c57521116@gmail.com>',
        to: user.email,
        subject: "Registro exitoso - Blitz Hardware",
        text: `Hola ${user.nombre}, bienvenido a Blitz Hardware. Tu registro se completó exitosamente.`,
        });
    } catch (emailError) {
        console.error("Error enviando correo (pero el usuario se creó):", emailError);
    }

    // --------------------------------------
    // RESPUESTA
    // --------------------------------------
    res.status(201).json({
      id: user.id,
      email: user.email,
      nombre: user.nombre,
      apellido: user.apellido,
      telefono: user.telefono,
      rol: "cliente", // Enviamos un rol por defecto al front para que se actualice el contexto
      direccion
    });

  } catch (error) {
    console.error('Error al crear usuario:', error);
    res.status(500).json({ error: 'Error interno al crear el usuario', details: error.message });
  }
}
