import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function QuienesSomos() {
  const [loginOpen, setLoginOpen] = useState(false);

  // 💾 Leemos la configuración del navbar, footer y los textos desde localStorage
  const [config, setConfig] = useState(null); // Configuración general (navbar, colores)
  const [footerCfg, setFooterCfg] = useState(null); // Configuración específica del footer (textos, imágenes)

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Cargar la configuración general del config.js
    const savedConfig = localStorage.getItem("config");
    if (savedConfig) {
      setConfig(JSON.parse(savedConfig));
    }

    // Cargar la configuración del footer (configFooter)
    const savedFooterCfg = localStorage.getItem("configFooter");
    if (savedFooterCfg) {
      setFooterCfg(JSON.parse(savedFooterCfg));
    }
  }, []);

  // 📝 Asignación de los textos de la página, que se configurarán desde el admin
  const quienesTitulo = footerCfg?.quienesTitulo || "¿Quiénes somos?";
  const quienesSubtitulo = footerCfg?.quienesSubtitulo || "Conoce la historia de Blitz Hardware";
  const quienesContenido = footerCfg?.quienesContenido || `Blitz Hardware nace con el propósito de acercar el hardware de calidad a todas las personas, sin importar si están armando su primer PC o afinando un equipo profesional.`;

  // 🖼️ Cargar las imágenes de las marcas desde la configuración del footer
  const brandImages = footerCfg?.brandImages || []; // Imagenes de marcas configuradas por el admin

  return (
    <div className="min-h-screen" style={{ backgroundColor: config?.colorFondo || "#ffffff" }}>
      {/* Navbar */}
      <nav className="shadow sticky top-0 z-50" style={{ backgroundColor: config?.colorHeader || "#ffffff" }}>
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-[var(--color-primary)]">
            <img src="/images/blitz.png" alt="Blitz Hardware Logo" className="h-20 w-auto" />
          </Link>

          <div className="flex items-center space-x-6">
            <Link href="/" className="text-gray-700 hover:text-[var(--color-accent)]">Inicio</Link>
            <Link href="/catalogo" className="text-gray-700 hover:text-[var(--color-accent)]">Catálogo</Link>
            <Link href="/carrito" className="text-gray-700 hover:text-[var(--color-accent)]">
              <img src="/images/carrito.png" alt="Carrito Compra Logo" className="h-11 w-auto"/>
            </Link>

            {/* Botón login */}
            <button onClick={() => setLoginOpen(true)} className="text-gray-700 hover:text-[var(--color-accent)] flex items-center">
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
        <div className="fixed inset-0 bg-black flex justify-center items-start pt-24 z-50" style={{ backgroundColor: "rgba(0,0,0,0.3)" }}>
          <div className="bg-white rounded-xl shadow-lg w-96 p-6 relative">
            <button onClick={() => setLoginOpen(false)} className="absolute top-2 right-2 text-gray-400 hover:text-gray-600">✕</button>
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
                <Link href="/register" className="text-blue-600 hover:underline">Regístrate</Link>
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Contenido de la página */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-center text-[var(--color-secondary)] mb-6">
          {quienesTitulo}
        </h1>

        <p className="text-lg text-gray-600 mb-8">{quienesSubtitulo}</p>
        <p className="text-lg text-gray-600 mb-8">{quienesContenido}</p>

        {/* Logos de las empresas colaboradoras */}
        <div className="bg-transparent py-12">
          <h2 className="text-3xl font-bold text-center text-[var(--color-secondary)] mb-8">
            Empresas que Confían en Nosotros
          </h2>
          <div className="flex justify-center space-x-12">
            {brandImages.map((img, idx) => (
              <Image key={idx} src={img} alt={`Marca ${idx}`} width={100} height={100} className="h-16 object-contain mx-auto" />
            ))}
          </div>
        </div>

        <div className="text-center mt-8">
          <Link href="/" className="btn-primary px-6 py-3 text-white">Volver al Inicio</Link>
        </div>
      </div>

      {/* ==== FOOTER ==== */}
      <footer className="bg-[#FFD700] text-black mt-16" style={{ backgroundColor: config?.colorFooter || "#FFD700" }}>
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
              <li><a href={footerCfg?.instagramLink || "https://www.instagram.com/blitz.hardware"} target="_blank" className="hover:text-teal-300">Instagram</a></li>
            </ul>
          </div>
        </div>

        <hr className="border-white/10" />

        <div className="bg-black/30 text-center text-xs text-white-300 py-3">
          {footerCfg?.footerLegal || "© 2025–2025 | Desarrollado por Cristopher Garcia, Jesus Lagos e Ignacio Varas, Proyecto Capstone"}
        </div>
      </footer>
    </div>
  );
}