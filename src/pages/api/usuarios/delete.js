// src/pages/api/usuarios/delete.js
import prisma from "../../../../lib/prisma";

const ANON_ID = "00000000-0000-0000-0000-000000000000";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Método ${req.method} no permitido`);
  }

  try {
    const { id } = req.body;
    if (!id) return res.status(400).json({ error: "ID es obligatorio" });

    // -------------------------------------------
    // 1) Verificar si existe usuario anónimo
    // -------------------------------------------
    let anon = await prisma.usuarios.findUnique({
      where: { id: ANON_ID }
    });

    if (!anon) {
      anon = await prisma.usuarios.create({
        data: {
          id: ANON_ID,
          email: "anon@deleted.com",
          nombre: "Usuario eliminado",
          apellido: "",
          hash_pwd: "deleted",
          telefono: "",
          rut: "",
          rol: "anon"
        }
      });
    }

    // -------------------------------------------
    // 2) MOVER TODOS LOS PEDIDOS A USUARIO ANÓNIMO
    // -------------------------------------------
    await prisma.pedidos.updateMany({
      where: { usuario_id: id },
      data: { usuario_id: ANON_ID }
    });

    // -------------------------------------------
    // 3) ELIMINAR DIRECCIONES DEL USUARIO
    // (opcionales)
    // -------------------------------------------
    await prisma.direcciones.deleteMany({
      where: { usuario_id: id }
    });

    // -------------------------------------------
    // 4) ELIMINAR USUARIO
    // -------------------------------------------
    await prisma.usuarios.delete({
      where: { id }
    });

    return res.status(200).json({ message: "Usuario eliminado correctamente" });

  } catch (err) {
    console.error("❌ Error al eliminar usuario:", err);
    return res.status(500).json({ error: "Error interno al eliminar usuario" });
  }
}
