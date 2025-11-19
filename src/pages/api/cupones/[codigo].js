import { PrismaClient, Prisma } from '../../../../prisma/src/generated/prisma';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { codigo } = req.query;

      if (!codigo) {
        return res.status(400).json({ error: "Código requerido" });
      }

      const cupon = await prisma.cupones.findFirst({
        where: {
          codigo: codigo.toUpperCase(),
          activo: true,
          expiracion: { gte: new Date() }
        }
      });

      if (!cupon) {
        return res.status(404).json({ error: "Cupón inválido o expirado" });
      }

      res.status(200).json(cupon);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error buscando el cupón" });
    }
  }
}
