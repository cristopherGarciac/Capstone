import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Configuracion() {
  const admin = {
    nombre: 'Admin Cristopher',
    avatar: '/images/admin-avatar.png',
  };

  // 🧠 Estado temporal de configuración
  const [configTemp, setConfigTemp] = useState({
    nombrePagina: 'Mi E-commerce',
    colorHeader: '#afbbcfff',
    colorFooter: '#b4bbd4ff',
    logo: '/images/blitz.png',

    // 🎨 Colores de botones
    btnBg: '#7e22ce',
    btnText: '#ffffff',
    btnBorder: '#7e22ce',
    btnHoverBg: '#6b21a8',
    btnHoverText: '#ffffff',

    // 🖼️ Carrusel
    carrusel: [
      "/images/blitzHardware banner.png",
      "/images/componentes.png",
      "/images/nvidia.png"
    ],

    // 🌈 NUEVO: color de fondo general
    colorFondo: '#ffffff',
    fondoImagen: "",
  });

  // 🧩 Cargar configuración guardada desde localStorage
  useEffect(() => {
    const configLS = JSON.parse(localStorage.getItem('config'));
    if (configLS) setConfigTemp(prev => ({ ...prev, ...configLS }));
  }, []);

  // 🧩 Manejo de cambios en inputs
  const handleInputChange = (e) => {
    setConfigTemp({ ...configTemp, [e.target.name]: e.target.value });
  };

  // 🖼️ Cargar logo desde archivo
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setConfigTemp({ ...configTemp, logo: reader.result });
    reader.readAsDataURL(file);
  };

  // 🖼️ Subir imagen de fondo
  const handleFondoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setConfigTemp(prev => ({ ...prev, fondoImagen: reader.result }));
    reader.readAsDataURL(file);
  };

  // 💾 Guardar configuración en localStorage
  const aplicarCambios = () => {
    localStorage.setItem('config', JSON.stringify(configTemp));
    alert('Configuración guardada ✅');
  };

  // ♻️ Restablecer configuración por defecto
  const resetConfig = () => {
    if (confirm("¿Seguro que deseas restablecer la configuración a los valores por defecto?")) {
      localStorage.removeItem('config');
      window.location.reload();
    }
  };

  // 🎨 Aplicar colores dinámicamente (incluye color de fondo)
  useEffect(() => {
    const r = document.documentElement.style;
    r.setProperty('--color-header', configTemp.colorHeader);
    r.setProperty('--color-footer', configTemp.colorFooter);
    r.setProperty('--btn-bg', configTemp.btnBg);
    r.setProperty('--btn-text', configTemp.btnText);
    r.setProperty('--btn-border', configTemp.btnBorder);
    r.setProperty('--btn-hover-bg', configTemp.btnHoverBg);
    r.setProperty('--btn-hover-text', configTemp.btnHoverText);

    // 🌈 Aplicar el color de fondo general
    if (configTemp.fondoImagen) {
      document.body.style.backgroundImage = `url(${configTemp.fondoImagen})`;
      document.body.style.backgroundSize = 'cover';
      document.body.style.backgroundRepeat = 'no-repeat';
      document.body.style.backgroundPosition = 'center';
    } else {
      document.body.style.backgroundImage = '';
      document.body.style.backgroundColor = configTemp.colorFondo;
    }
  }, [configTemp]);

  return (
    <div className="flex min-h-screen">
      {/* Panel lateral */}
      <div className="w-60 bg-gray-800 text-white flex flex-col p-4 gap-2">
        <h1 className="text-xl font-bold mb-4 text-center">Admin Panel</h1>

        <Link href="admin">
          <button className="py-2 border-b border-gray-700 w-full text-center hover:bg-gray-700">
            Productos
          </button>
        </Link>

        <button className="py-2 border-b border-gray-700 w-full text-center bg-gray-700 cursor-default">
          Configuración
        </button>

        <Link href="usuarios">
          <button className="py-2 border-b border-gray-700 w-full text-center hover:bg-gray-700">
            Usuarios
          </button>
        </Link>

        <Link href="pedidos">
          <button className="py-2 border-b border-gray-700 w-full text-center hover:bg-gray-700">
            Pedidos
          </button>
        </Link>

        <Link href="report">
          <button className="py-2 border-b border-gray-700 w-full text-center hover:bg-gray-700">
            Reportes
          </button>
        </Link>

        <Link href="/" className="mt-auto py-2 px-4 bg-gray-600 rounded text-center hover:bg-gray-500">
          Volver al inicio
        </Link>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col">
        <header className="flex items-center justify-between bg-gray-100 border-b p-4 shadow-sm">
          <h2 className="text-xl font-bold">Configuración</h2>
          <div className="flex items-center gap-3">
            <span className="text-gray-700 font-medium">{admin.nombre}</span>
            <img src={admin.avatar} alt="Avatar" className="w-10 h-10 rounded-full border border-gray-300 object-cover" />
          </div>
        </header>

        <main className="flex-1 p-6 bg-gray-50">
          <h2 className="text-2xl mb-6 font-bold">Configuración General de la Página</h2>

          <div className="flex flex-col gap-4 max-w-md">
            {/* 🏷️ Nombre */}
            <div>
              <label className="block font-medium mb-1">Nombre de la página</label>
              <input
                type="text"
                name="nombrePagina"
                value={configTemp.nombrePagina}
                onChange={handleInputChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* 🎨 Colores Header/Footer/Fondo */}
            <div>
              <label className="block font-medium mb-1">Color de Barra</label>
              <input
                type="color"
                name="colorHeader"
                value={configTemp.colorHeader}
                onChange={handleInputChange}
                className="w-20 h-10 border rounded cursor-pointer"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Color del Pie de Página</label>
              <input
                type="color"
                name="colorFooter"
                value={configTemp.colorFooter}
                onChange={handleInputChange}
                className="w-20 h-10 border rounded cursor-pointer"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Color de Fondo de la Página</label>
              <input
                type="color"
                name="colorFondo"
                value={configTemp.colorFondo}
                onChange={handleInputChange}
                className="w-20 h-10 border rounded cursor-pointer"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Imagen de Fondo</label>
              <label className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600">
                Seleccionar Imagen
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleFondoUpload} 
                  className="hidden" />
              </label>
              {configTemp.fondoImagen && (
                <img src={configTemp.fondoImagen} alt="Fondo" className="w-40 h-40 object-cover mt-2 border rounded" />
              )}
            </div>

            {/* 🟢 Colores de Botones */}
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Colores de Botones</h3>
              <div className="grid grid-cols-2 gap-3">
                <label className="text-sm">Fondo</label>
                <input type="color" name="btnBg" value={configTemp.btnBg} onChange={handleInputChange} className="w-20 h-10 border rounded cursor-pointer" />

                <label className="text-sm">Texto</label>
                <input type="color" name="btnText" value={configTemp.btnText} onChange={handleInputChange} className="w-20 h-10 border rounded cursor-pointer" />

                <label className="text-sm">Borde</label>
                <input type="color" name="btnBorder" value={configTemp.btnBorder} onChange={handleInputChange} className="w-20 h-10 border rounded cursor-pointer" />

                <label className="text-sm">Hover Fondo</label>
                <input type="color" name="btnHoverBg" value={configTemp.btnHoverBg} onChange={handleInputChange} className="w-20 h-10 border rounded cursor-pointer" />

                <label className="text-sm">Hover Texto</label>
                <input type="color" name="btnHoverText" value={configTemp.btnHoverText} onChange={handleInputChange} className="w-20 h-10 border rounded cursor-pointer" />
              </div>
            </div>

            {/* 🖼️ Logo */}
            <div>
              <label className="block font-medium mb-2">Logo de la página</label>
              <label className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600">
                Seleccionar Imagen
                <input type="file" onChange={handleLogoUpload} className="hidden" />
              </label>
              {configTemp.logo && <img src={configTemp.logo} alt="Logo" className="w-32 h-32 object-contain mt-2" />}
            </div>

            {/* 🖼️ Carrusel */}
            <div className="mt-6">
              <h3 className="font-semibold mb-2">Imágenes del Carrusel</h3>
              <label className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600">
                Agregar imagen
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (!file) return;
                    const reader = new FileReader();
                    reader.onload = () => {
                      setConfigTemp((prev) => ({
                        ...prev,
                        carrusel: [...prev.carrusel, reader.result],
                      }));
                    };
                    reader.readAsDataURL(file);
                  }}
                  className="hidden"
                />
              </label>

              {/* Vista previa del carrusel */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
                {configTemp.carrusel.map((img, idx) => (
                  <div key={idx} className="relative group">
                    <img
                      src={img}
                      alt={`Carrusel ${idx + 1}`}
                      className="w-full h-32 object-cover rounded border"
                    />
                    <button
                      onClick={() =>
                        setConfigTemp((prev) => ({
                          ...prev,
                          carrusel: prev.carrusel.filter((_, i) => i !== idx),
                        }))
                      }
                      className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded opacity-80 hover:opacity-100"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* 🔘 Botones de acción */}
            <div className="flex gap-3 mt-8">
              <button
                onClick={aplicarCambios}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Aplicar Cambios
              </button>

              <button
                onClick={resetConfig}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Restablecer Valores
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}