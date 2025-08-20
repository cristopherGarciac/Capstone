// pages/api/chatbot.js
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req = NextApiRequest, res = NextApiResponse) {
  if (req.method === 'POST') {
    try {
      // Obtener el mensaje del usuario
      const { message } = req.body;

      // Aquí podrías conectar tu chatbot a alguna IA (como OpenAI o DialogFlow)
      // Para este ejemplo, vamos a usar una respuesta fija
      const response = await getChatbotResponse(message);

      // Devolver la respuesta del chatbot
      res.status(200).json({ response });
    } catch (error) {
      console.error('Error al procesar la solicitud del chatbot', error);
      res.status(500).json({ error: 'Hubo un error al procesar la solicitud.' });
    }
  } else {
    res.status(405).json({ error: 'Método no permitido.' });
  }
}

// Función que simula la lógica del chatbot
const getChatbotResponse = async (message) => {
  // Aquí se podría integrar la lógica de la IA
  // Usaremos respuestas predefinidas para este ejemplo
  if (message.toLowerCase().includes('ayuda')) {
    return '¡Claro! ¿En qué te puedo ayudar hoy?';
  } else if (message.toLowerCase().includes('producto')) {
    return 'Puedo ayudarte a encontrar productos. ¿Qué estás buscando?';
  } else {
    return 'Lo siento, no entiendo tu pregunta. ¿Podrías ser más específico?';
  }
};
