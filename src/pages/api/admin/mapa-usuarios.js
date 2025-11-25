import prisma from "../../../../lib/prisma";


export default async function handler(req, res) {
  try {
    const direcciones = await prisma.direcciones.findMany({
      where: {
        lat: {
          not: null
        },
        lng: {
          not: null
        }
      },
      include: {
        usuario: true
      }
    });

    return res.status(200).json({
      ok: true,
      data: direcciones
    });

  } catch (error) {
    console.error("Error en mapa-usuarios:", error);
    return res.status(500).json({
      ok: false,
      error: "Error interno del servidor"
    });
  }
}
