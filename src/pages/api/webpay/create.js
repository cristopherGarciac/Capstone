import { WebpayPlus, IntegrationCommerceCodes, IntegrationApiKeys, Environment } from "transbank-sdk";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    let { amount, sessionId, returnUrl } = req.body;

    amount = Number(amount);
    if (isNaN(amount) || amount <= 0) {
      return res.status(400).json({ error: "amount inválido" });
    }

    if (!returnUrl || typeof returnUrl !== "string" || !returnUrl.startsWith("http")) {
      return res.status(400).json({ error: "returnUrl inválida" });
    }

    const tx = new WebpayPlus.Transaction({
      commerceCode: IntegrationCommerceCodes.WEBPAY_PLUS,
      apiKey: IntegrationApiKeys.WEBPAY,
      environment: Environment.Integration  // ✅ CORREGIDO
    });

    const buyOrder = "orden-" + Date.now();

    const response = await tx.create(
      buyOrder,
      sessionId || "sesion-usuario-123",
      amount,
      returnUrl
    );

    return res.status(200).json(response);
  } catch (error) {
    console.error("Error al crear transacción:", error);
    return res.status(500).json({ error: error.message || "Error creando la transacción" });
  }
}
