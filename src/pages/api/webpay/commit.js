import { WebpayPlus, Options, IntegrationApiKeys, Environment } from "transbank-sdk";

const tx = new WebpayPlus.Transaction(
  new Options(
    IntegrationApiKeys.WEBPAY_PLUS,   // API Key de integración
    "597055555532",                   // Commerce Code de pruebas
    Environment.Integration           // Ambiente de pruebas
  )
);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ error: "Falta el token" });
    }

    // Confirmar la transacción
    const response = await tx.commit(token);

    return res.status(200).json(response);
  } catch (error) {
    console.error("Error al confirmar transacción:", error);
    return res.status(500).json({ error: "No se pudo confirmar la transacción" });
  }
}
