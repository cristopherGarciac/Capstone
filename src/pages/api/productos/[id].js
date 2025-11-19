// src/pages/api/productos/[id].js
import prisma from "../../../../lib/prisma";

// Cliente Prisma (lazy, para evitar múltiples conexiones en dev)
let prisma;
function getPrisma() {
  if (!prisma) prisma = new PrismaClient();
  return prisma;
}

// Convierte Prisma.Decimal a number, profundo
function deepTransform(row) {
  if (row instanceof Prisma.Decimal) return row.toNumber();
  if (Array.isArray(row)) return row.map(deepTransform);
  if (row && typeof row === 'object') {
    const o = {};
    for (const k in row) o[k] = deepTransform(row[k]);
    return o;
  }
  return row;
}

// Normaliza precios tipo "12.345,67" => 12345.67
function normPrecio(v) {
  if (typeof v === 'number') return v;
  if (typeof v !== 'string') return Number(v || 0);
  const s = v.replace(/\./g, '').replace(',', '.').trim();
  return Number(s);
}

export default async function handler(req, res) {
  const { id } = req.query; // UUID
  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'ID inválido o faltante' });
  }

  const db = getPrisma();

  try {
    if (req.method === 'GET') {
      const prod = await db.productos.findUnique({ where: { id } });
      if (!prod) return res.status(404).json({ error: 'No encontrado' });
      return res.status(200).json(deepTransform(prod));
    }

    if (req.method === 'PUT') {
      const body = req.body || {};
      const data = {};

      if ('sku' in body) data.sku = String(body.sku || '');
      if ('titulo' in body) data.titulo = String(body.titulo || '');
      if ('descripcion' in body) data.descripcion = String(body.descripcion || '');
      if ('categoria' in body) data.categoria = String(body.categoria || '');
      if ('destacado' in body) data.destacado = Boolean(body.destacado);

      if ('imagenes' in body) {
        data.imagenes = Array.isArray(body.imagenes)
          ? body.imagenes.map(String)
          : body.imagenes
          ? [String(body.imagenes)]
          : [];
      }

      if ('precio' in body) {
        const n = normPrecio(body.precio);
        if (!Number.isFinite(n)) {
          return res.status(400).json({ error: 'precio debe ser numérico' });
        }
        data.precio = new Prisma.Decimal(n);
      }

      if ('stock' in body) {
        const s = Number(body.stock);
        if (!Number.isFinite(s) || s < 0) {
          return res.status(400).json({ error: 'stock inválido' });
        }
        data.stock = s;
      }

      // Si cambian el SKU, valida colisión
      if (data.sku) {
        const colision = await db.productos.findUnique({ where: { sku: data.sku } });
        if (colision && colision.id !== id) {
          return res.status(409).json({ error: 'SKU ya existe en otro producto' });
        }
      }

      const updated = await db.productos.update({ where: { id }, data });
      return res.status(200).json(deepTransform(updated));
    }

    if (req.method === 'DELETE') {
      await db.productos.delete({ where: { id } });
      return res.status(204).end();
    }

    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    return res.status(405).json({ error: 'Método no permitido' });
  } catch (err) {
    console.error('[/api/productos/[id]] error:', err);
    if (err?.code === 'P2025') return res.status(404).json({ error: 'No encontrado' });
    if (err?.code === 'P2002') return res.status(409).json({ error: 'SKU_DUPLICADO', details: err?.meta });
    return res.status(500).json({ error: 'Error del servidor' });
  }
}