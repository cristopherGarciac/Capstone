import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const { productos } = req.body;

    if (!productos || !Array.isArray(productos)) {
      return res.status(400).json({ error: "Listado de productos inválido" });
    }

    for (const item of productos) {
      const { id, qty } = item;

      // Buscar el producto
      const producto = await prisma.productos.findUnique({ where: { id } });

      if (!producto) {
        return res.status(404).json({ error: `Producto no encontrado: ${id}` });
      }

      if (producto.stock < qty) {
        return res.status(400).json({
          error: `Stock insuficiente para ${producto.titulo}. Stock actual: ${producto.stock}`,
        });
      }

      // Descontar stock
      await prisma.productos.update({
        where: { id },
        data: { stock: producto.stock - qty },
      });
    }

    return res.status(200).json({ success: true, message: "Stock actualizado correctamente" });

  } catch (err) {
    console.error("❌ Error al actualizar stock:", err);
    return res.status(500).json({ error: "Error del servidor" });
  }
}
