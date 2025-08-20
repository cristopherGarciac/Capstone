import { useState } from 'react';
import Link from 'next/link';

export default function Admin() {
  // Simulando productos administrados
  const [productos, setProductos] = useState([
    { id: 1, nombre: 'Procesador Intel i7', precio: '$250.000' },
    { id: 2, nombre: 'Tarjeta Gráfica RTX 3060', precio: '$399.000' },
    { id: 3, nombre: 'Memoria RAM Corsair 16GB', precio: '$75.000' },
  ]);

  // Simulando el formulario para agregar nuevos productos
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: '',
    precio: '',
  });

  // Función para agregar productos
  const agregarProducto = (e) => {
    e.preventDefault();
    setProductos([
      ...productos,
      { id: productos.length + 1, ...nuevoProducto },
    ]);
    setNuevoProducto({ nombre: '', precio: '' }); // Limpiar formulario
  };

  // Función para eliminar productos
  const eliminarProducto = (id) => {
    setProductos(productos.filter((producto) => producto.id !== id));
  };

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-center text-[var(--color-secondary)] mb-6">
        Panel de Administración
      </h1>

      {/* Formulario para agregar productos */}
      <form onSubmit={agregarProducto} className="mb-6">
        <h2 className="text-2xl mb-4">Agregar nuevo producto</h2>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Nombre del producto"
            value={nuevoProducto.nombre}
            onChange={(e) =>
              setNuevoProducto({ ...nuevoProducto, nombre: e.target.value })
            }
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            placeholder="Precio"
            value={nuevoProducto.precio}
            onChange={(e) =>
              setNuevoProducto({ ...nuevoProducto, precio: e.target.value })
            }
            className="border p-2 rounded w-full"
          />
          <button
            type="submit"
            className="btn-primary px-6 py-2 rounded text-white bg-[var(--color-primary)] hover:bg-[var(--color-accent)]"
          >
            Agregar
          </button>
        </div>
      </form>

      {/* Lista de productos */}
      <h2 className="text-2xl mb-4">Productos</h2>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Nombre</th>
            <th className="border px-4 py-2">Precio</th>
            <th className="border px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id}>
              <td className="border px-4 py-2">{producto.id}</td>
              <td className="border px-4 py-2">{producto.nombre}</td>
              <td className="border px-4 py-2">{producto.precio}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => eliminarProducto(producto.id)}
                  className="text-red-500 hover:underline"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Link de regreso */}
      <Link href="/" className="text-blue-500 mt-4 block text-center">
        Volver al inicio
      </Link>
    </main>
  );
}
