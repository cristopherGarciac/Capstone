import prisma from "../../../../lib/prisma";


export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const cupones = await prisma.cupones.findMany({
        orderBy: { creado_en: "desc" }
      })

      res.status(200).json(cupones)
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: "Error obteniendo cupones" })
    }
  }

  if (req.method === "POST") {
    try {
      const { codigo, descuento, expiracion } = req.body;

      const cupon = await prisma.cupones.create({
        data: {
          codigo: codigo.toUpperCase(),
          descuento: parseInt(descuento),
          expiracion: expiracion ? new Date(expiracion) : null,
        },
      });

      res.status(200).json(cupon);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error creando cupón" });
    }
  }
}
