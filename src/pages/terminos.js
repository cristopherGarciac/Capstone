import { useState, useEffect } from "react";
import Link from "next/link";

export default function Terminos() {
  const [loginOpen, setLoginOpen] = useState(false);

  // 💾 Leemos la configuración del footer (incluye términos, empresa, instagram, etc.)
  const [footerCfg, setFooterCfg] = useState(null);

  // 💾 Leemos la configuración global (config.js)
  const [config, setConfig] = useState(null);

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

    // Cargar configuraciones generales del sitio (config.js)
    const savedConfig = localStorage.getItem("config");
    if (savedConfig) {
      try {
        setConfig(JSON.parse(savedConfig));
      } catch (e) {
        console.error("Error al leer config en /terminos:", e);
      }
    }
  }, []);

  // ====== TEXTOS: usamos configFooter si existe, si no, los de siempre ======
  const tituloPagina =
    footerCfg?.terminosTitulo || "Términos y Condiciones";  // El título solo debe venir de configFooter

  const intro =
    footerCfg?.terminosSubtitulo ||
    "Al utilizar nuestros servicios, aceptas los siguientes términos y condiciones. Por favor, léelos detenidamente.";

  const secciones =
    Array.isArray(footerCfg?.terminosSecciones) && footerCfg.terminosSecciones.length
      ? footerCfg.terminosSecciones
      : [
          {
            id: "que-son",
            titulo: "¿Qué son los Términos y Condiciones?",
            contenido:
              "Los términos y condiciones, en adelante, “T&C”, regulan el acceso y uso de nuestro sitio web. Al acceder y usar este sitio, aceptas estos T&C de manera íntegra y sin reservas. Si no estás de acuerdo con estos T&C, te pedimos no usar el sitio, ya que al navegar en él se entiende que los conoces y aceptas.",
          },
          {
            id: "uso",
            titulo: "Autorización de uso",
            contenido:
              "Nuestro sitio es un conjunto de softwares que puedes usar para visitar, comparar y adquirir los productos y servicios que ofrecemos. Lo que no puedes hacer es intervenirlos, copiarlos ni distribuirlos sin autorización. La sola visita al sitio no te impone obligación alguna, a menos que expreses tu voluntad de adquirir uno o más bienes o servicios.",
          },
          {
            id: "leyes",
            titulo: "¿Qué leyes se aplican?",
            contenido:
              "Las compras realizadas en el sitio, el uso que de él hagas y la aplicación de estos T&C están sujetos a las leyes chilenas, especialmente a las normas que protegen los derechos de los consumidores.",
          },
          {
            id: "comunicaciones",
            titulo: "Comunicaciones",
            contenido:
              "Las comunicaciones promocionales o publicitarias que te enviemos tendrán nuestra identidad como remitente y en el asunto detallarán a qué se refieren. Además, incluirán un vínculo para que, si lo deseas, puedas solicitar la cancelación de futuros envíos a ese correo electrónico.",
          },
        ];

  const instagramLink =
    footerCfg?.instagramLink ||
    "https://www.instagram.com/blitz.hardware?igsh=b29mcW00OGthcnM3"; // Link de Instagram configurable

  if (!config || !footerCfg) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      {/* Navbar */}
      <nav style={{ backgroundColor: config.colorHeader }} className="bg-white shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-[var(--color-primary)]">
            <img src={config.logo} alt="Blitz Hardware Logo" className="h-20 w-auto" />
          </Link>

          <div className="flex items-center space-x-6">
            <Link href="/" className="text-gray-700 hover:text-[var(--color-accent)]">
              Inicio
            </Link>
            <Link href="/catalogo" className="text-gray-700 hover:text-[var(--color-accent)]">
              Catálogo
            </Link>
            <Link href="/carrito" className="text-gray-700 hover:text-[var(--color-accent)]">
              <img
                src="/images/carrito.png"
                alt="Carrito Compra Logo"
                className="h-11 w-auto"
              />
            </Link>

            {/* Botón login */}
            <button
              onClick={() => setLoginOpen(true)}
              className="text-gray-700 hover:text-[var(--color-accent)] flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5.121 17.804A9.001 9.001 0 0112 15a9.001 9.001 0 016.879 2.804M12 11a4 4 0 100-8 4 4 0 000 8z"
                />
              </svg>
              Iniciar sesión
            </button>
          </div>
        </div>
      </nav>

      {/* Modal de login */}
      {loginOpen && (
        <div
          className="fixed inset-0 bg-black flex justify-center items-start pt-24 z-50"
          style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
        >
          <div className="bg-white rounded-xl shadow-lg w-96 p-6 relative">
            <button
              onClick={() => setLoginOpen(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold text-[var(--color-secondary)] mb-4 text-center">
              Iniciar Sesión
            </h2>
            <form className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="Correo electrónico"
                className="border p-2 rounded"
              />
              <input
                type="password"
                placeholder="Contraseña"
                className="border p-2 rounded"
              />
              <button type="submit" className="btn-primary w-full">
                Iniciar Sesión
              </button>
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

      {/* Contenido de los términos y condiciones */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-center text-[var(--color-secondary)] mb-6">
          {tituloPagina}
        </h1>

        <p className="text-lg text-gray-600 mb-8">{intro}</p>

        {secciones.map((sec) => (
          <section key={sec.id || sec.titulo} className="mb-8">
            <h2 className="text-2xl font-semibold text-[var(--color-secondary)] mb-4">
              {sec.titulo}
            </h2>
            <p className="text-lg text-gray-600 whitespace-pre-line">{sec.contenido}</p>
          </section>
        ))}

        <div className="text-center mt-6">
          <Link href="/" className="btn-primary px-6 py-3 text-white">
            Volver al Inicio
          </Link>
        </div>
      </div>

      {/* ==== FOOTER ==== */}
      <footer style={{ backgroundColor: config.colorFooter }} className="text-black mt-16">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Ayuda */}
          <div>
            <h4 className="text-xl font-semibold mb-4 border-l-4 border-blue-300 pl-3">
              Ayuda
            </h4>
            <ul className="space-y-2 text-black">
              <li>
                <Link href="/ayuda" className="hover:text-teal-300">
                  Centro de ayuda
                </Link>
              </li>
              <li>
                <Link href="/seguimiento" className="hover:text-teal-300">
                  Seguimiento de mi compra
                </Link>
              </li>
            </ul>
          </div>

          {/* Nosotros */}
          <div>
            <h4 className="text-xl font-semibold mb-4 border-l-4 border-blue-300 pl-3">
              Nosotros
            </h4>
            <ul className="space-y-2 text-black">
              <li>
                <Link href="/quienes_somos" className="hover:text-teal-300">
                  Quiénes somos
                </Link>
              </li>
              <li>
                <Link href="/terminos" className="hover:text-teal-300">
                  Términos y Condiciones
                </Link>
              </li>
            </ul>
          </div>

          {/* Comunidad */}
          <div>
            <h4 className="text-xl font-semibold mb-4 border-l-4 border-blue-300 pl-3">
              Comunidad Blitz
            </h4>
            <ul className="space-y-2 text-black">
              <li>
                <a
                  href={instagramLink}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-teal-300"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Barra inferior */}
        <div className="bg-black/30 text-center text-xs text-black-300 py-3">
          {footerCfg?.footerLegal || "© 2025–2025 | Desarrollado por el equipo Blitz Hardware"}
        </div>
      </footer>
    </div>
  );
}