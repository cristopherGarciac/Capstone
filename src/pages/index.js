import Link from "next/link";

export default function Home() {
  const promociones = [
    { texto: "6 Cuotas Sin Interés", destaque: true },
    { texto: "Despacho a Todo Chile", destaque: false },
    { texto: "Marcas Exclusivas", destaque: false },
  ];

  const categorias = [
    { nombre: "Procesadores", slug: "procesadores" },
    { nombre: "Placas Madre", slug: "placas-madre" },
    { nombre: "Tarjetas Gráficas", slug: "tarjetas-graficas" },
    { nombre: "RAM", slug: "ram" },
    { nombre: "Almacenamiento (SSD/HDD)", slug: "almacenamiento" },
  ];

  const productosDestacados = [
    {
      id: 1,
      nombre: "Procesador Intel i7",
      descripcion: "11va generación, 3.8GHz",
      precio: "$250.000",
      imagen: "https://via.placeholder.com/300x200",
    },
    {
      id: 2,
      nombre: "Tarjeta Gráfica RTX 3060",
      descripcion: "12GB GDDR6",
      precio: "$399.000",
      imagen: "https://via.placeholder.com/300x200",
    },
    {
      id: 3,
      nombre: "Memoria RAM Corsair 16GB",
      descripcion: "DDR4 3200MHz",
      precio: "$75.000",
      imagen: "https://via.placeholder.com/300x200",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-100">
      {/* Barra superior de promociones */}
      <div className="bg-gray-800 text-white text-center py-2 text-sm">
        {promociones.map((p, i) => (
          <span key={i} className={`mx-4 ${p.destaque ? "font-semibold" : ""}`}>
            {p.texto}
          </span>
        ))}
      </div>

      {/* Navbar fija */}
      <nav className="bg-white shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <h2 className="text-2xl font-bold text-blue-600">PC Store</h2>
          <div className="space-x-6">
            <Link href="/" className="text-gray-700 hover:text-blue-600">
              Inicio
            </Link>
            <Link href="/catalogo" className="text-gray-700 hover:text-blue-600">
              Catálogo
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600">
              About
            </Link>
            <Link href="/contacto" className="text-gray-700 hover:text-blue-600">
              Contacto
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero principal */}
      <section className="bg-white py-16 text-center">
        <h1 className="text-5xl font-bold text-gray-900">
          Catálogo de Componentes para PC
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Todo lo que necesitas para armar tu PC: desde procesadores hasta
          almacenamiento.
        </p>
        <Link
          href="/catalogo"
          className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700"
        >
          Ver Catálogo
        </Link>
      </section>

      {/* Carrusel de productos destacados */}
      <section className="bg-gray-50 py-12">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Productos Destacados
        </h2>
        <div className="flex overflow-x-auto space-x-6 px-6">
          {productosDestacados.map((prod) => (
            <div
              key={prod.id}
              className="min-w-[250px] bg-white rounded-lg shadow hover:shadow-lg transition"
            >
              <img
                src={prod.imagen}
                alt={prod.nombre}
                className="rounded-t-lg w-full h-40 object-cover"
              />
              <div className="p-4 text-center">
                <h3 className="font-semibold text-gray-700">{prod.nombre}</h3>
                <p className="text-sm text-gray-500">{prod.descripcion}</p>
                <p className="text-lg font-bold text-blue-600 mt-2">
                  {prod.precio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categorías */}
      <section className="max-w-6xl mx-auto py-12 grid grid-cols-2 md:grid-cols-5 gap-6 px-4">
        {categorias.map((cat) => (
          <Link
            key={cat.slug}
            href={`/catalogo?categoria=${cat.slug}`}
            className="bg-white p-4 rounded-lg shadow hover:shadow-lg text-center transition"
          >
            <h3 className="font-semibold text-gray-700">{cat.nombre}</h3>
          </Link>
        ))}
      </section>

      {/* Filtros de prueba */}
      <section className="max-w-6xl mx-auto py-12 px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Filtrar Catálogo</h2>
        <div className="flex flex-wrap gap-4">
          <select className="border p-2 rounded w-48">
            <option>Filtrar por Marca</option>
            <option>Intel</option>
            <option>AMD</option>
            <option>NVIDIA</option>
            <option>Corsair</option>
          </select>
          <select className="border p-2 rounded w-48">
            <option>Filtrar por Precio</option>
            <option>Menos de $100.000</option>
            <option>$100.000 - $300.000</option>
            <option>Más de $300.000</option>
          </select>
        </div>
      </section>
    </main>
  );
}
