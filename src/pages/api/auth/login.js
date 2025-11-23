import prisma from "../../../../lib/prisma";
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email y contraseña son requeridos' });
  }

  try {
    // Buscar usuario incluyendo direcciones
    const user = await prisma.usuarios.findUnique({
      where: { email },
      include: { direcciones: true },
    });

    if (!user) {
      return res.status(401).json({ error: 'Usuario no encontrado' });
    }

    // Validar contraseña
    const validPassword = await bcrypt.compare(password, user.hash_pwd);
    if (!validPassword) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    // Sacar primera dirección (si existe)
    const direccion = user.direcciones.length > 0 ? user.direcciones[0] : null;

    // RESPUESTA COMPLETA
    return res.status(200).json({
  id: user.id,
  email: user.email,
  nombre: user.nombre,
  apellido: user.apellido,
  rut: user.rut,
  telefono: user.telefono,
  foto: user.fotoperfil || null,      // 👈 AÑADE ESTO
  direccion: direccion ? {
    region: direccion.region,
    comuna: direccion.comuna,
    calle: direccion.calle,
    numero: direccion.numero,
  } : null,
  mensaje: 'Inicio de sesión exitoso',
});


  } catch (error) {
    console.error('Error en login:', error);
    return res.status(500).json({ error: 'Error al iniciar sesión' });
  }
}
