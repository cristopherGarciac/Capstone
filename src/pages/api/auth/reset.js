import bcrypt from "bcryptjs";
import prisma from "../../../../lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Método no permitido" });

  const { token, password } = req.body;

  // Buscar usuario por token válido
  const user = await prisma.usuarios.findFirst({
    where: {
      resetToken: token,
      resetTokenExpiry: { gte: new Date() },
    },
  });

  if (!user) {
    return res.status(400).json({ error: "Token inválido o expirado" });
  }

  // Encriptar nueva contraseña
  const hashed = await bcrypt.hash(password, 10);

  // Actualizar contraseña
  await prisma.usuarios.update({
    where: { id: user.id },
    data: {
      hash_pwd: hashed, // ← CAMPO CORRECTO
      resetToken: null,
      resetTokenExpiry: null,
    },
  });

  return res.status(200).json({ message: "Contraseña actualizada correctamente" });
}
