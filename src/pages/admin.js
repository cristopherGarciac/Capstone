import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Admin() {
  const [section, setSection] = useState('productos');

  const admin = {
    nombre: 'Admin Cristopher',
    avatar: '/images/admin-avatar.png',
  };

  // ---------- Estado ----------
  const [productos, setProductos] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [detalleProducto, setDetalleProducto] = useState(null); // para editar
  const [confirmDelete, setConfirmDelete] = useState(null); // {id, titulo}

  // Form de nuevo producto (modal)
  const [nuevoProducto, setNuevoProducto] = useState({
    sku: '',
    titulo: '',
    precio: '',
    stock: 0,
    categoria: '',
    descripcion: '',
    imagenUrl: '', // se guardará como imagenes[0]
  });

  // ---------- Config localStorage (tal como lo tenías) ----------
  const [configTemp, setConfigTemp] = useState({
    nombrePagina: 'Mi E-commerce',
    colorHeader: '#afbbcfff',
    colorFooter: '#b4bbd4ff',
    logo: '/images/blitz.png',
  });
  const [config, setConfig] = useState(configTemp);

  useEffect(() => {
    const configLS = JSON.parse(localStorage.getItem('config'));
    if (configLS) {
      setConfigTemp(configLS);
      setConfig(configLS);
    }
  }, []);

  const handleInputChange = (e) => {
    setConfigTemp({ ...configTemp, [e.target.name]: e.target.value });
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setConfigTemp({ ...configTemp, logo: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const aplicarCambios = () => {
    setConfig(configTemp);
    localStorage.setItem('config', JSON.stringify(configTemp));
    alert('Cambios aplicados correctamente!');
  };

  useEffect(() => {
    document.documentElement.style.setProperty('--color-header', configTemp.colorHeader);
    document.documentElement.style.setProperty('--color-footer', configTemp.colorFooter);
  }, [configTemp.colorHeader, configTemp.colorFooter]);

  // ---------- CRUD Productos ----------
  async function cargarProductos() {
    setLoading(true);
    try {
      const res = await fetch('/api/productos?skip=0&take=100');
      if (!res.ok) throw new Error('No se pudo obtener productos');
      const data = await res.json(); // {items, total}
      setProductos(data.items || []);
      setTotal(data.total || 0);
    } catch (e) {
      console.error(e);
      alert('Error al cargar productos');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (section === 'productos') cargarProductos();
  }, [section]);

  async function crearProducto(e) {
    e.preventDefault();
    try {
      const body = {
        sku: nuevoProducto.sku.trim(),
        titulo: nuevoProducto.titulo.trim(),
        descripcion: nuevoProducto.descripcion.trim(),
        precio: Number(nuevoProducto.precio),
        stock: Number(nuevoProducto.stock) || 0,
        categoria: nuevoProducto.categoria.trim() || null,
        imagenes: nuevoProducto.imagenUrl ? [nuevoProducto.imagenUrl] : [],
      };

      if (!body.sku || !body.titulo || isNaN(body.precio)) {
        alert('SKU, Título y Precio (numérico) son obligatorios');
        return;
      }

      const res = await fetch('/api/productos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'Error al crear');
      }

      // reset
      setDetalleProducto(null);
      setNuevoProducto({
        sku: '',
        titulo: '',
        precio: '',
        stock: 0,
        categoria: '',
        descripcion: '',
        imagenUrl: '',
      });

      await cargarProductos();
    } catch (e) {
      console.error(e);
      alert(e.message);
    }
  }

  async function guardarEdicion() {
    try {
      const id = detalleProducto.id;
      const body = {
        sku: detalleProducto.sku,
        titulo: detalleProducto.titulo,
        descripcion: detalleProducto.descripcion,
        categoria: detalleProducto.categoria,
        precio:
          detalleProducto.precio !== '' && detalleProducto.precio != null
            ? Number(detalleProducto.precio)
            : undefined,
        stock:
          detalleProducto.stock !== '' && detalleProducto.stock != null
            ? Number(detalleProducto.stock)
            : undefined,
        imagenes: detalleProducto.imagenes || [],
      };

      const res = await fetch(`/api/productos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'Error al actualizar');
      }

      setDetalleProducto(null);
      await cargarProductos();
    } catch (e) {
      console.error(e);
      alert(e.message);
    }
  }

  async function borrarProductoConfirmado() {
    try {
      const id = confirmDelete.id;
      const res = await fetch(`/api/productos/${id}`, { method: 'DELETE' });
      if (res.status !== 204) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'No se pudo borrar');
      }
      setConfirmDelete(null);
      await cargarProductos();
    } catch (e) {
      console.error(e);
      alert(e.message);
    }
  }

  // Helpers UI
  const primeraImagen = (p) =>
    (Array.isArray(p.imagenes) && p.imagenes[0]) || '/images/default-product.png';

  const precioCLP = (v) =>
    typeof v === 'number'
      ? Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(v)
      : v;

  // ---------- Render ----------
  const renderSection = () => {
    if (section === 'productos') {
      return (
        <div className="relative">
          <h2 className="text-2xl mb-6 font-bold">
            Productos {loading ? '(cargando...)' : `(${total})`}
          </h2>

          {/* Botones de cabecera */}
          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={() => setDetalleProducto({ modalAgregar: true })}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              Agregar Producto
            </button>
            <button
              onClick={cargarProductos}
              className="px-3 py-2 border rounded hover:bg-gray-100"
            >
              Refrescar
            </button>
          </div>

          {/* Lista */}
          <div className="flex flex-col gap-4">
            {productos.map((producto) => (
              <div
                key={producto.id}
                className="flex items-center justify-between bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={primeraImagen(producto)}
                    alt={producto.titulo}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{producto.titulo}</h3>
                    <p className="text-gray-600 text-sm">SKU: {producto.sku}</p>
                    {producto.categoria && (
                      <p className="text-gray-600 text-sm">Categoría: {producto.categoria}</p>
                    )}
                    <p className="text-gray-600 text-sm">Stock: {producto.stock ?? 0}</p>
                    <p className="text-gray-800 font-medium">{precioCLP(producto.precio)}</p>
                    <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                      {producto.descripcion}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      setDetalleProducto({
                        ...producto,
                        precio: producto.precio ?? '',
                        stock: producto.stock ?? '',
                        imagenes: producto.imagenes ?? [],
                      })
                    }
                    className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() =>
                      setConfirmDelete({ id: producto.id, titulo: producto.titulo })
                    }
                    className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Borrar
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Modal Agregar */}
          {detalleProducto?.modalAgregar && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg w-96 relative">
                <h3 className="text-xl font-bold mb-4">Agregar Nuevo Producto</h3>
                <form onSubmit={crearProducto} className="space-y-3">
                  <input
                    type="text"
                    value={nuevoProducto.sku}
                    onChange={(e) => setNuevoProducto({ ...nuevoProducto, sku: e.target.value })}
                    placeholder="SKU"
                    className="w-full p-2 border rounded"
                    required
                  />
                  <input
                    type="text"
                    value={nuevoProducto.titulo}
                    onChange={(e) =>
                      setNuevoProducto({ ...nuevoProducto, titulo: e.target.value })
                    }
                    placeholder="Título"
                    className="w-full p-2 border rounded"
                    required
                  />
                  <input
                    type="text"
                    value={nuevoProducto.categoria}
                    onChange={(e) =>
                      setNuevoProducto({ ...nuevoProducto, categoria: e.target.value })
                    }
                    placeholder="Categoría (opcional)"
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="number"
                    step="0.01"
                    value={nuevoProducto.precio}
                    onChange={(e) =>
                      setNuevoProducto({ ...nuevoProducto, precio: e.target.value })
                    }
                    placeholder="Precio (numérico)"
                    className="w-full p-2 border rounded"
                    required
                  />
                  <input
                    type="number"
                    value={nuevoProducto.stock}
                    onChange={(e) =>
                      setNuevoProducto({ ...nuevoProducto, stock: Number(e.target.value) })
                    }
                    placeholder="Stock"
                    className="w-full p-2 border rounded"
                    required
                  />
                  <textarea
                    value={nuevoProducto.descripcion}
                    onChange={(e) =>
                      setNuevoProducto({ ...nuevoProducto, descripcion: e.target.value })
                    }
                    placeholder="Descripción"
                    className="w-full p-2 border rounded"
                    required
                  />

                  {/* Imagen: dataURL o URL */}
                  <input
                    type="file"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = () =>
                          setNuevoProducto({ ...nuevoProducto, imagenUrl: reader.result });
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="w-full"
                  />
                  <input
                    type="url"
                    value={nuevoProducto.imagenUrl}
                    onChange={(e) =>
                      setNuevoProducto({ ...nuevoProducto, imagenUrl: e.target.value })
                    }
                    placeholder="O pega una URL de imagen"
                    className="w-full p-2 border rounded"
                  />

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setDetalleProducto(null)}
                      className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      Guardar
                    </button>
                  </div>
                </form>

                <button
                  onClick={() => setDetalleProducto(null)}
                  className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-lg font-bold"
                >
                  ✕
                </button>
              </div>
            </div>
          )}

          {/* Modal Editar */}
          {detalleProducto && !detalleProducto.modalAgregar && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg w-96 relative">
                <h3 className="text-xl font-bold mb-4">Editar Producto</h3>

                <div className="space-y-3">
                  <input
                    type="text"
                    value={detalleProducto.sku || ''}
                    onChange={(e) =>
                      setDetalleProducto({ ...detalleProducto, sku: e.target.value })
                    }
                    placeholder="SKU"
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="text"
                    value={detalleProducto.titulo || ''}
                    onChange={(e) =>
                      setDetalleProducto({ ...detalleProducto, titulo: e.target.value })
                    }
                    placeholder="Título"
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="text"
                    value={detalleProducto.categoria || ''}
                    onChange={(e) =>
                      setDetalleProducto({ ...detalleProducto, categoria: e.target.value })
                    }
                    placeholder="Categoría"
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="number"
                    step="0.01"
                    value={detalleProducto.precio === '' ? '' : detalleProducto.precio}
                    onChange={(e) =>
                      setDetalleProducto({ ...detalleProducto, precio: e.target.value })
                    }
                    placeholder="Precio (numérico)"
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="number"
                    value={detalleProducto.stock === '' ? '' : detalleProducto.stock}
                    onChange={(e) =>
                      setDetalleProducto({ ...detalleProducto, stock: e.target.value })
                    }
                    placeholder="Stock"
                    className="w-full p-2 border rounded"
                  />
                  <textarea
                    value={detalleProducto.descripcion || ''}
                    onChange={(e) =>
                      setDetalleProducto({ ...detalleProducto, descripcion: e.target.value })
                    }
                    placeholder="Descripción"
                    className="w-full p-2 border rounded"
                  />

                  {/* Imagen principal: edita imagenes[0] */}
                  <input
                    type="file"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = () => {
                          const imgs = Array.isArray(detalleProducto.imagenes)
                            ? [...detalleProducto.imagenes]
                            : [];
                          imgs[0] = reader.result;
                          setDetalleProducto({ ...detalleProducto, imagenes: imgs });
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="w-full"
                  />
                  <input
                    type="url"
                    value={(detalleProducto.imagenes && detalleProducto.imagenes[0]) || ''}
                    onChange={(e) => {
                      const imgs = Array.isArray(detalleProducto.imagenes)
                        ? [...detalleProducto.imagenes]
                        : [];
                      imgs[0] = e.target.value;
                      setDetalleProducto({ ...detalleProducto, imagenes: imgs });
                    }}
                    placeholder="URL de imagen principal"
                    className="w-full p-2 border rounded"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <button
                    onClick={() => setDetalleProducto(null)}
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={guardarEdicion}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Guardar
                  </button>
                </div>

                <button
                  onClick={() => setDetalleProducto(null)}
                  className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-lg font-bold"
                >
                  ✕
                </button>
              </div>
            </div>
          )}

          {/* Modal Borrar */}
          {confirmDelete && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg w-96">
                <h3 className="text-lg font-semibold mb-2">Eliminar producto</h3>
                <p className="text-sm text-gray-700">
                  ¿Seguro que deseas eliminar <b>{confirmDelete.titulo}</b>? Esta acción no se puede
                  deshacer.
                </p>
                <div className="flex justify-end gap-2 mt-4">
                  <button
                    onClick={() => setConfirmDelete(null)}
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={borrarProductoConfirmado}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Borrar
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    }

    if (section === 'configuracion') {
      return (
        <div>
          <h2 className="text-2xl mb-4">Configuración de la Página</h2>
          {/* Aquí va todo el contenido de configuración */}
        </div>
      );
    }

    return <p>Selecciona una sección desde la barra lateral.</p>;
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
          {/* Botón Activo Actual */}
          <button className="w-full text-left py-3 px-4 rounded bg-blue-600 text-white shadow-lg transition duration-200 flex items-center gap-3">
            📦 Productos
          </button>
          
          <Link href="/config" className="block py-3 px-4 rounded text-gray-400 hover:bg-gray-800 hover:text-white transition duration-200 flex items-center gap-3">
            ⚙️ Configuración
          </Link>
          <Link href="/configfooter" className="block py-3 px-4 rounded text-gray-400 hover:bg-gray-800 hover:text-white transition duration-200 flex items-center gap-3">
            ⚙️ ConfigFooter
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
        <main className="flex-1 p-6 bg-gray-50">{renderSection()}</main>
      </div>
    </div>
  );
}