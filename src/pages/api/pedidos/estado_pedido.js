import { PrismaClient } from '@prisma/client';

const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

export default async function handler(req, res) {
  // Validamos que sea POST (si llega un GET aquí, daría error, pero el frontend enviará POST)
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido. Se espera POST.' });
  }

  const { id, estado } = req.body;

  if (!id || !estado) {
    return res.status(400).json({ error: 'Faltan datos (ID o Estado)' });
  }

  try {
    const pedidoActualizado = await prisma.pedidos.update({
      where: { id: id },
      data: { estado: estado },
    });

    res.status(200).json(pedidoActualizado);
  } catch (error) {
    console.error('Error actualizando pedido:', error);
    res.status(500).json({ error: 'Error al actualizar en BD', details: error.message });
  }
}