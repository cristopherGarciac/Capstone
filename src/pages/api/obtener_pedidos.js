import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  const { codigo, email } = req.query;

  try {
    if (!codigo && !email) {
      return res.status(400).json({ error: "Se requiere código o email" });
    }

    const pedidos = await prisma.pedidos.findMany({
      where: {
        OR: [
          codigo ? { id: codigo } : undefined, // si buscas por código
          email
            ? { usuarios: { email: email } } // si buscas por usuario logueado
            : undefined,
        ].filter(Boolean),
      },
      include: {
        pedido_items: {
          include: {
            productos: true,
          },
        },
        direcciones: true,
      },
      orderBy: { fecha: "desc" },
    });

    // Generar trackingNumber si no existe (puedes guardarlo en la BD si quieres)
    const pedidosConTracking = pedidos.map((p) => ({
      ...p,
      trackingNumber: p.id.slice(0, 8).toUpperCase(), // ejemplo simple: primeros 8 chars del UUID
    }));

    res.status(200).json({ pedidos: pedidosConTracking });
  } catch (error) {
    console.error("Error obteniendo pedidos:", error);
    res.status(500).json({ error: "Error obteniendo pedidos" });
  }
}
