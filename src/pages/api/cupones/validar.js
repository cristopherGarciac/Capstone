import { PrismaClient, Prisma } from '../../../../prisma/src/generated/prisma';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const { codigo } = req.body;

    const cupon = await prisma.cupones.findFirst({
      where: {
        codigo: codigo.toUpperCase(),
        activo: true,
        expiracion: { gte: new Date() },
      },
    });

    if (!cupon) {
      return res.status(404).json({ valido: false, error: "Cupón no válido" });
    }

    return res.status(200).json({ valido: true, cupon });
  } catch (error) {
    console.error("Error validando cupón", error);
    return res.status(500).json({ error: "Error validando cupón" });
  }
}
