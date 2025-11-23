// /api/usuarios/foto.js

import prisma from "../../../../lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "PUT") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const { id, foto } = req.body;

  if (!id || !foto) {
    return res.status(400).json({ error: "ID o foto faltante" });
  }

  try {
    const updated = await prisma.usuarios.update({
      where: { id },
      data: { fotoperfil: foto }, // <- CAMPO CORRECTO
      select: { id: true, fotoperfil: true }
    });

    return res.status(200).json(updated);

  } catch (err) {
    console.log("Error al guardar foto:", err);
    return res.status(500).json({ error: "Error interno" });
  }
}
