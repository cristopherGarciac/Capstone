// /pages/api/productos/index.js
import { PrismaClient, Prisma } from '../../../../prisma/src/generated/prisma';
const prisma = new PrismaClient();

function decimalToNumber(row) {
  if (row instanceof Prisma.Decimal) return row.toNumber();
  if (Array.isArray(row)) return row.map(decimalToNumber);
  if (row && typeof row === 'object') {
    const out = {};
    for (const k in row) out[k] = decimalToNumber(row[k]);
    return out;
  }
  return row;
}

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const skip = Number(req.query.skip ?? 0);
      const take = Number(req.query.take ?? 20);

      const [items, total] = await Promise.all([
        prisma.productos.findMany({
          skip,
          take,
          orderBy: { id: 'desc' }, // ajusta si tienes "creado_en"
        }),
        prisma.productos.count(),
      ]);

      return res
        .status(200)
        .json({ items: items.map(decimalToNumber), total });
    }

    if (req.method === 'POST') {
      const { sku, titulo, descripcion, precio, stock = 0, categoria, imagenes = [] } = req.body;

      if (!sku || !titulo || precio == null) {
        return res.status(400).json({ error: 'sku, titulo y precio son obligatorios' });
      }

      const created = await prisma.productos.create({
        data: {
          sku,
          titulo,
          descripcion,
          precio: new Prisma.Decimal(precio),
          stock: Number(stock),
          categoria,
          imagenes,
        },
      });

      return res.status(201).json(decimalToNumber(created));
    }

    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).json({ error: 'MÃ©todo no permitido' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error del servidor' });
  }
}