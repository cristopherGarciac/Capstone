import { useState, useEffect } from "react";
import Link from "next/link";

// Configuración por defecto (Arranca vacía)
const DEFAULT_CONFIG = {
  HAS_STORE_PICKUP: true,
  STORE_LOCATIONS: [], 
  SHIPPING_OPTIONS: {
    STORE_PICKUP: { name: "Retiro en Tiendas", cost: 0 },
    HOME_DELIVERY: { name: "Despacho a domicilio", cost: 3500 },
  },
};

export default function SucursalConfig() {
  // --- DATOS DEL ADMIN PARA EL HEADER ---
  const admin = {
    nombre: 'Admin Cristopher',
    avatar: 'https://ui-avatars.com/api/?name=Admin+Cristopher&background=0D8ABC&color=fff',
  };

  // --- ESTADOS ---
  const [config, setConfig] = useState(DEFAULT_CONFIG);
  const [newStoreName, setNewStoreName] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [mensaje, setMensaje] = useState("");
  
  // Estado para controlar que no se guarde nada hasta haber cargado los datos previos
  const [initialLoadDone, setInitialLoadDone] = useState(false);

  // 1. CARGAR CONFIGURACIÓN AL INICIO (Solo una vez)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem("store_settings");
      if (saved) {
        try {
          setConfig(JSON.parse(saved));
        } catch (e) {
          console.error("Error al leer configuración local", e);
        }
      }
      // Marcar como cargado para habilitar el guardado
      setInitialLoadDone(true);
    }
  }, []);

  // 2. GUARDAR AUTOMÁTICAMENTE (Solo si ya terminó la carga inicial)
  useEffect(() => {
    if (initialLoadDone && typeof window !== 'undefined') {
      localStorage.setItem("store_settings", JSON.stringify(config));
    }
  }, [config, initialLoadDone]);

  // --- HANDLERS ---

  const togglePickup = () => {
    setConfig((prev) => ({ ...prev, HAS_STORE_PICKUP: !prev.HAS_STORE_PICKUP }));
  };

  const addStore = (e) => {
    e.preventDefault();
    if (!newStoreName.trim()) return;

    const newStore = {
      id: `sucursal-${Date.now()}`,
      name: newStoreName,
    };

    setConfig((prev) => ({
      ...prev,
      STORE_LOCATIONS: [...prev.STORE_LOCATIONS, newStore],
    }));
    setNewStoreName("");
    mostrarMensaje("Sucursal agregada correctamente.");
  };

  const deleteStore = (id) => {
    if(!window.confirm("¿Seguro que deseas eliminar esta sucursal?")) return;
    
    setConfig((prev) => ({
      ...prev,
      STORE_LOCATIONS: prev.STORE_LOCATIONS.filter((s) => s.id !== id),
    }));
    mostrarMensaje("Sucursal eliminada.");
  };

  const startEdit = (store) => {
    setEditingId(store.id);
    setEditName(store.name);
  };

  const saveEdit = (id) => {
    setConfig((prev) => ({
      ...prev,
      STORE_LOCATIONS: prev.STORE_LOCATIONS.map((s) => 
        s.id === id ? { ...s, name: editName } : s
      ),
    }));
    setEditingId(null);
    setEditName("");
    mostrarMensaje("Nombre actualizado.");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName("");
  };

  const mostrarMensaje = (txt) => {
    setMensaje(txt);
    setTimeout(() => setMensaje(""), 3000);
  };

  // --- RENDERIZADO ---
  return (
    <div className="flex min-h-screen font-sans bg-gray-50">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col shadow-xl">
        <div className="p-6 border-b border-gray-800">
             <h1 className="text-2xl font-bold tracking-wider text-center text-blue-400">ADMIN PANEL</h1>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin" className="block py-3 px-4 rounded text-gray-400 hover:bg-gray-800 hover:text-white transition duration-200 flex items-center gap-3">
            📦 Productos
          </Link>
          
          <Link href="/config" className="block py-3 px-4 rounded text-gray-400 hover:bg-gray-800 hover:text-white transition duration-200 flex items-center gap-3">
            ⚙️ Configuración
          </Link>
          <Link href="/configfooter" className="block py-3 px-4 rounded text-gray-400 hover:bg-gray-800 hover:text-white transition duration-200 flex items-center gap-3">
            ⚙️ ConfigFooter
          </Link>
          
          <button className="w-full text-left py-3 px-4 rounded bg-blue-600 text-white shadow-lg transition duration-200 flex items-center gap-3">
            🏪 Sucursales
          </button>
          
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

      {/* CONTENIDO PRINCIPAL */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* HEADER */}
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

        {/* MAIN */}
        <main className="flex-1 overflow-y-auto p-8 bg-gray-50">
            
            {mensaje && (
              <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg border border-green-300 shadow-sm flex items-center">
                <span className="text-xl mr-2">✅</span> {mensaje}
              </div>
            )}

            <div className="max-w-4xl mx-auto space-y-8">
                
                {/* 1. HABILITAR/DESHABILITAR RETIRO */}
                <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">Habilitar "Retiro en Tienda"</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Si desactivas esta opción, los clientes solo verán "Despacho a Domicilio".
                      </p>
                    </div>
                    
                    <button
                      onClick={togglePickup}
                      className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                        config.HAS_STORE_PICKUP ? "bg-green-500" : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`inline-block h-6 w-6 transform rounded-full bg-white shadow transition-transform ${
                          config.HAS_STORE_PICKUP ? "translate-x-7" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                </section>

                {/* 2. GESTIÓN DE SUCURSALES */}
                <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <h2 className="text-xl font-bold mb-6 text-gray-800 border-b pb-2">Listado de Sucursales</h2>
                  
                  {/* Formulario */}
                  <form onSubmit={addStore} className="flex gap-4 mb-8 bg-gray-50 p-4 rounded-lg">
                    <input
                      type="text"
                      value={newStoreName}
                      onChange={(e) => setNewStoreName(e.target.value)}
                      placeholder="Nombre de la nueva sucursal..."
                      className="flex-1 border border-gray-300 p-3 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    <button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md transition shadow-sm"
                    >
                      + Agregar
                    </button>
                  </form>

                  {/* Lista */}
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    {config.STORE_LOCATIONS.length === 0 ? (
                      <div className="p-10 text-center flex flex-col items-center justify-center text-gray-400">
                        <span className="text-4xl mb-2">🏢</span>
                        <p className="italic">No hay sucursales registradas.</p>
                      </div>
                    ) : (
                      <ul className="divide-y divide-gray-200">
                        {config.STORE_LOCATIONS.map((store) => (
                          <li
                            key={store.id}
                            className="flex items-center justify-between p-4 hover:bg-gray-50 transition duration-150"
                          >
                            {editingId === store.id ? (
                              // MODO EDICIÓN
                              <div className="flex items-center flex-1 gap-3 animate-fadeIn">
                                <input
                                  type="text"
                                  value={editName}
                                  onChange={(e) => setEditName(e.target.value)}
                                  className="flex-1 border border-blue-300 p-2 rounded focus:ring-2 focus:ring-blue-200 outline-none"
                                  autoFocus
                                />
                                <div className="flex gap-2">
                                    <button onClick={() => saveEdit(store.id)} className="bg-green-100 text-green-700 px-3 py-1 rounded hover:bg-green-200 font-bold text-sm">Guardar</button>
                                    <button onClick={cancelEdit} className="bg-gray-100 text-gray-600 px-3 py-1 rounded hover:bg-gray-200 font-bold text-sm">Cancelar</button>
                                </div>
                              </div>
                            ) : (
                              // MODO VISTA
                              <>
                                <span className="text-gray-800 font-medium text-lg">{store.name}</span>
                                <div className="flex gap-2">
                                  <button onClick={() => startEdit(store)} className="px-3 py-1.5 text-blue-600 hover:bg-blue-50 rounded text-sm font-semibold transition">Editar</button>
                                  <button onClick={() => deleteStore(store.id)} className="px-3 py-1.5 text-red-600 hover:bg-red-50 rounded text-sm font-semibold transition">Eliminar</button>
                                </div>
                              </>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </section>
            </div>

        </main>
      </div>
    </div>
  );
}