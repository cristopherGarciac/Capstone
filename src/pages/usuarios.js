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
    if (res.ok) setUsuarios(prev => prev.filter(u => u.id !== id));
    else alert('Error eliminando usuario');
  };

  const guardarEdicion = async () => {
    if (!editUsuario) return;

    try {
      const res = await fetch('/api/usuarios/edit', {
        method: 'POST',
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

  return (
    <div className="flex min-h-screen">
      {/* Panel lateral */}
      <div className="w-60 bg-gray-800 text-white flex flex-col p-4 gap-2">
        <h1 className="text-xl font-bold mb-4 text-center">Admin Panel</h1>
        <Link href="/admin" className="py-2 border-b border-gray-700 w-full text-center hover:bg-gray-700">Productos</Link>
        <Link href="/config" className="py-2 border-b border-gray-700 w-full text-center hover:bg-gray-700">Configuración</Link>
        <button className="py-2 border-b border-gray-700 w-full text-center bg-gray-700 cursor-default">Usuarios</button>
        <Link href="/pedidos" className="py-2 border-b border-gray-700 w-full text-center hover:bg-gray-700">Pedidos</Link>
        <Link href="/mapausuarios" className="py-2 border-b border-gray-700 w-full text-center hover:bg-gray-700">MapaUsuarios</Link>
        <Link href="/" className="mt-auto py-2 px-4 bg-gray-600 rounded text-center hover:bg-gray-500">Volver al inicio</Link>
      </div>  

      {/* Contenido */}
      <div className="flex-1 flex flex-col">
        <header className="flex items-center justify-between bg-gray-100 border-b p-4 shadow-sm">
          <h2 className="text-xl font-bold">Usuarios</h2>
          <div className="flex items-center gap-3">
            <span className="text-gray-700 font-medium">{admin.nombre}</span>
            <img src={admin.avatar} alt="Avatar" className="w-10 h-10 rounded-full border border-gray-300 object-cover" />
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
