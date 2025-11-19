import prisma from "../../../../lib/prisma";
import bcrypt from 'bcryptjs';


export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email y contraseña son requeridos' });
    }

    try {
      // Buscar usuario e incluir direcciones
      const user = await prisma.usuarios.findUnique({
        where: { email },
        include: { direcciones: true },
      });

      if (!user) {
        return res.status(401).json({ error: 'Usuario no encontrado' });
      }

      // Verificar contraseña
      const validPassword = await bcrypt.compare(password, user.hash_pwd);

      if (!validPassword) {
        return res.status(401).json({ error: 'Contraseña incorrecta' });
      }

      // Tomar primera dirección (si existe)
      const direccion = user.direcciones.length > 0 ? user.direcciones[0] : null;

      // Respuesta
      res.status(200).json({
        id: user.id,
        email: user.email,
        nombre: user.nombre,
        apellido: user.apellido,
        rut: user.rut,
        telefono: user.telefono,
        direccion: direccion
          ? {
              region: direccion.region,
              comuna: direccion.comuna,
              calle: direccion.calle,
              numero: direccion.numero,
            }
          : null,
        mensaje: 'Inicio de sesión exitoso',
      });

    } catch (error) {
      console.error('Error en login:', error);
      res.status(500).json({ error: 'Error al iniciar sesión' });
    }
  } else {
    res.status(405).json({ error: 'Método no permitido' });
  }
}

