import prisma from "../../../../lib/prisma";

export default async function handler(req, res) {
  if (req.method !== 'PUT') {
    res.setHeader('Allow', ['PUT']);
    return res.status(405).end(`Método ${req.method} no permitido`);
  }

  const { id, nombre, apellido, email, telefono, rut } = req.body;

  if (!id || !email) {
    return res.status(400).json({ error: "ID y email son obligatorios" });
  }

  try {
    const updated = await prisma.usuarios.update({
      where: { id },
      data: {
        nombre,
        apellido,
        email,
        telefono,
        rut
      }
    });

    return res.status(200).json(updated);

  } catch (err) {
    console.error("Error al actualizar usuario:", err);
    return res.status(500).json({ error: "Error al actualizar usuario" });
  }
}
