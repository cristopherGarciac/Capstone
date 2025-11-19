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

  return (
    <div className="flex min-h-screen">

      {/* Panel lateral */}
      <div className="w-60 bg-gray-800 text-white flex flex-col p-4 gap-2">
        <h1 className="text-xl font-bold mb-4 text-center">Admin Panel</h1>

        <Link href="/admin" className="py-2 border-b border-gray-700 hover:bg-gray-700 text-center">
          Productos
        </Link>

        <Link href="/config" className="py-2 border-b border-gray-700 hover:bg-gray-700 text-center">
          Configuración
        </Link>

        <Link href="/usuarios" className="py-2 border-b border-gray-700 hover:bg-gray-700 text-center">
          Usuarios
        </Link>

        <Link href="/pedidos" className="py-2 border-b border-gray-700 hover:bg-gray-700 text-center">
          Pedidos
        </Link>

        <Link href="/mapausuarios" className="py-2 border-b border-gray-700 hover:bg-gray-700 text-center bg-gray-700">
          Mapa Usuarios
        </Link>

        <Link href="/" className="mt-auto py-2 px-4 bg-gray-600 rounded text-center hover:bg-gray-500">
          Volver al inicio
        </Link>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col">
        
        {/* HEADER */}
        <header className="flex items-center justify-between bg-gray-100 border-b p-4 shadow-sm">
          <h2 className="text-xl font-bold">Mapa de Usuarios</h2>

          <div className="flex items-center gap-3">
            <span className="text-gray-700 font-medium">{admin.nombre}</span>
            <img
              src={admin.avatar}
              alt="Avatar"
              className="w-10 h-10 rounded-full border border-gray-300 object-cover"
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
