import { useState, useEffect } from "react";
import Link from "next/link";

export default function ConfigFooter() {
  const admin = { nombre: "Admin Cristopher", avatar: "/images/admin-avatar.png" };

  // Estado para la configuración del footer
  const [configFooter, setConfigFooter] = useState({
    // Quiénes somos
    quienesTitulo: "Quiénes somos",
    quienesSubtitulo: "Conoce la historia de Blitz Hardware",
    quienesContenido: `Blitz Hardware nace con el propósito de acercar el hardware de calidad a todas las personas, sin importar si están armando su primer PC o afinando un equipo profesional.`,

    // Términos y Condiciones
    terminosTitulo: "Términos y Condiciones",
    terminosSubtitulo: "Condiciones generales de uso y compra",
    terminosContenido: `Al utilizar nuestro sitio y realizar una compra, aceptas los términos y condiciones aquí descritos. Te recomendamos leerlos con atención antes de finalizar cualquier pedido.`,

    // Footer Legal
    footerLegal: "© 2025–2025 | Desarrollado por el equipo Blitz Hardware, Proyecto Capstone",

    // Link de Instagram
    instagramLink: "https://www.instagram.com/blitz.hardware",
  });

  // Estado para las imágenes de marcas
  const [brandImages, setBrandImages] = useState([]);

  // Cargar desde localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    const savedConfigFooter = localStorage.getItem("configFooter");
    const savedBrandImages = JSON.parse(localStorage.getItem("brandImages") || "[]");

    if (savedConfigFooter) {
      setConfigFooter(JSON.parse(savedConfigFooter));
    }
    setBrandImages(savedBrandImages);
  }, []);

  // Función para manejar los cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setConfigFooter((prev) => ({ ...prev, [name]: value }));
  };

  // Función para agregar una nueva imagen
  const handleAddImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setBrandImages((prev) => {
        const updatedImages = [...prev, reader.result];
        localStorage.setItem("brandImages", JSON.stringify(updatedImages));
        return updatedImages;
      });
    };
    reader.readAsDataURL(file);
  };

  // Función para eliminar una imagen
  const handleRemoveImage = (index) => {
    const updatedImages = brandImages.filter((_, i) => i !== index);
    setBrandImages(updatedImages);
    localStorage.setItem("brandImages", JSON.stringify(updatedImages));
  };

  // Función para aplicar los cambios
  const aplicarCambios = () => {
    if (typeof window === "undefined") return;
    localStorage.setItem("configFooter", JSON.stringify(configFooter));
    alert("Configuración de footer guardada ✅");
  };

  // Función para restablecer a los valores predeterminados
  const resetConfig = () => {
    if (typeof window === "undefined") return;
    if (confirm("¿Restablecer la configuración de footer a los valores por defecto?")) {
      localStorage.removeItem("configFooter");
      localStorage.removeItem("brandImages");
      window.location.reload();
    }
  };

  // --- RENDERIZADO COMPLETO CON LAYOUT DE ADMIN ---
  return (
    <div className="flex min-h-screen font-sans bg-gray-50">
      
      {/* 1. SIDEBAR (PANEL LATERAL) - Idéntico a admin.js pero con rutas activas ajustadas */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col shadow-xl">
        <div className="p-6 border-b border-gray-800">
             <h1 className="text-2xl font-bold tracking-wider text-center text-blue-400">ADMIN PANEL</h1>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {/* Enlace a Admin principal */}
          <Link href="/admin" className="block py-3 px-4 rounded text-gray-400 hover:bg-gray-800 hover:text-white transition duration-200 flex items-center gap-3">
            📦 Productos
          </Link>
         <Link href="/config" className="block py-3 px-4 rounded text-gray-400 hover:bg-gray-800 hover:text-white transition duration-200 flex items-center gap-3">
            ⚙️ Configuración
          </Link>
          {/* Botón Activo Actual */}
          <button className="w-full text-left py-3 px-4 rounded bg-blue-600 text-white shadow-lg transition duration-200 flex items-center gap-3">
            ⚙️ ConfigFooter
          </button>
          <Link href="/sucursalConfig" className="block py-3 px-4 rounded text-gray-400 hover:bg-gray-800 hover:text-white transition duration-200 flex items-center gap-3">
            🏪 Sucursales
          </Link>
          
          <Link href="/usuarios" className="block py-3 px-4 rounded text-gray-400 hover:bg-gray-800 hover:text-white transition duration-200 flex items-center gap-3">
            👥 Usuarios
          </Link>
          
          <Link href="/pedidos" className="block py-3 px-4 rounded text-gray-400 hover:bg-gray-800 hover:text-white transition duration-200 flex items-center gap-3">
            🛒 Pedidos
          </Link>

          <Link href="/mapausuarios" className="block py-3 px-4 rounded text-gray-400 hover:bg-gray-800 hover:text-white transition duration-200 flex items-center gap-3">
            🗺️ Mapa Usuarios
          </Link>
          
        </nav>

        <div className="p-4 border-t border-gray-800">
            <Link href="/" className="block py-2 px-4 bg-gray-800 text-center rounded text-gray-300 hover:bg-gray-700 hover:text-white transition text-sm">
             ← Volver a la Tienda
            </Link>
        </div>
      </aside>

      {/* 2. CONTENIDO PRINCIPAL */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* HEADER (BARRA SUPERIOR) */}
        <header className="flex items-center justify-between bg-white border-b px-8 py-4 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-800 capitalize">
            Gestión de Sucursales
          </h2>
          
          <div className="flex items-center gap-4">
            <div className="text-right">
                <p className="text-sm font-bold text-gray-800">{admin.nombre}</p>
                
            </div>
            <img
              src={admin.avatar}
              alt="Avatar Admin"
              className="w-12 h-12 rounded-full border-2 border-blue-100 object-cover p-0.5 shadow-sm"
            />
          </div>
        </header>


        <main className="flex-1 p-6 bg-gray-50">
          <h2 className="text-2xl mb-6 font-bold">Configuración de páginas informativas (footer)</h2>

          <div className="flex flex-col gap-8 max-w-5xl">

            {/* Quiénes somos */}
            <section className="bg-white rounded-lg shadow p-5 border">
              <h3 className="text-xl font-semibold mb-4">Página: Quiénes somos</h3>
              <label className="block mb-1 font-medium">Título</label>
              <input name="quienesTitulo" value={configFooter.quienesTitulo} onChange={handleChange} className="w-full p-2 border rounded mb-3" />
              <label className="block mb-1 font-medium">Subtítulo</label>
              <input name="quienesSubtitulo" value={configFooter.quienesSubtitulo} onChange={handleChange} className="w-full p-2 border rounded mb-3" />
              <label className="block mb-1 font-medium">Contenido</label>
              <textarea rows={8} name="quienesContenido" value={configFooter.quienesContenido} onChange={handleChange} className="w-full p-2 border rounded" />
            </section>

            {/* Términos */}
            <section className="bg-white rounded-lg shadow p-5 border">
              <h3 className="text-xl font-semibold mb-4">Página: Términos y Condiciones</h3>
              <label className="block mb-1 font-medium">Título</label>
              <input name="terminosTitulo" value={configFooter.terminosTitulo} onChange={handleChange} className="w-full p-2 border rounded mb-3" />
              <label className="block mb-1 font-medium">Subtítulo</label>
              <input name="terminosSubtitulo" value={configFooter.terminosSubtitulo} onChange={handleChange} className="w-full p-2 border rounded mb-3" />
              <label className="block mb-1 font-medium">Contenido</label>
              <textarea rows={10} name="terminosContenido" value={configFooter.terminosContenido} onChange={handleChange} className="w-full p-2 border rounded" />
            </section>

            {/* Link de Instagram */}
            <section className="bg-white rounded-lg shadow p-5 border">
              <h3 className="text-xl font-semibold mb-4">Redes Sociales (Footer)</h3>
              <label className="block font-medium mb-1">Link de Instagram</label>
              <input type="text" name="instagramLink" value={configFooter.instagramLink} onChange={handleChange} placeholder="https://www.instagram.com/..." className="w-full p-2 border rounded" />
            </section>

            {/* Footer Legal */}
            <section className="bg-white rounded-lg shadow p-5 border">
              <h3 className="text-xl font-semibold mb-4">Texto legal del Footer</h3>
              <textarea name="footerLegal" value={configFooter.footerLegal} onChange={handleChange} rows={3} className="w-full p-2 border rounded" />
            </section>

            {/* Imágenes de marcas */}
            <section className="bg-white rounded-lg shadow p-5 border">
              <h3 className="text-xl font-semibold mb-4">Imágenes de Marcas</h3>
              <input type="file" onChange={handleAddImage} className="mt-2" />
              <div className="flex justify-center flex-wrap gap-4 mt-4">
                {brandImages.map((img, idx) => (
                  <div key={idx} className="relative">
                    <img src={img} alt={`Marca ${idx}`} className="h-16 object-contain" />
                    <button onClick={() => handleRemoveImage(idx)} className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1">
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </section>

            <div className="flex gap-3">
              <button onClick={aplicarCambios} className="px-4 py-2 bg-green-500 text-white rounded">Aplicar Cambios</button>
              <button onClick={resetConfig} className="px-4 py-2 bg-red-500 text-white rounded">Restablecer Valores</button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}