import { MercadoPagoConfig, Preference } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const { items } = req.body;

   const preferenceData = {
  items,
};

    const preference = new Preference(client);
    const response = await preference.create({ body: preferenceData });

    res.status(200).json({ init_point: response.init_point });
  } catch (err) {
    console.error("Error creando preferencia Mercado Pago:", err);
    res.status(500).json({ error: err.message });
  }
}
