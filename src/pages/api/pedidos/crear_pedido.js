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