import { PrismaClient } from '../../../prisma/src/generated/prisma';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    // Obtenemos todas las regiones con sus comunas
    const regiones = await prisma.regiones.findMany({
      include: {
        comunas: true,
      },
      orderBy: { nombre: 'asc' },
    });

    // Verificamos que haya datos
    if (!regiones || regiones.length === 0) {
      return res.status(404).json({ error: 'No se encontraron regiones' });
    }

    res.status(200).json(regiones);
  } catch (error) {
    console.error("Error al obtener regiones y comunas:", error);
    res.status(500).json({ error: 'No se pudieron obtener regiones y comunas' });
  }
}
