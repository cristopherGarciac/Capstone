import prisma from "../../../../lib/prisma";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { id, nombre, apellido, email, telefono } = req.body;

    if (!id || !email) {
      return res.status(400).json({ error: 'ID y email son obligatorios' });
    }

    try {
      const updated = await prisma.usuarios.update({
        where: { id },
        data: { nombre, apellido, email, telefono }
      });
      res.status(200).json(updated);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al actualizar usuario' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Método ${req.method} no permitido`);
  }
}