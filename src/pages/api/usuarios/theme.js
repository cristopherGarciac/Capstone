import prisma from "../../../../lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "PUT") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const { id, theme } = req.body;

  if (!id || !theme) {
    return res.status(400).json({ error: "Datos incompletos" });
  }

  try {
    const updated = await prisma.usuarios.update({
      where: { id },
      data: { themecuenta: theme },
      select: { id: true, themecuenta: true },
    });

    return res.status(200).json(updated);

  } catch (err) {
    console.error("Error al guardar tema:", err);
    return res.status(500).json({ error: "Error interno" });
  }
}
