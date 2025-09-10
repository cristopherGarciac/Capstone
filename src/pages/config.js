import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Configuracion() {
  const admin = {
    nombre: 'Admin Cristopher',
    avatar: '/images/admin-avatar.png',
  };

  const [configTemp, setConfigTemp] = useState({
    nombrePagina: 'Mi E-commerce',
    colorHeader: '#afbbcfff',
    colorFooter: '#b4bbd4ff',
    logo: '/images/blitz.png', // Logo predeterminado
  });

  // Cargar configuración guardada en localStorage
  useEffect(() => {
    const configLS = JSON.parse(localStorage.getItem('config'));
    if (configLS) setConfigTemp(configLS);
  }, []);

  const handleInputChange = (e) => {
    setConfigTemp({ ...configTemp, [e.target.name]: e.target.value });
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setConfigTemp({ ...configTemp, logo: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const aplicarCambios = () => {
    localStorage.setItem('config', JSON.stringify(configTemp)); // Guardar configuración
  };

  // Aplicar colores dinámicamente
  useEffect(() => {
    document.documentElement.style.setProperty('--color-header', configTemp.colorHeader);
    document.documentElement.style.setProperty('--color-footer', configTemp.colorFooter);
  }, [configTemp.colorHeader, configTemp.colorFooter]);

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

        {/* Botón activo: Configuración */}
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
        {/* Header */}
        <header className="flex items-center justify-between bg-gray-100 border-b p-4 shadow-sm">
          <h2 className="text-xl font-bold">Configuración</h2>
          <div className="flex items-center gap-3">
            <span className="text-gray-700 font-medium">{admin.nombre}</span>
            <img
              src={admin.avatar}
              alt="Avatar"
              className="w-10 h-10 rounded-full border border-gray-300 object-cover"
            />
          </div>
        </header>

        {/* Contenido */}
        <main className="flex-1 p-6 bg-gray-50">
          <h2 className="text-2xl mb-6 font-bold">Configuración General de la Página</h2>

          <div className="flex flex-col gap-4 max-w-md">
            {/* Nombre de la página */}
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

            {/* Colores */}
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
              <label className="block font-medium mb-1">Color del Pie de Pagina</label>
              <input
                type="color"
                name="colorFooter"
                value={configTemp.colorFooter}
                onChange={handleInputChange}
                className="w-20 h-10 border rounded cursor-pointer"
              />
            </div>

            {/* Logo */}
            <div>
              <label className="block font-medium mb-2">Logo de la página</label>
              <label className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600">
                Seleccionar Imagen
                <input type="file" onChange={handleLogoUpload} className="hidden" />
              </label>
              {configTemp.logo && (
                <img src={configTemp.logo} alt="Logo" className="w-32 h-32 object-contain mt-2" />
              )}
            </div>

            {/* Botón aplicar */}
            <button
              onClick={aplicarCambios}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Aplicar Cambios
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}