import { PrismaClient } from '@prisma/client';

const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: 'Falta el ID del pedido' });
  }

  try {
    // Usamos una transacción para borrar todo en orden y evitar errores de llaves foráneas
    await prisma.$transaction([
      // 1. Borrar los items del pedido
      prisma.pedido_items.deleteMany({
        where: { pedido_id: id },
      }),
      // 2. Borrar pagos asociados (si existen en tu schema)
      prisma.pagos.deleteMany({
        where: { pedido_id: id },
      }),
      // 3. Finalmente, borrar el pedido
      prisma.pedidos.delete({
        where: { id: id },
      }),
    ]);

    res.status(200).json({ message: 'Pedido eliminado correctamente' });
  } catch (error) {
    console.error('Error eliminando pedido:', error);
    res.status(500).json({ error: 'No se pudo eliminar el pedido', details: error.message });
  }
}