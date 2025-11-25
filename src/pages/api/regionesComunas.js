import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  try {
    const regiones = await prisma.regiones.findMany({
      orderBy: { nombre: "asc" },
    });

    const comunas = await prisma.comunas.findMany();

    // unir manualmente
    const resultado = regiones.map(r => ({
      ...r,
      comunas: comunas.filter(c => c.region_id === r.id)
    }));

    res.status(200).json(resultado);

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error al obtener regiones" });
  }
}
