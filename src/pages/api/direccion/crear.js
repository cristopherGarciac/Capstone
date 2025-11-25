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

// --- ENDPOINT ---
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const { usuario_id, comuna, region, calle, numero } = req.body;

    // Obtener coordenadas
    const coords = await obtenerCoordenadas(calle, numero, comuna, region);

    // Guardar dirección en BD
    const direccion = await prisma.direcciones.create({
      data: {
        usuario_id,
        comuna,
        region,
        calle,
        numero,
        lat: coords.lat,
        lng: coords.lng
      },
    });

    res.status(200).json({ ok: true, direccion });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, error: "Error creando dirección" });
  }
}
