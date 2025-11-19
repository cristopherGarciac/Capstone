import prisma from "../../../../lib/prisma";


// --- FUNCIÓN PARA OBTENER LAT & LNG ---
async function obtenerCoordenadas(calle, numero, comuna, region) {
  const query = `${calle} ${numero}, ${comuna}, ${region}, Chile`;
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`;

  const res = await fetch(url);
  const data = await res.json();

  if (!data[0]) return { lat: null, lng: null };

  return {
    lat: parseFloat(data[0].lat),
    lng: parseFloat(data[0].lon)
  };
}

// --- ENDPOINT: ACTUALIZAR DIRECCIÓN ---
export default async function handler(req, res) {
  if (req.method !== "PUT") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const { id, comuna, region, calle, numero } = req.body;

    if (!id) {
      return res.status(400).json({ error: "Falta el ID de la dirección" });
    }

    // Obtener nuevas coordenadas
    const coords = await obtenerCoordenadas(calle, numero, comuna, region);

    // Actualizar en la BD
    const direccionActualizada = await prisma.direcciones.update({
      where: { id },
      data: {
        comuna,
        region,
        calle,
        numero,
        lat: coords.lat,
        lng: coords.lng
      },
    });

    return res.status(200).json({ ok: true, direccion: direccionActualizada });

  } catch (error) {
    console.error("Error actualizando dirección:", error);
    res.status(500).json({ ok: false, error: "Error actualizando dirección" });
  }
}
