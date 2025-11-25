// pages/api/chatbot.js
import OpenAI from "openai";
import prisma from "../../../lib/prisma";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

// STOPWORDS → palabras inútiles
const STOPWORDS = [
  "muéstrame", "muestrame", "mostrar", "ver", "catalogo", "catálogo",
  "que", "qué", "tienes", "quiero", "hay", "del", "de", "la", "los",
  "las", "en", "un", "una", "busco", "buscar", "el"
];

// MAPA DE CATEGORÍAS
const CATEGORIAS = {
  teclado: "teclado",
  teclados: "teclado",
  mouse: "mouse",
  mouses: "mouse",
  raton: "mouse",
  ratón: "mouse",
  monitor: "monitor",
  monitores: "monitor",
  audifonos: "audifonos",
  audífonos: "audifonos",
  auriculares: "audifonos",
  laptop: "notebook",
  notebooks: "notebook",
  notebook: "notebook",
  cpu: "cpu",
  procesador: "cpu",
  procesadores: "cpu",
  gabinete: "gabinete",
  gabinetes: "gabinete",
  ram: "ram",
  memoria: "ram",
  memorias: "ram",
  ssd: "ssd",
  disco: "ssd",
  discos: "ssd",
};

// Detectar categoría
function detectarCategoria(msgLower) {
  const palabras = msgLower.split(/\s+/);
  for (const p of palabras) {
    if (CATEGORIAS[p]) return CATEGORIAS[p];
  }
  return null;
}

// Extraer término útil
function extraerTermino(msgLower) {
  const palabras = msgLower.split(/\s+/);
  const candidatas = palabras.filter(
    (p) => p.length > 2 && !STOPWORDS.includes(p)
  );
  return candidatas.length > 0 ? candidatas[0] : null;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const { message } = req.body;
    const msgLower = message.toLowerCase();

    let extraContext = "";

    // Detecta si hay intención de catálogo
    const necesitaCatalogo =
      msgLower.includes("catalogo") ||
      msgLower.includes("catálogo") ||
      msgLower.includes("productos") ||
      msgLower.includes("producto") ||
      msgLower.includes("tienes") ||
      msgLower.includes("muestrame") ||
      msgLower.includes("muéstrame") ||
      msgLower.includes("ver");

    if (necesitaCatalogo) {
      const categoria = detectarCategoria(msgLower);
      const termino = extraerTermino(msgLower);
      let productos = [];

      // 1. Buscar por categoría
      if (categoria) {
        productos = await prisma.productos.findMany({
          where: {
            categoria: { contains: categoria, mode: "insensitive" },
          },
          take: 10,
          select: {
            id: true,
            titulo: true,
            precio: true,
            stock: true,
            categoria: true,
            sku: true,
          },
        });
      }

      // 2. Buscar por término
      else if (termino) {
        productos = await prisma.productos.findMany({
          where: {
            titulo: { contains: termino, mode: "insensitive" },
          },
          take: 10,
          select: {
            id: true,
            titulo: true,
            precio: true,
            stock: true,
            categoria: true,
            sku: true,
          },
        });
      }

      // 3. Mostrar catálogo general
      else {
        productos = await prisma.productos.findMany({
          take: 10,
          orderBy: { creado_en: "desc" },
          select: {
            id: true,
            titulo: true,
            precio: true,
            stock: true,
            categoria: true,
            sku: true,
          },
        });
      }

      extraContext =
        productos.length > 0
          ? JSON.stringify(productos)
          : "No hay productos relacionados.";
    }

    const tarjetasProductos = () => {
  try {
    const items = JSON.parse(extraContext);
    if (!Array.isArray(items)) return "";

    let tarjetas = "";

    for (const p of items) {
      const precio = `$${Number(p.precio).toLocaleString("es-CL")}`;
      const stock = p.stock > 0 ? `${p.stock} unidades` : "Agotado";

      tarjetas += `
        🛒 Producto: **${p.titulo}**
        💲 Precio: ${precio}
        📦 Stock: ${stock}

────────────────────

`;
    }

    return tarjetas;
  } catch {
    return "";
  }
};

    // ---------- CONSULTA A OPENROUTER ----------
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
      {
  role: "system",
  content: `
Eres Bitzi, un asistente virtual profesional de una tienda online.

Reglas:
- NO uses tablas ni formato de columnas.
- NO uses líneas con "|" porque rompen el diseño del chat.
- Usa SIEMPRE tarjetas verticales como esta:

🛒 Producto: Nombre
💲 Precio: $X.XXX
📦 Stock: X unidades

────────────────────

- Responde de forma clara, amable y profesional.
- No inventes productos.
- Usa SOLO los productos proporcionados por "extraContext".
${extraContext !== "" ? "Aquí tienes los productos disponibles:\n" + tarjetasProductos() : ""}
`
}
,
        { role: "user", content: message },
      ],
    });

    const reply = completion.choices[0].message.content;

    res.status(200).json({ response: reply });

  } catch (error) {
    console.error("Error con el chatbot:", error);
    res.status(500).json({ error: "Error interno del chatbot." });
  }
}
