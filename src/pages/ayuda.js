import { useState } from "react";
import Link from "next/link";
import axios from "axios";

export default function CentroDeAyuda() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const promociones = [
    { texto: "Despacho a Todo Chile", destaque: false },
    { texto: "Marcas Exclusivas", destaque: false },
  ];

  const handleSendMessage = async () => {
    if (!userMessage.trim()) return;

    const userMsg = { sender: "user", message: userMessage };
    setChatHistory((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const response = await axios.post("/api/chatbot", {
        message: userMessage,
      });

      const botMsg = {
        sender: "chatbot",
        message: response.data.response,
      };

      setChatHistory((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error("Error al enviar mensaje:", error);
      setChatHistory((prev) => [
        ...prev,
        {
          sender: "chatbot",
          message:
            "Lo siento, ocurrió un error al comunicarme con el servidor.",
        },
      ]);
    }

    setUserMessage("");
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-[var(--color-bg)]">

      {/* ==== BARRA SUPERIOR ==== */}
      <div className="bg-[var(--color-secondary)] text-white text-center py-2 text-sm">
        {promociones.map((p, i) => (
          <span key={i} className="mx-4">
            {p.texto}
          </span>
        ))}
      </div>

      {/* ==== NAVBAR ==== */}
      <nav className="bg-white shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

          <Link href="/" className="text-2xl font-bold">
            <img
              src="/images/blitz.png"
              alt="Blitz Hardware Logo"
              className="h-20"
            />
          </Link>

          <div className="flex items-center gap-6">
            <Link href="/" className="text-gray-700 hover:text-yellow-600">
              Inicio
            </Link>

            <Link href="/catalogo" className="text-gray-700 hover:text-yellow-600">
              Catálogo
            </Link>

            <Link href="/carrito">
              <img src="/images/carrito.png" className="h-11" />
            </Link>

            <button
              onClick={() => setLoginOpen(true)}
              className="flex items-center text-gray-700 hover:text-yellow-600"
            >
              <svg className="h-5 w-5 mr-1" fill="none" stroke="currentColor" strokeWidth="2"
                viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M5.121 17.804A9 9 0 0112 15a9 9 0 016.879 2.804M12 11a4 4 0 100-8 4 4 0 000 8z" />
              </svg>
              Iniciar sesión
            </button>
          </div>
        </div>
      </nav>

      {/* ==== CHAT ==== */}
      <div className="max-w-5xl mx-auto px-6 py-12">

        <h1 className="text-4xl font-bold text-center text-yellow-600 mb-6">
          Centro de Ayuda (Chat-bot)
        </h1>

        <div className="text-center mb-4">
          <img src="/images/bitzi.png" className="w-32 mx-auto" />
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">

          {/* CHAT WINDOW */}
          <div className="overflow-y-auto max-h-[400px] p-4 bg-gray-50 rounded-xl shadow-inner space-y-4">

            {chatHistory.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`px-4 py-3 max-w-sm rounded-2xl text-sm shadow ${
                    msg.sender === "user"
                      ? "bg-blue-500 text-white rounded-br-none"
                      : "bg-white border rounded-bl-none text-gray-800"
                  }`}
                >
                  {msg.message.split("\n").map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              </div>
            ))}

            {loading && (
              <p className="text-center text-gray-400 italic">
                Bitzi está escribiendo...
              </p>
            )}
          </div>

          {/* INPUT */}
          <div className="mt-4 flex gap-3">
            <input
              type="text"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 shadow focus:ring-2 focus:ring-yellow-400"
              placeholder="Escribe tu mensaje..."
            />

            <button
              onClick={handleSendMessage}
              disabled={loading}
              className="bg-yellow-400 hover:bg-yellow-500 transition font-semibold px-6 py-3 rounded-xl shadow"
            >
              Enviar
            </button>
          </div>
        </div>

      </div>

      {/* ==== FOOTER ==== */}
      <footer className="bg-[#FFD700] text-black mt-16">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">

          <div>
            <h4 className="text-xl font-semibold mb-4 border-l-4 border-blue-300 pl-3">
              Ayuda
            </h4>
            <ul className="space-y-2">
              <li><Link href="/ayuda">Centro de ayuda</Link></li>
              <li><Link href="/seguimiento">Seguimiento de compra</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-4 border-l-4 border-blue-300 pl-3">
              Nosotros
            </h4>
            <ul className="space-y-2">
              <li><Link href="/quienes_somos">Quiénes somos</Link></li>
              <li><Link href="/terminos">Términos y condiciones</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-4 border-l-4 border-blue-300 pl-3">
              Comunidad Blitz
            </h4>
            <ul className="space-y-2">
              <li><a href="https://instagram.com" target="_blank">Instagram</a></li>
            </ul>
          </div>

        </div>

        <div className="bg-black/20 text-center py-3 text-sm">
          © 2025 — Proyecto Capstone
        </div>

      </footer>

    </main>
  );
}
