import { PrismaClient } from './prisma/src/generated/prisma/index.js';

const prisma = new PrismaClient();

// --- Función para obtener lat/lng ---
async function obtenerCoordenadas(calle, numero, comuna, region) {
  const query = `${calle} ${numero}, ${comuna}, ${region}, Chile`;
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (!data || !data[0]) {
      console.log(`❌ No se encontraron coords para: ${query}`);
      return { lat: null, lng: null };
    }

    return {
      lat: parseFloat(data[0].lat),
      lng: parseFloat(data[0].lon)
    };
  } catch (e) {
    console.log("❌ Error geocodificando:", e);
    return { lat: null, lng: null };
  }
}

async function main() {
  console.log("⏳ Buscando direcciones sin coordenadas...");

  const direcciones = await prisma.direcciones.findMany({
    where: {
      OR: [
        { lat: null },
        { lng: null }
      ]
    }
  });

  console.log(`📌 ${direcciones.length} direcciones necesitan coordenadas.`);

  for (const dir of direcciones) {
    const { calle, numero, comuna, region } = dir;

    console.log(`\n➡ Geocodificando: ${calle} ${numero}, ${comuna}, ${region}`);

    const coords = await obtenerCoordenadas(calle, numero, comuna, region);

    await prisma.direcciones.update({
      where: { id: dir.id },
      data: {
        lat: coords.lat,
        lng: coords.lng,
      }
    });

    console.log(`   ✓ Guardado → lat: ${coords.lat}, lng: ${coords.lng}`);

    // ⏳ Evitar que OSM bloquee por exceso de solicitudes
    await new Promise(r => setTimeout(r, 1200));
  }

  console.log("\n🎉 PROCESO COMPLETADO — todas las coordenadas han sido actualizadas.");
  process.exit();
}

main();
