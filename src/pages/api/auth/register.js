import { PrismaClient } from '../../../../prisma/src/generated/prisma'; 
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { nombre, apellido, rut, email, telefono, password, region, comuna, calle, numero } = req.body;

    // Validar datos obligatorios
    if (!email || !password || !nombre || !apellido || !rut) {
      return res.status(400).json({
        error: 'Faltan datos requeridos: Email, Contraseña, Nombre, Apellido y RUT son obligatorios',
      });
    }

    try {
      // 1. Verificar si ya existe un usuario con ese email
      const existingUser = await prisma.usuarios.findUnique({
        where: { email },
      });

      if (existingUser) {
        return res.status(400).json({ error: 'El email ya está registrado' });
      }

      // 2. Hashear contraseña
      const hashedPassword = await bcrypt.hash(password, 10);

      // 3. Crear usuario con dirección asociada
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
              region,
              comuna,
              calle,
              numero,
            },
          },
        },
        include: {
          direcciones: true, 
        },
      });

      // 4. Preparar respuesta (direcciones es un array)
      const direccion = user.direcciones.length > 0 ? user.direcciones[0] : null;

      res.status(201).json({
        id: user.id,
        email: user.email,
        nombre: user.nombre,
        apellido: user.apellido,
        telefono: user.telefono,
        direccion: direccion
          ? {
              region: direccion.region,
              comuna: direccion.comuna,
              calle: direccion.calle,
              numero: direccion.numero,
            }
          : null,
      });
    } catch (error) {
      console.error('Error al crear usuario:', error);
      res.status(500).json({ error: 'Error al crear el usuario' });
    }
  } else {
    res.status(405).json({ error: 'Método no permitido' });
  }
}
