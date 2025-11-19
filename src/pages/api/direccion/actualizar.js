import prisma from "../../../../lib/prisma";

// --- FUNCIÓN PARA OBTENER LAT & LNG ---
async function obtenerCoordenadas(calle, numero, comuna, region) {
  const query = `${calle} ${numero}, ${comuna}, ${region}, Chile`;
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`;

  const res = await fetch(url, {
    headers: {
      "User-Agent": "BlitzHardware/1.0" // requerido por Nominatim
    }
  });

  const data = await res.json();

  if (!data[0]) return { lat: null, lng: null };

  return {
    lat: parseFloat(data[0].lat),
    lng: parseFloat(data[0].lon),
  };
}

// --- ENDPOINT: CREAR O ACTUALIZAR DIRECCIÓN ---
export default async function handler(req, res) {
  if (req.method !== "PUT") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const { direccionId, usuarioId, comuna, region, calle, numero } = req.body;

    if (!usuarioId) {
      return res.status(400).json({ error: "Falta el ID del usuario" });
    }

    // Obtener coordenadas
    const coords = await obtenerCoordenadas(calle, numero, comuna, region);

    let direccion;

    // ----------------------------------------------------
    // 1) Si existe dirección → ACTUALIZAR
    // ----------------------------------------------------
    if (direccionId) {
      direccion = await prisma.direcciones.update({
        where: { id: direccionId },
        data: {
          comuna,
          region,
          calle,
          numero,
          lat: coords.lat,
          lng: coords.lng,
        },
      });
    }

    // ----------------------------------------------------
    // 2) Si NO existe dirección → CREAR NUEVA
    // ----------------------------------------------------
    else {
      direccion = await prisma.direcciones.create({
        data: {
          usuario_id: usuarioId,
          comuna,
          region,
          calle,
          numero,
          lat: coords.lat,
          lng: coords.lng,
        },
      });
    }

    return res.status(200).json({ ok: true, direccion });

  } catch (error) {
    console.error("Error actualizando/creando dirección:", error);
    res.status(500).json({
      ok: false,
      error: "Error al procesar dirección",
    });
  }
}
