import { useState, useEffect } from "react";
import Link from "next/link";

export default function ConfigFooter() {
  const admin = {
    nombre: "Admin Cristopher",
    avatar: "https://ui-avatars.com/api/?name=Admin+Cristopher&background=0D8ABC&color=fff",
  };

  const defaultState = {
    quienesTitulo: "Quiénes somos",
    quienesSubtitulo: "Conoce la historia de Blitz Hardware",
    quienesContenido:
      "Blitz Hardware nace con el propósito de acercar el hardware de calidad a todas las personas.",
    terminosTitulo: "Términos y Condiciones",
    terminosSubtitulo: "Condiciones generales de uso y compra",
    terminosContenido:
      "Al utilizar nuestro sitio y realizar una compra, aceptas los términos y condiciones aquí descritos.",
    footerLegal:
      "© 2025–2025 | Desarrollado por el equipo Blitz Hardware, Proyecto Capstone",
    instagramLink: "https://www.instagram.com/blitz.hardware",
  };

  const [configFooter, setConfigFooter] = useState(defaultState);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const saved = localStorage.getItem("configFooter");
    if (saved) {
      setConfigFooter((prev) => ({ ...prev, ...JSON.parse(saved) }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setConfigFooter((prev) => ({ ...prev, [name]: value }));
  };

  const aplicarCambios = () => {
    localStorage.setItem("configFooter", JSON.stringify(configFooter));
    mostrarMensaje("Cambios guardados correctamente.");
  };

  const resetConfig = () => {
    if (!confirm("¿Restablecer todo a valores por defecto?")) return;
    localStorage.removeItem("configFooter");
    window.location.reload();
  };

  const mostrarMensaje = (txt) => {
    setMensaje(txt);
    setTimeout(() => setMensaje(""), 2500);
  };

  return (
    <div className="flex min-h-screen font-sans bg-gray-50">

      {/* SIDEBAR NUEVO */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col shadow-xl">
        <div className="p-6 border-b border-gray-800">
          <h1 className="text-2xl font-bold tracking-wider text-center text-blue-400">
            ADMIN PANEL
          </h1>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin" className="block py-3 px-4 rounded text-gray-400 hover:bg-gray-800 hover:text-white transition flex gap-3 items-center">
            📦 Productos
          </Link>

          <Link href="/config" className="block py-3 px-4 rounded text-gray-400 hover:bg-gray-800 hover:text-white transition flex gap-3 items-center">
            🎨 Personalizacion
          </Link>

          <button className="w-full text-left py-3 px-4 rounded bg-blue-600 text-white flex gap-3 items-center shadow">
            ⚙️ Edicion Paginas/Footer
          </button>

          <Link href="/sucursalConfig" className="block py-3 px-4 rounded text-gray-400 hover:bg-gray-800 hover:text-white transition duration-200 flex items-center gap-3">
            🏪 Sucursales
          </Link>

          <Link href="/usuarios" className="block py-3 px-4 rounded text-gray-400 hover:bg-gray-800 hover:text-white transition flex gap-3 items-center">
            👥 Usuarios
          </Link>

          <Link href="/pedidos" className="block py-3 px-4 rounded text-gray-400 hover:bg-gray-800 hover:text-white transition flex gap-3 items-center">
            🛒 Pedidos
          </Link>

          <Link href="/mapausuarios" className="block py-3 px-4 rounded text-gray-400 hover:bg-gray-800 hover:text-white transition flex gap-3 items-center">
            🗺️ Mapa Usuarios
          </Link>
        </nav>

        <div className="p-4 border-t border-gray-800">
          <Link
            href="/"
            className="block py-2 px-4 bg-gray-800 text-center rounded text-gray-300 hover:bg-gray-700 hover:text-white transition text-sm"
          >
            ← Volver a la Tienda
          </Link>
        </div>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* HEADER NUEVO */}
        <header className="flex items-center justify-between bg-white border-b px-8 py-4 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-800">
            Configuración de Contenido
          </h2>

          <div className="flex items-center gap-4">
            <p className="text-sm font-bold text-gray-800">{admin.nombre}</p>

            <img
              src={admin.avatar}
              alt="Avatar"
              className="w-12 h-12 rounded-full border-2 border-purple-200 object-cover p-0.5 shadow"
            />
          </div>
        </header>

        {/* MENSAJE */}
        {mensaje && (
          <div className="mx-8 mt-6 p-4 bg-green-100 text-green-800 rounded border border-green-300">
            {mensaje}
          </div>
        )}

        {/* MAIN */}
        <main className="flex-1 overflow-y-auto p-8 bg-gray-50">
          <div className="max-w-4xl mx-auto space-y-8">

            {/* QUIENES SOMOS */}
            <section className="bg-white p-6 rounded-xl shadow border border-gray-200">
              <h3 className="text-lg font-bold mb-4 border-b pb-2">
                Página: Quiénes Somos
              </h3>

              <input
                name="quienesTitulo"
                value={configFooter.quienesTitulo}
                onChange={handleChange}
                className="w-full p-3 border rounded mb-3"
              />

              <input
                name="quienesSubtitulo"
                value={configFooter.quienesSubtitulo}
                onChange={handleChange}
                className="w-full p-3 border rounded mb-3"
              />

              <textarea
                name="quienesContenido"
                value={configFooter.quienesContenido}
                onChange={handleChange}
                rows={6}
                className="w-full p-3 border rounded"
              ></textarea>
            </section>

            {/* TERMINOS */}
            <section className="bg-white p-6 rounded-xl shadow border border-gray-200">
              <h3 className="text-lg font-bold mb-4 border-b pb-2">
                Términos & Condiciones
              </h3>

              <input
                name="terminosTitulo"
                value={configFooter.terminosTitulo}
                onChange={handleChange}
                className="w-full p-3 border rounded mb-3"
              />

              <input
                name="terminosSubtitulo"
                value={configFooter.terminosSubtitulo}
                onChange={handleChange}
                className="w-full p-3 border rounded mb-3"
              />

              <textarea
                name="terminosContenido"
                value={configFooter.terminosContenido}
                onChange={handleChange}
                rows={6}
                className="w-full p-3 border rounded"
              ></textarea>
            </section>

            {/* FOOTER */}
            <section className="bg-white p-6 rounded-xl shadow border border-gray-200">
              <h3 className="text-lg font-bold mb-4 border-b pb-2">
                Footer Global
              </h3>

              <input
                name="instagramLink"
                value={configFooter.instagramLink}
                onChange={handleChange}
                className="w-full p-3 border rounded mb-3"
                placeholder="Instagram"
              />

              <textarea
                name="footerLegal"
                value={configFooter.footerLegal}
                onChange={handleChange}
                rows={3}
                className="w-full p-3 border rounded"
              ></textarea>
            </section>

            {/* BOTONES */}
            <div className="flex justify-end gap-4">
              <button
                onClick={resetConfig}
                className="px-6 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Restablecer
              </button>

              <button
                onClick={aplicarCambios}
                className="px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
              >
                Guardar Todo
              </button>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
