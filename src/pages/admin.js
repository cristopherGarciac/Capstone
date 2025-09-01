import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Admin() {
  const [section, setSection] = useState('productos'); // sección actual del panel

  const admin = {
    nombre: 'Admin Cristopher',
    avatar: '/images/admin-avatar.png', // ruta de la imagen del administrador
  };

  // ----- Productos -----
  const [productos, setProductos] = useState([
    {
      id: 1,
      nombre: 'Procesador Intel i7',
      precio: '$250.000',
      stock: 5,
      descripcion: '11va generación, 3.8GHz',
      imagen: '/images/i7.png',
    },
    {
      id: 2,
      nombre: 'Tarjeta Gráfica RTX 3060',
      precio: '$399.000',
      stock: 3,
      descripcion: '12GB GDDR6, ideal para gaming',
      imagen: '/images/3060.png',
    },
    {
      id: 3,
      nombre: 'Memoria RAM Corsair 16GB',
      precio: '$75.000',
      stock: 10,
      descripcion: 'DDR4 3200MHz',
      imagen: '/images/ddr.png',
    },
  ]);

  const [detalleProducto, setDetalleProducto] = useState(null);

  // ----- Nuevo Producto para modal -----
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: '',
    precio: '',
    stock: 0,
    descripcion: '',
    imagen: '',
  });

  // ----- Configuración -----
  const [configTemp, setConfigTemp] = useState({
    nombrePagina: 'Mi E-commerce',
    colorHeader: '#afbbcfff',
    colorFooter: '#b4bbd4ff',
    logo: '/images/blitz.png',
  });
  const [config, setConfig] = useState(configTemp);
  const [logoFile, setLogoFile] = useState(null);

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
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setConfigTemp({ ...configTemp, logo: reader.result });
        setLogoFile(reader.result);
      };
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

  // ----- Render secciones -----
  const renderSection = () => {
    if (section === 'productos') {
      return (
        <div className="relative">
          <h2 className="text-2xl mb-6 font-bold">Productos</h2>

          {/* Botón Agregar Producto */}
          <button
            onClick={() => setDetalleProducto({ modalAgregar: true })}
            className="mb-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Agregar Producto
          </button>

          <div className="flex flex-col gap-4">
            {productos.map((producto) => (
              <div
                key={producto.id}
                className="flex items-center justify-between bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
              >
                {/* Imagen */}
                <img
                  src={producto.imagen || '/images/default-product.png'}
                  alt={producto.nombre}
                  className="w-24 h-24 object-cover rounded"
                />

                {/* Información del producto */}
                <div className="flex-1 mx-4">
                  <h3 className="text-lg font-semibold">{producto.nombre}</h3>
                  <p className="text-gray-600">Stock: {producto.stock}</p>
                  <p className="text-gray-800 font-medium">{producto.precio}</p>
                  <p className="text-gray-500 text-sm mt-1">{producto.descripcion}</p>
                </div>

                {/* Botón Editar */}
                <button
                  onClick={() => setDetalleProducto(producto)}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                >
                  Editar
                </button>
              </div>
            ))}
          </div>

          {/* Modal de agregar producto */}
          {detalleProducto?.modalAgregar && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg w-96 relative">
                <h3 className="text-xl font-bold mb-4">Agregar Nuevo Producto</h3>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const nuevoId = productos.length
                      ? Math.max(...productos.map((p) => p.id)) + 1
                      : 1;
                    setProductos([...productos, { ...nuevoProducto, id: nuevoId }]);
                    setDetalleProducto(null);
                    // Reiniciar formulario
                    setNuevoProducto({
                      nombre: '',
                      precio: '',
                      stock: 0,
                      descripcion: '',
                      imagen: '',
                    });
                  }}
                  className="space-y-4"
                >
                  <input
                    type="text"
                    value={nuevoProducto.nombre}
                    onChange={(e) =>
                      setNuevoProducto({ ...nuevoProducto, nombre: e.target.value })
                    }
                    placeholder="Nombre"
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />
                  <input
                    type="text"
                    value={nuevoProducto.precio}
                    onChange={(e) =>
                      setNuevoProducto({ ...nuevoProducto, precio: e.target.value })
                    }
                    placeholder="Precio"
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />
                  <input
                    type="number"
                    value={nuevoProducto.stock}
                    onChange={(e) =>
                      setNuevoProducto({ ...nuevoProducto, stock: Number(e.target.value) })
                    }
                    placeholder="Stock"
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />
                  <textarea
                    value={nuevoProducto.descripcion}
                    onChange={(e) =>
                      setNuevoProducto({ ...nuevoProducto, descripcion: e.target.value })
                    }
                    placeholder="Descripción"
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />
                  <input
                    type="file"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = () =>
                          setNuevoProducto({ ...nuevoProducto, imagen: reader.result });
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="mb-4"
                  />

                  <div className="flex justify-end gap-2">
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
                {/* Botón cerrar modal */}
                <button
                  onClick={() => setDetalleProducto(null)}
                  className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-lg font-bold"
                >
                  ✕
                </button>
              </div>
            </div>
          )}

          {/* Modal de edición existente */}
          {detalleProducto && !detalleProducto.modalAgregar && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg w-96 relative">
                <h3 className="text-xl font-bold mb-4">Editar Producto</h3>

                <input
                  type="text"
                  value={detalleProducto.nombre}
                  onChange={(e) =>
                    setDetalleProducto({ ...detalleProducto, nombre: e.target.value })
                  }
                  placeholder="Nombre"
                  className="w-full mb-2 p-2 border rounded"
                />
                <input
                  type="text"
                  value={detalleProducto.precio}
                onChange={(e) =>
                  setDetalleProducto({ ...detalleProducto, precio: e.target.value })
                }
                placeholder="Precio"
                className="w-full mb-2 p-2 border rounded"
              />
              <input
                type="number"
                value={detalleProducto.stock}
                onChange={(e) =>
                  setDetalleProducto({ ...detalleProducto, stock: Number(e.target.value) })
                }
                placeholder="Stock"
                className="w-full mb-2 p-2 border rounded"
              />
              <textarea
                value={detalleProducto.descripcion}
                onChange={(e) =>
                  setDetalleProducto({ ...detalleProducto, descripcion: e.target.value })
                }
                placeholder="Descripción"
                className="w-full mb-2 p-2 border rounded"
              />
              <input
                type="file"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = () => {
                      setDetalleProducto({ ...detalleProducto, imagen: reader.result });
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                className="mb-4"
              />

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setDetalleProducto(null)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => {
                    setProductos(
                      productos.map((p) =>
                        p.id === detalleProducto.id ? detalleProducto : p
                      )
                    );
                    setDetalleProducto(null);
                  }}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Guardar
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

  return (
    <div className="flex min-h-screen">
      {/* Panel lateral */}
      <div className="w-60 bg-gray-800 text-white flex flex-col p-4 gap-2">
        <h1 className="text-xl font-bold mb-4 text-center">Admin Panel</h1>

        {/* Botones de secciones */}
        <button className="py-2 border-b border-gray-700" onClick={() => setSection('productos')}>
          Productos
        </button>
        
        <Link href="confi" className="py-2 border-b border-gray-700 hover:bg-gray-700 text-center">
          Configuración
        </Link>

        <Link href="usuarios" className="py-2 border-b border-gray-700 hover:bg-gray-700 text-center">
          Usuarios
        </Link>

        <Link href="pedidos" className="py-2 border-b border-gray-700 hover:bg-gray-700 text-center">
          Pedidos
        </Link>
        
        <Link href="report" className="py-2 border-b border-gray-700 hover:bg-gray-700 text-center">
          Reportes
        </Link>

        <Link href="/" className="mt-auto py-2 px-4 bg-gray-600 rounded text-center hover:bg-gray-500">
          Volver al inicio
        </Link>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between bg-gray-100 border-b p-4 shadow-sm">
          <h2 className="text-xl font-bold">{section.charAt(0).toUpperCase() + section.slice(1)}</h2>
          <div className="flex items-center gap-3">
            {/* Aquí se pueden agregar íconos, notificaciones o botones */}
            <span className="text-gray-700 font-medium">{admin.nombre}</span>
            <img
              src={admin.avatar}
              alt="Avatar"
              className="w-10 h-10 rounded-full border border-gray-300 object-cover"
            />
          </div>
        </header>

        {/* Contenido debajo del header */}
        <main className="flex-1 p-6 bg-gray-50">{renderSection()}</main>
      </div>
    </div>
  )
}
