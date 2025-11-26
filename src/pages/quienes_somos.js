import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function QuienesSomos() {
  const [loginOpen, setLoginOpen] = useState(false);

  const [config, setConfig] = useState(null);
  const [footerCfg, setFooterCfg] = useState(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const savedConfig = localStorage.getItem("config");
    if (savedConfig) setConfig(JSON.parse(savedConfig));

    const savedFooter = localStorage.getItem("configFooter");
    if (savedFooter) setFooterCfg(JSON.parse(savedFooter));
  }, []);

  const titulo = footerCfg?.quienesTitulo || "Quiénes somos";
  const subtitulo = footerCfg?.quienesSubtitulo || "";
  const contenido = footerCfg?.quienesContenido || "";
  const brandImages = footerCfg?.brandImages || [];

  return (
    <main
      className="flex flex-col min-h-screen"
      style={{
        backgroundColor: config?.colorFondo || "#fff",
        backgroundImage: config?.fondoImagen ? `url(${config.fondoImagen})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >

      {/* NAVBAR */}
      <nav
        className="shadow sticky top-0 z-50"
        style={{ backgroundColor: config?.colorHeader || "#fff" }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <Link href="/">
            <img src="/images/blitz.png" alt="Blitz Logo" className="h-20" />
          </Link>

          <div className="flex items-center space-x-6">
            <Link href="/">Inicio</Link>
            <Link href="/catalogo">Catálogo</Link>
            <Link href="/carrito">
              <img src="/images/carrito.png" className="h-10" />
            </Link>
            <button onClick={() => setLoginOpen(true)}>Iniciar sesión</button>
          </div>
        </div>
      </nav>

      {/* CONTENIDO */}
      <div className="max-w-7xl mx-auto px-6 py-12">

        <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg mb-12">
          <h1 className="text-4xl font-bold text-center mb-4">{titulo}</h1>
          <p className="text-lg text-gray-600 mb-4 text-center">{subtitulo}</p>
          <p className="text-lg text-gray-700 whitespace-pre-line">{contenido}</p>
        </div>
      </div>

      {/* FOOTER */}
      <footer
        className="text-black mt-auto relative z-10 shadow-[0_-5px_15px_rgba(0,0,0,0.05)]"
        style={{ backgroundColor: config?.colorFooter || "#FFD700" }}
      >
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm md:text-base">

          {/* Ayuda */}
          <div>
            <h4 className="text-lg font-bold mb-4 uppercase tracking-wide text-gray-800 border-b-2 border-blue-200 inline-block pb-1">
              Ayuda
            </h4>
            <ul className="space-y-3 text-gray-600">
              <li>
                <Link href="/ayuda" className="hover:text-[var(--color-primary)] transition">
                  Centro de ayuda
                </Link>
              </li>
              <li>
                <Link href="/seguimiento" className="hover:text-[var(--color-primary)] transition">
                  Seguimiento de mi compra
                </Link>
              </li>
            </ul>
          </div>

          {/* Nosotros */}
          <div>
            <h4 className="text-lg font-bold mb-4 uppercase tracking-wide text-gray-800 border-b-2 border-blue-200 inline-block pb-1">
              Nosotros
            </h4>
            <ul className="space-y-3 text-gray-600">
              <li>
                <Link href="/quienes_somos" className="hover:text-[var(--color-primary)] transition">
                  Quiénes somos
                </Link>
              </li>
              <li>
                <Link href="/terminos" className="hover:text-[var(--color-primary)] transition">
                  Términos y Condiciones
                </Link>
              </li>
            </ul>
          </div>

          {/* Comunidad */}
          <div>
            <h4 className="text-lg font-bold mb-4 uppercase tracking-wide text-gray-800 border-b-2 border-blue-200 inline-block pb-1">
              Comunidad
            </h4>
            <ul className="space-y-3 text-gray-600">
              <li>
                <a
                  href={footerCfg?.instagramLink || "https://www.instagram.com/blitz.hardware"}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[var(--color-primary)] transition flex items-center gap-2"
                >
                  <span>Instagram</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* LEGAL FOOTER FINAL */}
        <div className="text-center py-3 text-xs">
          {footerCfg?.footerLegal || "© 2024 Mi Tienda — Todos los derechos reservados"}
        </div>

      </footer>

    </main>
  );
}
