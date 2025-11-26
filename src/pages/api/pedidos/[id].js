import prisma from "../../../../lib/prisma";

export default async function handler(req, res) {
  const { id_pedido } = req.query;

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const pedido = await prisma.pedidos.findUnique({
      where: { id: id_pedido },

      include: {
        usuarios: {
          select: {
            nombre: true,
            apellido: true,
            email: true,
          },
        },
        pedido_items: {
          include: {
            productos: {
              select: {
                titulo: true,
                sku: true,
              },
            },
          },
        },
      },
    });

    if (!pedido) {
      return res.status(404).json({ error: "Pedido no encontrado" });
    }

    // === FORMATEAMOS RESPUESTA USANDO LOS CAMPOS DE LA BD ===
    const respuesta = {
      ...pedido,
      subtotal: Number(pedido.subtotal) || 0,
      iva: Number(pedido.iva) || 0,
      descuento: Number(pedido.descuento_total) || 0,
      despacho: Number(pedido.costo_envio) || 0,
      total_final: Number(pedido.total_final) || 0,
      cupon_codigo: pedido.cupon_codigo || null,
    };

    res.status(200).json(respuesta);

  } catch (error) {
    console.error("❌ Error cargando pedido:", error);
    res.status(500).json({ error: "Error cargando pedido" });
  }
}
