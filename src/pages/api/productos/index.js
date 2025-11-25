import prisma from "../../../../lib/prisma";
import { Prisma } from "@prisma/client";

// Convierte Prisma.Decimal recursivamente
function decimalToNumber(row) {
  if (row && typeof row === "object" && typeof row.toNumber === "function") {
    return row.toNumber();
  }

  if (Array.isArray(row)) {
    return row.map(decimalToNumber);
  }

  if (row && typeof row === "object") {
    const out = {};
    for (const k in row) out[k] = decimalToNumber(row[k]);
    return out;
  }

  return row;
}

// Normaliza precios "12.345,67"
function normPrecio(v) {
  if (typeof v === "number") return v;
  if (typeof v !== "string") return Number(v || 0);
  return Number(v.replace(/\./g, "").replace(",", "."));
}

export default async function handler(req, res) {
  try {
    // ==========================
    // GET — Listado + paginación
    // ==========================
    if (req.method === "GET") {
      const skip = Number(req.query.skip ?? 0);
      const take = Number(req.query.take ?? 20);

      // Ordenar por ID descendente para ver los nuevos primero
      const [items, total] = await Promise.all([
        prisma.productos.findMany({
          skip,
          take,
          orderBy: { id: "desc" }, 
        }),
        prisma.productos.count(),
      ]);

      return res.status(200).json({
        items: items.map(decimalToNumber),
        total,
      });
    }

    // ==========================
    // POST — Crear producto
    // ==========================
    if (req.method === "POST") {
      const body = req.body;

      if (!body.sku || !body.titulo || body.precio == null) {
        return res.status(400).json({
          error: "sku, titulo y precio son obligatorios",
        });
      }

      const precioNormalizado = normPrecio(body.precio);
      if (!Number.isFinite(precioNormalizado)) {
        return res.status(400).json({
          error: "precio debe ser numérico",
        });
      }

      const created = await prisma.productos.create({
        data: {
          sku: body.sku,
          titulo: body.titulo,
          descripcion: body.descripcion || "",
          // CORRECCIÓN: Asignar el número directo. Prisma maneja la conversión a Decimal.
          precio: precioNormalizado,
          stock: Number(body.stock ?? 0),
          categoria: body.categoria || "",
          imagenes: Array.isArray(body.imagenes)
            ? body.imagenes.map(String)
            : [],
        },
      });

      return res.status(201).json(decimalToNumber(created));
    }

    // =======================================
    // ERROR — MÉTODO NO PERMITIDO
    // =======================================
    res.setHeader("Allow", ["GET", "POST"]);
    return res.status(405).json({ error: "Método no permitido" });
  } catch (err) {
    console.error("[/api/productos/index] Error:", err);

    if (err?.code === "P2002") {
      return res.status(409).json({
        error: "SKU_DUPLICADO",
        details: err?.meta,
      });
    }

    return res.status(500).json({ error: "Error del servidor" });
  }
}
