import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';

// Helper para formato de moneda chilena
const precioCLP = (v) => {
  const valor = Number(v);
  return isNaN(valor)
    ? '$0'
    : Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(valor);
};

// Helper para colores de estado
const getStatusColor = (status) => {
  const s = (status || '').toLowerCase();
  if (s === 'pendiente' || s === 'creado') return 'bg-yellow-100 text-yellow-800 border-yellow-200';
  if (s === 'pagado') return 'bg-blue-100 text-blue-800 border-blue-200';
  if (s === 'enviado') return 'bg-purple-100 text-purple-800 border-purple-200';
  if (s === 'entregado') return 'bg-green-100 text-green-800 border-green-200';
  if (s === 'cancelado') return 'bg-red-100 text-red-800 border-red-200';
  return 'bg-gray-100 text-gray-800 border-gray-200';
};

export default function Pedidos() {
  const admin = { nombre: 'Admin Cristopher', avatar: '/images/admin-avatar.png' };
  
  // Estado principal
  const [pedidos, setPedidos] = useState([]);
  const [q, setQ] = useState('');
  const [pagina, setPagina] = useState(1);
  const [perPage] = useState(10);

  // Estado del modal (pedido seleccionado para ver detalles)
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);
  const [loading, setLoading] = useState(false);

  // Cargar pedidos desde la API
  useEffect(() => {
    const cargarPedidos = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/pedidos'); 
        if (res.ok) {
          const data = await res.json();
          setPedidos(Array.isArray(data) ? data : []);
        } else {
          console.error("Error en respuesta API");
        }
      } catch (e) {
        console.error("Error cargando pedidos:", e);
      } finally {
        setLoading(false);
      }
    };
    cargarPedidos();
  }, []);

  // Filtrado
  const filtered = useMemo(() => {
    return pedidos.filter(p => {
      const termino = q.toLowerCase();
      const id = String(p.id || '').toLowerCase();
      const cliente = `${p.usuarios?.nombre || ''} ${p.usuarios?.apellido || ''}`.toLowerCase();
      const estado = (p.estado || '').toLowerCase();
      
      return id.includes(termino) || cliente.includes(termino) || estado.includes(termino);
    });
  }, [pedidos, q]);

  // Paginación
  const paginasTotales = Math.ceil(filtered.length / perPage);
  const currentPageItems = filtered.slice((pagina - 1) * perPage, pagina * perPage);

  // Funciones de acción
  const formatoFecha = (fecha) => {
    if (!fecha) return '-';
    return new Date(fecha).toLocaleDateString('es-CL', { 
      day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute:'2-digit' 
    });
  };

  // ACTUALIZAR ESTADO (Usa archivo 'estado_pedido.js')
  const actualizarEstado = async (nuevoEstado) => {
    if (!pedidoSeleccionado) return;

    try {
      const res = await fetch('/api/pedidos/estado_pedido', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: pedidoSeleccionado.id, estado: nuevoEstado }),
      });

      if (res.ok) {
        // Actualizar estado localmente para ver el cambio inmediato
        setPedidos(prev => prev.map(p => 
          p.id === pedidoSeleccionado.id ? { ...p, estado: nuevoEstado } : p
        ));
        // Actualizar también el modal abierto
        setPedidoSeleccionado(prev => ({ ...prev, estado: nuevoEstado }));
        
        alert(`✅ Estado actualizado correctamente a: ${nuevoEstado}`);
      } else {
        const errorData = await res.json().catch(() => ({}));
        alert('Error al actualizar: ' + (errorData.error || 'Error en el servidor'));
      }
    } catch (e) {
      console.error(e);
      alert('Error de conexión al intentar actualizar el estado');
    }
  };

  // ELIMINAR PEDIDO (Usa archivo 'pedido_elim.js')
  const eliminarPedido = async (id) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este pedido? Esta acción no se puede deshacer.')) return;

    try {
      const res = await fetch('/api/pedidos/pedido_elim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        // Eliminar del estado local para que desaparezca de la tabla
        setPedidos(prev => prev.filter(p => p.id !== id));
        
        // Si el pedido eliminado estaba abierto en el modal, cerrarlo
        if (pedidoSeleccionado?.id === id) {
          setPedidoSeleccionado(null);
        }
        alert('Pedido eliminado correctamente');
      } else {
        const data = await res.json();
        alert('Error al eliminar: ' + (data.error || 'Desconocido'));
      }
    } catch (e) {
      console.error(e);
      alert('Error de conexión al intentar eliminar');
    }
  };

  return (
    <div className="flex min-h-screen font-sans">
      {/* Panel lateral */}
      <div className="w-60 bg-gray-800 text-white flex flex-col p-4 gap-2 shrink-0">
        <h1 className="text-xl font-bold mb-4 text-center">Admin Panel</h1>
        
        <Link href="/admin" className="py-2 border-b border-gray-700 w-full text-center hover:bg-gray-700">Productos</Link>
        <Link href="/config" className="py-2 border-b border-gray-700 w-full text-center hover:bg-gray-700">Configuración</Link>
        <Link href="/configfooter" className="py-2 border-b border-gray-700 w-full text-center hover:bg-gray-700">ConfigFooter</Link>
        <Link href="/usuarios" className="py-2 border-b border-gray-700 w-full text-center hover:bg-gray-700">Usuarios</Link>
        
        {/* Botón Activo */}
        <button className="py-2 border-b border-gray-700 w-full text-center bg-gray-700 cursor-default font-bold border-l-4 border-l-purple-500">
          Pedidos
        </button>
        
        <Link href="/mapausuarios" className="py-2 border-b border-gray-700 w-full text-center hover:bg-gray-700">MapaUsuarios</Link>
        <Link href="/" className="mt-auto py-2 px-4 bg-gray-600 rounded text-center hover:bg-gray-500">Volver al inicio</Link>
      </div>  

      {/* Contenido Principal */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="flex items-center justify-between bg-gray-100 border-b p-4 shadow-sm">
          <h2 className="text-xl font-bold text-gray-800">Gestión de Pedidos</h2>
          <div className="flex items-center gap-3">
            <span className="text-gray-700 font-medium hidden sm:block">{admin.nombre}</span>
            <img src={admin.avatar} alt="Avatar" className="w-10 h-10 rounded-full border border-gray-300 object-cover" />
          </div>
        </header>

        <main className="flex-1 p-6 bg-gray-50 overflow-y-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <h2 className="text-2xl font-bold text-gray-700">Listado de Ventas</h2>
            <div className="text-sm text-gray-500">
              Total pedidos: <strong>{pedidos.length}</strong>
            </div>
          </div>

          {/* Buscador */}
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="🔍 Buscar por ID, Cliente o Estado..."
              value={q}
              onChange={e => setQ(e.target.value)}
              className="p-3 pl-4 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-600 shadow-sm"
            />
          </div>

          {/* Tabla */}
          <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-200">
            <table className="w-full border-collapse">
              <thead className="bg-purple-100 text-purple-900">
                <tr>
                  <th className="p-3 text-left font-semibold text-sm">ID Pedido</th>
                  <th className="p-3 text-left font-semibold text-sm">Cliente</th>
                  <th className="p-3 text-left font-semibold text-sm">Fecha</th>
                  <th className="p-3 text-left font-semibold text-sm">Total</th>
                  <th className="p-3 text-center font-semibold text-sm">Estado</th>
                  <th className="p-3 text-center font-semibold text-sm">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr><td colSpan={6} className="p-8 text-center text-gray-500">Cargando pedidos...</td></tr>
                ) : currentPageItems.length === 0 ? (
                  <tr><td colSpan={6} className="p-8 text-center text-gray-500">No se encontraron pedidos.</td></tr>
                ) : currentPageItems.map(p => (
                  <tr key={p.id} className="hover:bg-purple-50 transition-colors">
                    <td className="p-3 text-sm font-mono text-gray-600">#{p.id.slice(0,8)}...</td>
                    <td className="p-3 text-sm font-medium text-gray-800">
                      {p.usuarios ? `${p.usuarios.nombre || ''} ${p.usuarios.apellido || ''}` : 'Usuario Eliminado'}
                      <div className="text-xs text-gray-400">{p.usuarios?.email}</div>
                    </td>
                    <td className="p-3 text-sm text-gray-600">{formatoFecha(p.fecha)}</td>
                    <td className="p-3 text-sm font-bold text-gray-800">{precioCLP(p.total)}</td>
                    <td className="p-3 text-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${getStatusColor(p.estado)}`}>
                        {p.estado || 'Pendiente'}
                      </span>
                    </td>
                    <td className="p-3 text-center flex justify-center gap-2">
                      <button 
                        onClick={() => setPedidoSeleccionado(p)} 
                        className="bg-white border border-purple-200 text-purple-600 hover:bg-purple-600 hover:text-white transition-colors px-3 py-1 rounded text-sm font-medium shadow-sm"
                      >
                        Ver / Editar
                      </button>
                      {/* Botón Eliminar Rápido */}
                      <button 
                        onClick={(e) => { e.stopPropagation(); eliminarPedido(p.id); }}
                        className="bg-white border border-red-200 text-red-500 hover:bg-red-500 hover:text-white transition-colors px-3 py-1 rounded text-sm font-medium shadow-sm"
                        title="Eliminar Pedido"
                      >
                        🗑
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Paginación */}
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => setPagina(p => Math.max(1, p - 1))}
              disabled={pagina === 1}
              className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 text-sm"
            >
              Anterior
            </button>
            <span className="text-sm text-gray-600">Página {pagina} de {paginasTotales || 1}</span>
            <button
              onClick={() => setPagina(p => Math.min(paginasTotales, p + 1))}
              disabled={pagina === paginasTotales || paginasTotales === 0}
              className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 text-sm"
            >
              Siguiente
            </button>
          </div>
        </main>
      </div>

      {/* MODAL DE DETALLE DE PEDIDO */}
      {pedidoSeleccionado && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col">
            
            {/* Header Modal */}
            <div className="bg-gray-50 border-b p-4 flex justify-between items-center sticky top-0">
              <div>
                <h3 className="text-lg font-bold text-gray-800">Detalle del Pedido <span className="text-purple-600">#{pedidoSeleccionado.id}</span></h3>
                <p className="text-xs text-gray-500">Realizado el {formatoFecha(pedidoSeleccionado.fecha)}</p>
              </div>
              <button onClick={() => setPedidoSeleccionado(null)} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
            </div>

            {/* Body Modal */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Columna Izquierda: Productos */}
              <div className="md:col-span-2 space-y-4">
                <h4 className="font-semibold text-gray-700 border-b pb-2">Productos Comprados</h4>
                <div className="space-y-3">
                  {pedidoSeleccionado.pedido_items && pedidoSeleccionado.pedido_items.length > 0 ? (
                    pedidoSeleccionado.pedido_items.map((item, idx) => (
                      <div key={idx} className="flex gap-4 items-center bg-gray-50 p-3 rounded-lg border border-gray-100">
                        <div className="w-16 h-16 bg-white rounded border overflow-hidden flex-shrink-0">
                          <img 
                            src={(item.productos?.imagenes && item.productos.imagenes[0]) || '/images/default-product.png'} 
                            alt={item.productos?.titulo} 
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-800 line-clamp-1">{item.productos?.titulo || 'Producto desconocido'}</p>
                          <p className="text-xs text-gray-500">SKU: {item.productos?.sku || 'N/A'}</p>
                          <div className="text-sm mt-1">
                            <span className="font-bold text-purple-600">{item.cantidad} x {precioCLP(item.precio_unit)}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-800">{precioCLP(item.cantidad * Number(item.precio_unit))}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 italic text-center py-4">No hay información detallada de los productos.</p>
                  )}
                </div>

                {/* Totales */}
                <div className="flex justify-end mt-4 pt-4 border-t">
                  <div className="w-full max-w-xs space-y-2">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span>{precioCLP(pedidoSeleccionado.total)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Envío</span>
                      <span>$0</span>
                    </div>
                    <div className="flex justify-between text-xl font-bold text-gray-900 border-t pt-2">
                      <span>Total</span>
                      <span>{precioCLP(pedidoSeleccionado.total)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Columna Derecha: Cliente y Acciones */}
              <div className="space-y-6">
                
                {/* Datos Cliente */}
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h4 className="font-semibold text-gray-700 mb-3 text-sm uppercase tracking-wide">Datos del Cliente</h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="text-gray-500 block text-xs">Nombre:</span> {pedidoSeleccionado.usuarios?.nombre} {pedidoSeleccionado.usuarios?.apellido}</p>
                    <p><span className="text-gray-500 block text-xs">Email:</span> {pedidoSeleccionado.usuarios?.email}</p>
                    <p><span className="text-gray-500 block text-xs">Teléfono:</span> {pedidoSeleccionado.usuarios?.telefono || 'No registrado'}</p>
                    <p><span className="text-gray-500 block text-xs">Tracking:</span> {pedidoSeleccionado.trackingnumber || 'Sin asignar'}</p>
                  </div>
                </div>

                {/* Gestión de Estado */}
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                  <h4 className="font-semibold text-purple-800 mb-3 text-sm uppercase tracking-wide">Gestionar Pedido</h4>
                  <label className="block text-xs text-gray-600 mb-1">Estado Actual</label>
                  <select 
                    value={pedidoSeleccionado.estado || 'creado'} 
                    onChange={(e) => actualizarEstado(e.target.value)}
                    className="w-full p-2 border border-purple-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
                  >
                    <option value="creado">🟡 Creado / Pendiente</option>
                    <option value="pagado">🔵 Pagado</option>
                    <option value="enviado">🟣 Enviado</option>
                    <option value="entregado">🟢 Entregado</option>
                    <option value="cancelado">🔴 Cancelado</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-2">
                    Cambiar el estado actualiza la base de datos inmediatamente.
                  </p>
                </div>

                {/* Botón Eliminar (Zona de Peligro en Modal) */}
                <div className="pt-2 border-t border-gray-200">
                  <button 
                    onClick={() => eliminarPedido(pedidoSeleccionado.id)}
                    className="w-full py-2 bg-red-50 border border-red-200 text-red-600 rounded hover:bg-red-100 text-sm font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <span>🗑</span> Eliminar Pedido Permanentemente
                  </button>
                </div>

              </div>
            </div>

            {/* Footer Modal */}
            <div className="bg-gray-50 p-4 border-t flex justify-end">
              <button 
                onClick={() => setPedidoSeleccionado(null)} 
                className="px-6 py-2 bg-gray-800 text-white rounded hover:bg-gray-900 transition-colors"
              >
                Cerrar Detalle
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}