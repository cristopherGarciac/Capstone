import { PrismaClient } from '@prisma/client';

// Usamos la instancia global para evitar múltiples conexiones en desarrollo
const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

export default async function handler(req, res) {
  const { id } = req.query;

  // Validación básica del ID
  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'ID inválido o faltante' });
  }

  // --------------------------------------
  // DELETE: Borrar producto
  // --------------------------------------
  if (req.method === 'DELETE') {
    console.log("🗑️ Intentando borrar producto ID:", id);

    try {
      // 1. Verificar si existe el producto antes de intentar nada
      const productoExiste = await prisma.productos.findUnique({
        where: { id: id },
      });

      if (!productoExiste) {
        console.warn("⚠️ Producto no encontrado para borrar:", id);
        return res.status(404).json({ error: 'El producto no existe' });
      }

      // 2. Ejecutar transacción de borrado
      await prisma.$transaction(async (tx) => {
        // A. Borrar historial de este producto en pedidos (pedido_items)
        // Esto es necesario porque la BD tiene onDelete: NoAction por defecto
        const itemsBorrados = await tx.pedido_items.deleteMany({
          where: { producto_id: id },
        });
        console.log(`   -> Historial limpiado: ${itemsBorrados.count} items eliminados.`);

        // B. Borrar el producto de la tabla productos
        await tx.productos.delete({
          where: { id: id },
        });
        console.log("   -> Producto eliminado correctamente de la tabla maestra.");
      });

      // 3. Responder con éxito (200 OK con JSON explícito es más seguro para depurar que 204)
      return res.status(200).json({ message: 'Producto eliminado correctamente' });

    } catch (error) {
      console.error('❌ Error FATAL al borrar producto:', error);
      // Devolvemos el mensaje técnico para que lo veas en el alert
      return res.status(500).json({ 
        error: 'Error de base de datos al borrar', 
        details: error.message 
      });
    }
  }

  // --------------------------------------
  // PUT: Actualizar producto
  // --------------------------------------
  if (req.method === 'PUT') {
    try {
      const { sku, titulo, descripcion, precio, stock, categoria, imagenes } = req.body;

      const actualizado = await prisma.productos.update({
        where: { id: id },
        data: {
          sku,
          titulo,
          descripcion,
          categoria,
          precio: precio !== undefined ? parseFloat(precio) : undefined,
          stock: stock !== undefined ? parseInt(stock) : undefined,
          imagenes: imagenes || [],
        },
      });

      return res.status(200).json(actualizado);
    } catch (error) {
      console.error('Error actualizando:', error);
      return res.status(500).json({ error: 'No se pudo actualizar', details: error.message });
    }
  }

  // --------------------------------------
  // GET: Obtener producto individual
  // --------------------------------------
  if (req.method === 'GET') {
    try {
      const producto = await prisma.productos.findUnique({
        where: { id: id },
      });
      if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });
      return res.status(200).json(producto);
    } catch (error) {
      return res.status(500).json({ error: 'Error al leer producto' });
    }
  }

  return res.status(405).json({ error: 'Método no permitido' });
}
