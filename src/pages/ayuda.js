import { useState } from "react";
import Link from "next/link";
import axios from 'axios';

export default function CentroDeAyuda() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [userMessage, setUserMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const promociones = [
    { texto: "Despacho a Todo Chile", destaque: false },
    { texto: "Marcas Exclusivas", destaque: false },
  ];

  const handleSendMessage = async () => {
    if (!userMessage.trim()) return;

    // Mostrar el mensaje del usuario en el chat
    setChatHistory([...chatHistory, { sender: 'user', message: userMessage }]);
    setLoading(true);

    try {
      // Enviar el mensaje al backend del chatbot
      const response = await axios.post('/api/chatbot', { message: userMessage });

      // Agregar la respuesta del chatbot al chat
      setChatHistory([
        ...chatHistory,
        { sender: 'user', message: userMessage },
        { sender: 'chatbot', message: response.data.response }
      ]);
    } catch (error) {
      console.error('Error al enviar el mensaje al chatbot', error);
    }

    // Limpiar el campo de texto
    setUserMessage('');
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-[var(--color-bg)]">
      {/* Barra superior */}
      <div className="bg-[var(--color-secondary)] text-white text-center py-2 text-sm">
        {promociones.map((p, i) => (
          <span key={i} className={`mx-4 ${p.destaque ? "font-semibold" : ""}`}>
            {p.texto}
          </span>
        ))}
      </div>

      {/* Navbar */}
      <nav className="bg-white shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-[var(--color-primary)]">
            <img src="/images/blitz.png" alt="Blitz Hardware Logo" className="h-20 w-auto" />
          </Link>
          <div className="flex items-center space-x-6">
            <Link href="/" className="text-gray-700 hover:text-[var(--color-accent)]">
              Inicio
            </Link>
            <Link href="/catalogo" className="text-gray-700 hover:text-[var(--color-accent)]">
              Catálogo
            </Link>
            <Link href="/carrito" className="text-gray-700 hover:text-[var(--color-accent)]">
              <img src="/images/carrito.png" alt="Carrito Compra Logo" className="h-11 w-auto"/>
            </Link>

            {/* Botón login */}
            <button
              onClick={() => setLoginOpen(true)}
              className="text-gray-700 hover:text-[var(--color-accent)] flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A9.001 9.001 0 0112 15a9.001 9.001 0 016.879 2.804M12 11a4 4 0 100-8 4 4 0 000 8z" />
              </svg>
              Iniciar sesión
            </button>
          </div>
        </div>
      </nav>

      {/* Modal de login */}
      {loginOpen && (
        <div className="fixed inset-0 bg-black flex justify-center items-start pt-24 z-50" style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
          <div className="bg-white rounded-xl shadow-lg w-96 p-6 relative">
            <button
              onClick={() => setLoginOpen(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold text-[var(--color-secondary)] mb-4 text-center">Iniciar Sesión</h2>
            <form className="flex flex-col gap-4">
              <input type="email" placeholder="Correo electrónico" className="border p-2 rounded"/>
              <input type="password" placeholder="Contraseña" className="border p-2 rounded"/>
              <button type="submit" className="btn-primary w-full">Iniciar Sesión</button>
            </form>
            <div className="flex flex-col items-center text-sm mt-4 gap-2">
              <button className="text-blue-600 hover:underline">Olvidé mi contraseña</button>
              <span>
                ¿No estás registrado?{" "}
                <Link href="/register" className="text-blue-600 hover:underline">
                  Regístrate
                </Link>
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Centro de Ayuda - Chatbot */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-center text-[var(--color-secondary)] mb-6">
          Centro de Ayuda (Chat-bot)
        </h1>

        {/* Imagen del bot */}
        <div className="text-center mb-4">
          <img src="/images/bitzi.png" alt="Bot" className="w-32 mx-auto" />
        </div>

        {/* Chatbot */}
        <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-[var(--color-primary)]">
          <div className="overflow-y-auto max-h-96 mb-4">
            {/* Mostrar el historial del chat */}
            {chatHistory.map((msg, index) => (
              <div key={index} className={`mb-2 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                <div className={`${msg.sender === 'user' ? 'bg-blue-100' : 'bg-gray-100'} p-3 rounded-lg inline-block max-w-xs`}>
                  <p className="font-medium">{msg.message}</p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="text-center text-gray-600">
                <p>El chatbot está escribiendo...</p>
              </div>
            )}
          </div>

          <div className="flex items-center border-t pt-4">
            <input
              type="text"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              className="border border-yellow-300 p-3 rounded-l-lg w-full text-sm text-gray"
               placeholder="Escribe tu mensaje..."
            />

            <button
              onClick={handleSendMessage}
              className="bg-[var(--color-primary)] text-white p-3 rounded-r-lg"
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
            <h4 className="text-xl font-semibold mb-4 border-l-4 border-blue-300 pl-3">Ayuda</h4>
            <ul className="space-y-2 text-black">
              <li><Link href="/ayuda" className="hover:text-teal-300">Centro de ayuda</Link></li>
              <li><Link href="/seguimiento" className="hover:text-teal-300">Seguimiento de mi compra</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-4 border-l-4 border-blue-300 pl-3">Nosotros</h4>
            <ul className="space-y-2 text-black">
              <li><Link href="/quienes_somos" className="hover:text-teal-300">Quiénes somos</Link></li>
              <li><Link href="/terminos" className="hover:text-teal-300">Términos y Condiciones</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-4 border-l-4 border-blue-300 pl-3">Comunidad Blitz</h4>
            <ul className="space-y-2 text-black">
              <li><a href="https://www.instagram.com/blitz.hardware?igsh=b29mcW00OGthcnM3" target="_blank" className="hover:text-teal-300">Instagram</a></li>
            </ul>
          </div>
        </div>

        <hr className="border-white/10" />

        <div className="max-w-7xl mx-auto px-6 py-8">
          <h5 className="text-lg font-semibold mb-6 border-l-4  border-blue-300 pl-3">Medios de pago</h5>
          <div className="flex flex-wrap items-center gap-6 ">
            <span className="bg-white/5 px-4 py-2 rounded-md">
              <img src="/images/mercado.png" alt="Mercado Pago" width={100} height={50} />
            </span>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-white/10 grid place-items-center">🏛️</div>
              <div className="text-sm text-black">
                Dirección <br /> <span className="font-semibold">ChileCompra</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-white/10 grid place-items-center">🛡️</div>
              <div className="text-sm text-black">
                Protegido con <span className="font-semibold">seguridad</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-black/30 text-center text-xs text-white-300 py-3">
          © 2025–2025 | Desarrollado por Cristopher Garcia, Jesus Lagos e Ignacio Varas, Proyecto Capstone
        </div>
      </footer>
    </main>
  );
}