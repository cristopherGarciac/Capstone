import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';

export default function Usuarios() {
  const admin = { nombre: 'Admin Cristopher', avatar: '/images/admin-avatar.png' };
  const [usuarios, setUsuarios] = useState([]);
  const [q, setQ] = useState('');
  const [pagina, setPagina] = useState(1);
  const [perPage] = useState(10); 

  const [editUsuario, setEditUsuario] = useState(null);

  // Cargar usuarios
  useEffect(() => {
    const cargarUsuarios = async () => {
      const res = await fetch('/api/usuarios');
      const data = await res.json();
      setUsuarios(data);
    };
    cargarUsuarios();
  }, []);

  const filtered = useMemo(() => {
    return usuarios.filter(u => {
      const nombreCompleto = `${u.nombre || ''} ${u.apellido || ''}`.toLowerCase();
      return (
        nombreCompleto.includes(q.toLowerCase()) ||
        u.email.toLowerCase().includes(q.toLowerCase()) ||
        (u.rut || '').toLowerCase().includes(q.toLowerCase())
      );
    });
  }, [usuarios, q]);

  const paginasTotales = Math.ceil(filtered.length / perPage);
  const currentPageItems = filtered.slice((pagina - 1) * perPage, pagina * perPage);

 const eliminarUsuario = async (id) => {
  if (!confirm('¿Seguro que deseas eliminar este usuario?')) return;

  const res = await fetch('/api/usuarios/delete', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  });

  if (res.ok)
    setUsuarios(prev => prev.filter(u => u.id !== id));
  else
    alert('Error eliminando usuario');
};


  const guardarEdicion = async () => {
    if (!editUsuario) return;

    try {
     const res = await fetch('/api/usuarios/edit', {
  method: 'PUT',   // ← ✔ CORRECTO
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(editUsuario),
});

      if (res.ok) {
        setUsuarios(prev => prev.map(u => (u.id === editUsuario.id ? editUsuario : u)));
        setEditUsuario(null);
      } else {
        alert('Error al actualizar usuario');
      }
    } catch (e) {
      alert('Error al actualizar usuario');
    }
  };

  const avatarDefault = (nombre) => {
    if (!nombre) return '/images/default-user.png';
    const initials = nombre.split(' ').map(n => n[0]).join('').toUpperCase();
    return `https://ui-avatars.com/api/?name=${initials}&background=7e22ce&color=ffffff&rounded=true`;
  };

  const formatoFecha = (fecha) => {
    if (!fecha) return '-';
    return new Date(fecha).toLocaleDateString('es-CL', { day: '2-digit', month: 'short', year: 'numeric' });
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
            🎨 Personalizacion
          </Link>
          <Link href="/configfooter" className="block py-3 px-4 rounded text-gray-400 hover:bg-gray-800 hover:text-white transition duration-200 flex items-center gap-3">
            ⚙️ Edicion Paginas/Footer
          </Link>
          <Link href="/sucursalConfig" className="block py-3 px-4 rounded text-gray-400 hover:bg-gray-800 hover:text-white transition duration-200 flex items-center gap-3">
            🏪 Sucursales
          </Link>
          {/* Botón Activo Actual */}
          <button className="w-full text-left py-3 px-4 rounded bg-blue-600 text-white shadow-lg transition duration-200 flex items-center gap-3">
            👥 Usuarios
          </button>
          
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

        <main className="flex-1 p-6 bg-gray-50">
          <h2 className="text-2xl mb-6 font-bold">Gestión de Usuarios</h2>

          <input
            type="text"
            placeholder="Buscar por nombre, email o RUT"
            value={q}
            onChange={e => setQ(e.target.value)}
            className="p-2 border rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-purple-600"
          />

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200 rounded-lg shadow-sm">
              <thead className="bg-purple-100">
                <tr>
                  <th className="border p-2 text-left">Usuario</th>
                  <th className="border p-2 text-left">Email</th>
                  <th className="border p-2 text-left">Teléfono</th>
                  <th className="border p-2 text-left">RUT</th>
                  <th className="border p-2 text-left">Registro</th>
                  <th className="border p-2 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {currentPageItems.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-4 text-center text-gray-500">No se encontraron usuarios.</td>
                  </tr>
                ) : currentPageItems.map(u => (
                  <tr key={u.id} className="hover:bg-purple-50 transition-colors">
                    <td className="border p-2 flex items-center gap-2">
                      <img src={avatarDefault(u.nombre)} className="w-8 h-8 rounded-full object-cover" />
                      {`${u.nombre || ''} ${u.apellido || ''}`}
                    </td>
                    <td className="border p-2">{u.email}</td>
                    <td className="border p-2">{u.telefono || '-'}</td>
                    <td className="border p-2">{u.rut || '-'}</td>
                    <td className="border p-2">{formatoFecha(u.creado_en)}</td>
                    <td className="border p-2 text-center flex justify-center gap-2">
                      <button onClick={() => setEditUsuario(u)} className="text-purple-600 hover:text-purple-800 font-semibold">Editar</button>
                      <button onClick={() => eliminarUsuario(u.id)} className="text-red-500 hover:text-red-700 font-semibold">Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => setPagina(p => Math.max(1, p - 1))}
              disabled={pagina === 1}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Anterior
            </button>
            <span>Página {pagina} de {paginasTotales}</span>
            <button
              onClick={() => setPagina(p => Math.min(paginasTotales, p + 1))}
              disabled={pagina === paginasTotales}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Siguiente
            </button>
          </div>

          {editUsuario && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded shadow w-full max-w-md">
                <h3 className="text-xl font-bold mb-4">Editar Usuario</h3>
                <input type="text" placeholder="Nombre" value={editUsuario.nombre || ''} onChange={e => setEditUsuario({ ...editUsuario, nombre: e.target.value })} className="border p-2 rounded w-full mb-2" />
                <input type="text" placeholder="Apellido" value={editUsuario.apellido || ''} onChange={e => setEditUsuario({ ...editUsuario, apellido: e.target.value })} className="border p-2 rounded w-full mb-2" />
                <input type="email" placeholder="Email" value={editUsuario.email || ''} onChange={e => setEditUsuario({ ...editUsuario, email: e.target.value })} className="border p-2 rounded w-full mb-2" />
                <input type="text" placeholder="Teléfono" value={editUsuario.telefono || ''} onChange={e => setEditUsuario({ ...editUsuario, telefono: e.target.value })} className="border p-2 rounded w-full mb-4" />

                <div className="flex justify-end gap-2">
                  <button onClick={() => setEditUsuario(null)} className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">Cancelar</button>
                  <button onClick={guardarEdicion} className="px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700">Guardar</button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}