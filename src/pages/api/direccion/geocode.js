export default async function handler(req, res) {
  const { comuna, region } = req.query;

  const query = `${comuna}, ${region}, Chile`;

  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`;

  const data = await fetch(url).then(r => r.json());

  if (!data.length) return res.status(404).json({ error: "No encontrado" });

  res.json({
    lat: data[0].lat,
    lon: data[0].lon
  });
}
