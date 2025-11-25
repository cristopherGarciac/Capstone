import { useState, useContext, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { UserContext } from "../context/UserContext"; // 1. Importamos el contexto

export default function CentroDeAyuda() {
  // 2. Extraemos el usuario del contexto
  const { user, setUser } = useContext(UserContext);

  // Estados del Chat (Los que ya tenías)
  const [userMessage, setUserMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  // 3. Estados y Funciones para el LOGIN (Faltaban esto)
  const [loginOpen, setLoginOpen] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState("");

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data);
        setLoginOpen(false);
      } else {
        setLoginError(data.error || "Credenciales incorrectas");
      }
    } catch (err) {
      console.error("Error al iniciar sesión:", err);
      setLoginError("Ocurrió un error en el servidor.");
    }
  };

  // ---------- config navbar/footer ----------
  const [logo, setLogo] = useState("/images/blitz.png");
  const [nombrePagina, setNombrePagina] = useState("Mi E-commerce");
  const [colorHeader, setColorHeader] = useState("#ffffff");
  const [colorFooter, setColorFooter] = useState("#ffffff"); // Agregado para consistencia

  // 4. useEffect para cargar la configuración (Igual que en Terminos)
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    const savedConfig = localStorage.getItem("config");
    if (savedConfig) {
      try {
        const config = JSON.parse(savedConfig);
        if (config.logo) setLogo(config.logo);
        if (config.nombrePagina) setNombrePagina(config.nombrePagina);
        if (config.colorHeader) setColorHeader(config.colorHeader);
        if (config.colorFooter) setColorFooter(config.colorFooter);

        // Variables CSS para botones
        const r = document.documentElement.style;
        if (config.btnBg) r.setProperty("--btn-bg", config.btnBg);
        if (config.btnText) r.setProperty("--btn-text", config.btnText);
        if (config.btnBorder) r.setProperty("--btn-border", config.btnBorder);
        if (config.btnHoverBg) r.setProperty("--btn-hover-bg", config.btnHoverBg);
        if (config.btnHoverText) r.setProperty("--btn-hover-text", config.btnHoverText);

      } catch (e) {
        console.error("Error cargando config:", e);
      }
    }
  }, []);

  // Lógica del Chatbot
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
      
      {/* Estilos globales para botones consistentes */}
      <style jsx global>{`
        .btn-primary {
          background: var(--btn-bg, #7e22ce);
          color: var(--btn-text, #ffffff);
          border: 1px solid var(--btn-border, #7e22ce);
          transition: all 0.2s;
        }
        .btn-primary:hover {
          background: var(--btn-hover-bg, #6b21a8);
          color: var(--btn-hover-text, #ffffff);
        }
      `}</style>

      {/* NAVBAR */}
      <nav
        className="shadow sticky top-0 z-50"
        style={{ backgroundColor: colorHeader }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          {/* LOGO */}
          <Link href="/" className="logo text-2xl font-bold">
            <img src={logo} alt="logo" className="h-20 w-auto" />
          </Link>

          {/* LINKS */}
          <div className="flex items-center space-x-6">
            <span className="text-2xl font-semibold hidden md:block">{nombrePagina}</span>

            <Link href="/" className="text-gray-700 hover:text-[var(--color-primary)]">Inicio</Link>
            <Link href="/catalogo" className="text-gray-700 hover:text-[var(--color-primary)]">Catálogo</Link>
            <Link href="/carrito" className="text-gray-700 hover:text-[var(--color-primary)]">
              <img src="/images/carrito.png" className="h-11" alt="Carrito" />
            </Link>

            {/* SOLO ADMIN VE EL BOTÓN */}
            {user?.rol === "admin" && (
              <Link
                href="/admin"
                className="text-gray-700 hover:text-[var(--color-primary)] font-semibold"
              >
                Admin
              </Link>
            )}

            {user ? (
              <div className="flex items-center space-x-4">
                <Link href="/mi_cuenta" className="text-gray-700 hover:text-[var(--color-primary)]">
                  Hola, {user.nombre}
                </Link>
                <Link href="/mi_cuenta" className="flex items-center">
                  <img
                    src={user.fotoperfil || "/images/default-user.jpg"}
                    alt="perfil"
                    className="h-10 w-10 rounded-full object-cover border border-gray-300 cursor-pointer hover:opacity-90"
                  />
                </Link>
              </div>
            ) : (
              <button
                onClick={() => setLoginOpen(true)}
                className="text-gray-700 hover:text-[var(--color-accent)] flex items-center"
              >
                <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A9.001 9.001 0 0112 15a9.001 9.001 0 016.879 2.804M12 11a4 4 0 100-8 4 4 0 000 8z" />
                </svg>
                Iniciar sesión
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* LOGIN MODAL */}
      {loginOpen && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-start pt-24 z-50">
          <div className="bg-white rounded-xl shadow-lg w-96 p-6 relative">
            <button
              onClick={() => setLoginOpen(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
              Iniciar Sesión
            </h2>

            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <input
                type="email"
                name="email"
                value={loginData.email}
                onChange={handleLoginChange}
                placeholder="Correo electrónico"
                className="border p-2 rounded text-black"
                required
              />
              <input
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleLoginChange}
                placeholder="Contraseña"
                className="border p-2 rounded text-black"
                required
              />
              <button type="submit" className="btn-primary w-full py-2 rounded font-bold">
                Iniciar Sesión
              </button>
            </form>

            {loginError && (
              <p className="text-red-500 text-sm mt-2 text-center">{loginError}</p>
            )}
          </div>
        </div>
      )}

      {/* ==== CHAT ==== */}
      <div className="max-w-5xl mx-auto px-6 py-12">

        <h1 className="text-4xl font-bold text-center text-yellow-600 mb-6">
          Centro de Ayuda (Chat-bot)
        </h1>

        <div className="text-center mb-4">
          <img src="/images/bitzi.png" className="w-32 mx-auto" alt="Bitzi mascota" />
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
              className="w-full px-4 py-3 rounded-xl border border-gray-300 shadow focus:ring-2 focus:ring-yellow-400 text-black"
              placeholder="Escribe tu mensaje..."
            />

            <button
              onClick={handleSendMessage}
              disabled={loading}
              className="bg-yellow-400 hover:bg-yellow-500 transition font-semibold px-6 py-3 rounded-xl shadow text-black"
            >
              Enviar
            </button>
          </div>
        </div>

      </div>

      {/* ==== FOOTER ==== */}
      <footer style={{ backgroundColor: colorFooter }} className="mt-16 text-black">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">

          <div>
            <h4 className="text-xl font-semibold mb-4 border-l-4 border-blue-300 pl-3">
              Ayuda
            </h4>
            <ul className="space-y-2">
              <li><Link href="/ayuda" className="hover:text-teal-300">Centro de ayuda</Link></li>
              <li><Link href="/seguimiento" className="hover:text-teal-300">Seguimiento de compra</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-4 border-l-4 border-blue-300 pl-3">
              Nosotros
            </h4>
            <ul className="space-y-2">
              <li><Link href="/quienes_somos" className="hover:text-teal-300">Quiénes somos</Link></li>
              <li><Link href="/terminos" className="hover:text-teal-300">Términos y condiciones</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-4 border-l-4 border-blue-300 pl-3">
              Comunidad Blitz
            </h4>
            <ul className="space-y-2">
              <li><a href="https://instagram.com" target="_blank" className="hover:text-teal-300">Instagram</a></li>
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