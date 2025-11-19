import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  try {
    const regiones = await prisma.regiones.findMany({
      include: { comunas: true },
      orderBy: { nombre: "asc" },
    });

    res.status(200).json(regiones);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener regiones" });
  }
}
