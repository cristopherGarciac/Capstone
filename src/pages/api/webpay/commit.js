import { WebpayPlus, IntegrationCommerceCodes, IntegrationApiKeys, Environment } from "transbank-sdk";

export default async function handler(req, res) {
  // Solo aceptar POST (Transbank devuelve token por GET, así que manejamos ambos)
  if (req.method !== "POST" && req.method !== "GET") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    // Transbank devuelve token_ws por GET
    const token = req.body?.token_ws || req.query?.token_ws;

    if (!token) {
      return res.status(400).json({ error: "Falta el token_ws" });
    }

    // Crear instancia de transacción (misma configuración que create.js)
    const tx = new WebpayPlus.Transaction({
      commerceCode: IntegrationCommerceCodes.WEBPAY_PLUS,
      apiKey: IntegrationApiKeys.WEBPAY,
      environment: Environment.Integration,
    });

    // Confirmar transacción
    const response = await tx.commit(token);

    console.log("✅ Respuesta Webpay:", response);

    // Si el pago fue autorizado, redirigir a página de éxito
    if (response.status === "AUTHORIZED") {
      return res.redirect(302, "/pago_exitoso");
    } else {
      // Si no fue autorizado, redirigir a página de fallo
      return res.redirect(302, "/pago_fallido");
    }
  } catch (error) {
    console.error("❌ Error al confirmar transacción:", error);
    return res.redirect(302, "/pago_fallido");
  }
}
