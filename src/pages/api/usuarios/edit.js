import prisma from "../../../../lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "PUT") {
    res.setHeader("Allow", ["PUT"]);
    res.status(405).json({ error: `Método ${req.method} no permitido` });
    return; // ← evita que Next.js detecte retorno indebido
  }

  const { id, nombre, apellido, email, telefono, rut } = req.body;

  if (!id) {
    res.status(400).json({ error: "ID es obligatorio" });
    return;
  }

  try {
    const updated = await prisma.usuarios.update({
      where: { id },
      data: {
        nombre,
        apellido,
        email,
        telefono,
        rut,
      },
    });

    res.status(200).json(updated);
    return;

  } catch (err) {
    console.error("Error al actualizar usuario:", err);
    res.status(500).json({ error: "Error al actualizar usuario" });
    return;
  }
}
