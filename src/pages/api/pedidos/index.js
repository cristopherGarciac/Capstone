import { PrismaClient } from '@prisma/client';

// Usamos una instancia global para evitar saturar conexiones en desarrollo
const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    // Busca todos los pedidos ordenados por fecha (más nuevos primero)
    // CORRECCIÓN: Cambiado 'prisma.pedido' a 'prisma.pedidos' (nombre real de la tabla)
    const rawPedidos = await prisma.pedidos.findMany({
      orderBy: {
        fecha: 'desc', // CORRECCIÓN: Tu tabla usa 'fecha', no 'creado_en'
      },
      include: {
        // Incluye los datos del usuario dueño del pedido
        // CORRECCIÓN: La relación se llama 'usuarios'
        usuarios: {
          select: {
            nombre: true,
            apellido: true,
            email: true,
            telefono: true,
          },
        },
        // Incluye los ítems del pedido
        // CORRECCIÓN: La relación se llama 'pedido_items'
        pedido_items: {
          include: {
            // Detalles del producto
            // CORRECCIÓN: La relación se llama 'productos'
            productos: {
              select: {
                titulo: true,   // CORRECCIÓN: El campo es 'titulo', no 'nombre'
                sku: true,
                imagenes: true, // CORRECCIÓN: El campo es 'imagenes' (array)
              },
            },
          },
        },
      },
    });

    // IMPORTANTE: Convertimos los datos a JSON plano antes de enviarlos.
    // Esto soluciona el error de "Do not know how to serialize a BigInt/Decimal" 
    // que suele ocurrir con los precios en Prisma.
    const pedidos = JSON.parse(JSON.stringify(rawPedidos));

    res.status(200).json(pedidos);
  } catch (error) {
    console.error('Error obteniendo pedidos:', error);
    // Enviamos el detalle del error para que sepas qué falló
    res.status(500).json({ error: 'Error al cargar los pedidos', details: error.message });
  }
}