import { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/UserContext"; // Asegúrate que la ruta sea correcta
import Link from "next/link";

export default function Terminos() {
  // 1. OBTENER EL USUARIO DEL CONTEXTO (Esto arregla tu error principal)
  const { user, setUser } = useContext(UserContext);

  // 2. ESTADOS PARA EL LOGIN (Necesarios para el modal que tienes abajo)
  const [loginOpen, setLoginOpen] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState("");

  // 💾 Configuración del footer
  const [footerCfg, setFooterCfg] = useState(null);
  // 💾 Configuración global
  const [config, setConfig] = useState(null);

  // ---------- config navbar/footer ----------
  const [logo, setLogo] = useState("/images/blitz.png");
  const [nombrePagina, setNombrePagina] = useState("Mi E-commerce");
  const [colorHeader, setColorHeader] = useState("#ffffff");
  
  // Efecto para cargar configuraciones
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Cargar configuraciones del footer
    const savedFooter = localStorage.getItem("configFooter");
    if (savedFooter) {
      try {
        setFooterCfg(JSON.parse(savedFooter));
      } catch (e) {
        console.error("Error al leer configFooter en /terminos:", e);
      }
    }

    // Cargar configuraciones generales del sitio
    const savedConfig = localStorage.getItem("config");
    if (savedConfig) {
      try {
        const parsedConfig = JSON.parse(savedConfig);
        setConfig(parsedConfig);
        // Actualizar estados locales de config si existen
        if (parsedConfig.logo) setLogo(parsedConfig.logo);
        if (parsedConfig.nombrePagina) setNombrePagina(parsedConfig.nombrePagina);
        if (parsedConfig.colorHeader) setColorHeader(parsedConfig.colorHeader);
        
        // Variables CSS
        const r = document.documentElement.style;
        if (parsedConfig.btnBg) r.setProperty("--btn-bg", parsedConfig.btnBg);
        if (parsedConfig.btnText) r.setProperty("--btn-text", parsedConfig.btnText);
        if (parsedConfig.btnBorder) r.setProperty("--btn-border", parsedConfig.btnBorder);
        if (parsedConfig.btnHoverBg) r.setProperty("--btn-hover-bg", parsedConfig.btnHoverBg);
        if (parsedConfig.btnHoverText) r.setProperty("--btn-hover-text", parsedConfig.btnHoverText);
      } catch (e) {
        console.error("Error al leer config en /terminos:", e);
      }
    }
  }, []);

  // 3. FUNCIONES DE LOGIN (Copiadas de tu referencia para que funcione el formulario)
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

  // ====== TEXTOS ======
  const tituloPagina = footerCfg?.terminosTitulo || "Términos y Condiciones";
  const intro = footerCfg?.terminosSubtitulo || "Al utilizar nuestros servicios, aceptas los siguientes términos y condiciones. Por favor, léelos detenidamente.";

  const secciones = Array.isArray(footerCfg?.terminosSecciones) && footerCfg.terminosSecciones.length
      ? footerCfg.terminosSecciones
      : [
          {
            id: "que-son",
            titulo: "¿Qué son los Términos y Condiciones?",
            contenido: "Los términos y condiciones, en adelante, “T&C”, regulan el acceso y uso de nuestro sitio web...",
          },
          {
            id: "uso",
            titulo: "Autorización de uso",
            contenido: "Nuestro sitio es un conjunto de softwares que puedes usar para visitar, comparar y adquirir...",
          },
          {
            id: "leyes",
            titulo: "¿Qué leyes se aplican?",
            contenido: "Las compras realizadas en el sitio, el uso que de él hagas y la aplicación de estos T&C...",
          },
          {
            id: "comunicaciones",
            titulo: "Comunicaciones",
            contenido: "Las comunicaciones promocionales o publicitarias que te enviemos tendrán nuestra identidad...",
          },
        ];

  const instagramLink = footerCfg?.instagramLink || "https://www.instagram.com/blitz.hardware?igsh=b29mcW00OGthcnM3";

  // Renderizado condicional si no ha cargado config (opcional, puedes quitarlo si prefieres valores por defecto)
  // if (!config || !footerCfg) return <div>Loading...</div>; 
  // NOTA: Comenté la linea de arriba para que no se quede cargando infinito si localStorage está vacío.

  return (
    <main className="min-h-screen">
      
      {/* Estilos globales */}
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

            {/* SOLO ADMIN VE EL BOTÓN (Ahora sí funcionará porque 'user' existe) */}
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

      {/* CONTENIDO TÉRMINOS */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
          {tituloPagina}
        </h1>

        <p className="text-lg text-gray-600 mb-8">{intro}</p>

        {secciones.map((sec) => (
          <section key={sec.id || sec.titulo} className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              {sec.titulo}
            </h2>
            <p className="text-lg text-gray-600 whitespace-pre-line">{sec.contenido}</p>
          </section>
        ))}

        <div className="text-center mt-6">
          <Link href="/" className="btn-primary px-6 py-3 text-white rounded">
            Volver al Inicio
          </Link>
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ backgroundColor: config?.colorFooter || "#ffffff" }} className="text-black mt-16">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Ayuda */}
          <div>
            <h4 className="text-xl font-semibold mb-4 border-l-4 border-blue-300 pl-3">Ayuda</h4>
            <ul className="space-y-2 text-black">
              <li><Link href="/ayuda" className="hover:text-teal-300">Centro de ayuda</Link></li>
              <li><Link href="/seguimiento" className="hover:text-teal-300">Seguimiento de mi compra</Link></li>
            </ul>
          </div>

          {/* Nosotros */}
          <div>
            <h4 className="text-xl font-semibold mb-4 border-l-4 border-blue-300 pl-3">Nosotros</h4>
            <ul className="space-y-2 text-black">
              <li><Link href="/quienes_somos" className="hover:text-teal-300">Quiénes somos</Link></li>
              <li><Link href="/terminos" className="hover:text-teal-300">Términos y Condiciones</Link></li>
            </ul>
          </div>

          {/* Comunidad */}
          <div>
            <h4 className="text-xl font-semibold mb-4 border-l-4 border-blue-300 pl-3">Comunidad Blitz</h4>
            <ul className="space-y-2 text-black">
              <li>
                <a href={instagramLink} target="_blank" rel="noreferrer" className="hover:text-teal-300">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="bg-black/30 text-center text-xs text-black-300 py-3">
          {footerCfg?.footerLegal || "© 2025 | Desarrollado por el equipo Blitz Hardware"}
        </div>
      </footer>
    </main>
  );
}