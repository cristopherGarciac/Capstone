import prisma from "../../../../lib/prisma";

export default async function handler(req, res) {
  // Solo DELETE
  if (req.method !== "DELETE") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const { codigo } = req.query;

    if (!codigo) {
      return res.status(400).json({ error: "Código requerido" });
    }

    const actualizado = await prisma.cupones.update({
      where: { codigo },
      data: { activo: false },
    });

    return res.status(200).json(actualizado);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error eliminando cupón" });
  }
}
