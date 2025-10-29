import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});


export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const { message } = req.body;

    const completion = await openai.chat.completions.create({
      model: "openai/gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "Eres Bitzi, el asistente de soporte de Blitz Hardware, un e-commerce chileno especializado en productos tecnológicos. Responde de forma amable, breve y útil.",
        },
        { role: "user", content: message },
      ],
    });

    const reply = completion.choices[0].message.content;

    res.status(200).json({ response: reply });
  } catch (error) {
    console.error("Error con el chatbot:", error);
    res
      .status(500)
      .json({ error: "Hubo un problema al procesar el mensaje." });
  }
}
