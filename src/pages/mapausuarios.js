import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from 'react';
import Link from "next/link";
import L from "leaflet";

// Ícono personalizado
const customIcon = L.icon({
  iconUrl: "/images/mapa.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

export default function MapaUsuarios() {
  const [data, setData] = useState([]);
  const [admin, setAdmin] = useState({ nombre: "Administrador", avatar: "/images/blitz.png" });

  useEffect(() => {
    fetch("/api/admin/mapa-usuarios")
      .then(res => res.json())
      .then(json => setData(json.data || []))
      .catch(() => setData([]));
  }, []);

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
            🎨 Personalizacion
          </Link>
          <Link href="/configfooter" className="block py-3 px-4 rounded text-gray-400 hover:bg-gray-800 hover:text-white transition duration-200 flex items-center gap-3">
            ⚙️ Edicion Paginas/Footer
          </Link>
          <Link href="/sucursalConfig" className="block py-3 px-4 rounded text-gray-400 hover:bg-gray-800 hover:text-white transition duration-200 flex items-center gap-3">
            🏪 Sucursales
          </Link>
          <Link href="/usuarios" className="block py-3 px-4 rounded text-gray-400 hover:bg-gray-800 hover:text-white transition duration-200 flex items-center gap-3">
            👥 Usuarios
          </Link>
          <Link href="/pedidos" className="block py-3 px-4 rounded text-gray-400 hover:bg-gray-800 hover:text-white transition duration-200 flex items-center gap-3">
            🛒 Pedidos
          </Link>
          {/* Botón Activo Actual */}
          <button className="w-full text-left py-3 px-4 rounded bg-blue-600 text-white shadow-lg transition duration-200 flex items-center gap-3">
            🗺️ Mapa Usuarios
          </button>
          
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
            Gestión de usuarios
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


        {/* CONTENIDO: MAPA */}
        <main className="flex-1 p-6 bg-gray-50">
          <div className="rounded-xl overflow-hidden shadow-lg border bg-white">
            <div className="w-full h-[calc(100vh-150px)]">
              <MapContainer center={[-33.45, -70.66]} zoom={12} className="w-full h-full z-0">
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                {data?.map((u) =>
                  u.lat && u.lng ? (
                    <Marker 
                      key={u.usuario_id} 
                      position={[u.lat, u.lng]}
                      icon={customIcon}
                    >
                      <Popup>
                        <strong>{u.usuario?.nombre} {u.usuario?.apellido}</strong><br />
                        {u.comuna}, {u.region}<br />
                        {u.usuario?.email}
                      </Popup>
                    </Marker>
                  ) : null
                )}
              </MapContainer>
            </div>
          </div>
        </main>

      </div>
    </div>
  );
}