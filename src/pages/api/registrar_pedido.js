import prisma  from '../../../prisma/src/generated/prisma'; 

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const { email, cart, total } = req.body;

    if (!email || !cart || !total) {
      return res.status(400).json({ error: "Faltan datos para registrar el pedido" });
    }

    // Guarda el pedido en la tabla "pedidos"
    const nuevoPedido = await prisma.pedidos.create({
      data: {
        usuarioEmail: email,         // debe existir la columna usuarioEmail o cámbiala por la tuya
        total: Number(total),
        estado: "Procesando",        // estado inicial
        productos: JSON.stringify(cart),
        fecha: new Date(),
      },
    });

    res.status(200).json({ success: true, pedido: nuevoPedido });
  } catch (error) {
    console.error("❌ Error registrando pedido:", error);
    res.status(500).json({ error: "Error al registrar el pedido" });
  }
}
