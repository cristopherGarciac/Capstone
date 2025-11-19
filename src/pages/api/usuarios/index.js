import prisma from "../../../../lib/prisma";


export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const usuarios = await prisma.usuarios.findMany({
        select: {
          id: true,
          nombre: true,
          apellido: true,
          email: true,
          telefono: true,
          rut: true,
          creado_en: true
        },
        orderBy: { creado_en: 'desc' }
      });
      return res.status(200).json(usuarios);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error al cargar usuarios' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Método ${req.method} no permitido`);
  }
}
