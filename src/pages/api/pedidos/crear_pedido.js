
import prisma from "../../../../lib/prisma";



export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const {
      usuario_id,
      direccion_envio_id,
      retiro_tienda,
      items,
      subtotal,
      iva,
      descuento_total,
      cupon_codigo,
      costo_envio,
      total_final,
    } = req.body;

    // ---------------------------
    // 1) VALIDACIONES BÁSICAS
    // ---------------------------
    if (!usuario_id) {
      return res.status(400).json({ error: "usuario_id es obligatorio" });
    }

    if (!Array.isArray(items) || items.length === 0) {
      return res
        .status(400)
        .json({ error: "El pedido debe contener al menos un ítem" });
    }

    // Validar cada item
    const itemsLimpios = items.map((it, idx) => {
      if (!it.id) {
        throw new Error(`Item #${idx + 1} no tiene 'id' de producto`);
      }
      if (!it.qty || Number(it.qty) <= 0) {
        throw new Error(`Item #${idx + 1} tiene cantidad inválida`);
      }
      if (it.precio_unit === undefined || it.precio_unit === null) {
        throw new Error(
          `Item #${idx + 1} no tiene 'precio_unit' (es obligatorio)`
        );
      }

      return {
        producto_id: it.id,
        cantidad: Number(it.qty),
        // Prisma se encarga de convertir el number a Decimal
        precio_unit: Number(it.precio_unit),
      };
    });

    // ---------------------------
    // 2) GENERAR TRACKING Y FECHA
    // ---------------------------
    const trackingnumber = `TRK-${Math.floor(
      100000 + Math.random() * 900000
    )}`;

    const fecha = new Date(); // fecha actual del servidor

    // ---------------------------
    // 3) CREAR PEDIDO + ITEMS
    // ---------------------------
    const pedido = await prisma.pedidos.create({
      data: {
        usuario_id,
        direccion_envio_id: direccion_envio_id || null,
Retiro_tienda: retiro_tienda ? "true" : "false",

        trackingnumber,
        subtotal: Number(subtotal) || 0,
        iva: Number(iva) || 0,
        descuento_total: Number(descuento_total) || 0,
        cupon_codigo: cupon_codigo || null,
        costo_envio: Number(costo_envio) || 0,
        total: Number(total_final) || 0,
        fecha,

       pedido_items: {
  create: items.map((it) => ({
    cantidad: it.qty,
    subtotal: it.subtotal,
    precio_unit: it.precio_unit,
    productos: {
      connect: { id: it.id }
    }
  }))
},

      },
      include: {
        pedido_items: true,
      },
    });

    // ---------------------------
    // 4) RESPUESTA OK
    // ---------------------------
    return res.status(201).json({
      ok: true,
      pedido,
    });
  } catch (error) {
    console.error("❌ Error en /api/pedidos/crear:", error);

    return res.status(500).json({
      ok: false,
      error: "Error interno al crear pedido",
      detalle: error.message,
    });
  }
}
=======
import { PrismaClient } from '@prisma/client';

const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido. Usa POST.' });
  }

  const { usuarioId, items, total, metodoPago, tipoEnvio, direccion } = req.body;

  if (!usuarioId) {
    return res.status(400).json({ error: 'Falta el ID del usuario.' });
  }
  if (!items || items.length === 0) {
    return res.status(400).json({ error: 'El carrito está vacío o sin ítems.' });
  }

  try {
    // Iniciamos la transacción
    const nuevoPedido = await prisma.$transaction(async (tx) => {
      
      let direccionId = null;

      // 1. (Opcional) Si es despacho a domicilio, guardamos la dirección en la tabla 'direcciones'
      // para poder vincularla al pedido.
      if (tipoEnvio === 'home-delivery' && direccion) {
        const nuevaDireccion = await tx.direcciones.create({
          data: {
            usuario_id: usuarioId, // UUID (String)
            calle: direccion.direccion || "Sin calle",
            comuna: direccion.comuna,
            region: direccion.region,
            numero: "0", // Ajusta si tienes el número separado en el front
            // Otros campos opcionales...
          }
        });
        direccionId = nuevaDireccion.id;
      }

      // 2. Crear la cabecera del Pedido
      const pedido = await tx.pedidos.create({
        data: {
          usuario_id: usuarioId, // UUID (String), no usamos Number()
          fecha: new Date(),     // OJO: Tu schema tiene @unique en fecha, asegúrate de que permita horas distintas
          estado: 'PENDIENTE',
          total: parseFloat(total),
          
          // Campo obligatorio en tu schema
          Retiro_tienda: tipoEnvio === 'store-pickup' ? 'SI' : 'NO', 
          
          // Vinculamos la dirección si se creó
          direccion_envio_id: direccionId, 
          
          // Estos campos no están en tu modelo 'pedidos' actual según el schema que me pasaste:
          // metodo_pago, tipo_envio. 
          // Si quieres guardarlos, debes agregarlos a tu schema.prisma.
          // Por ahora no los enviamos para evitar error de "campo desconocido".
        },
      });

      // 3. Crear los Items del pedido
      const itemsData = items.map((item) => ({
        pedido_id: pedido.id,    // UUID
        producto_id: item.id,    // UUID (String), no usamos Number()
        cantidad: Number(item.qty),
        precio_unit: parseFloat(item.precio),
      }));

      await tx.pedido_items.createMany({
        data: itemsData,
      });

      return pedido;
    });

    res.status(201).json(nuevoPedido);

  } catch (error) {
    console.error('Error DETALLADO Prisma:', error);
    res.status(500).json({ 
      error: 'Error interno al crear pedido en BD', 
      details: error.message 
    });
  }
}
>>>>>>> 66415a235943139a76d33da41e08fe2efff340c8
