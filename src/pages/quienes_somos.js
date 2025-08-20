import { useState } from "react";
import Link from "next/link";
import Image from "next/image";




export default function QuienesSomos() {
      const [loginOpen, setLoginOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      {/* Navbar */}
      <nav className="bg-white shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          {/* Reemplazamos el texto por el logo */}
          <Link class="logo" href="/" className="text-2xl font-bold text-[var(--color-primary)]">
            <img src="/images/blitz.png" alt="Blitz Hardware Logo" className="h-20 w-auto" />
          </Link>
          <div className="flex items-center space-x-6">
            <Link href="/" className="text-gray-700 hover:text-[var(--color-accent)]">
              Inicio
            </Link>
            <Link href="/catalogo" className="text-gray-700 hover:text-[var(--color-accent)]">
              Catálogo
            </Link>
            <Link href="/carrito" className="text-gray-700 hover:text-[var(--color-accent)]">
              <img src="/images/carrito.png" alt="Carrito Compra Logo" className="h-11 w-auto"/>
            </Link>

            {/* Botón login */}
            <button
              onClick={() => setLoginOpen(true)}
              className="text-gray-700 hover:text-[var(--color-accent)] flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A9.001 9.001 0 0112 15a9.001 9.001 0 016.879 2.804M12 11a4 4 0 100-8 4 4 0 000 8z" />
              </svg>
              Iniciar sesión
            </button>
          </div>
        </div>
      </nav>

      {/* Modal de login */}
      {loginOpen && (
        <div className="fixed inset-0 bg-black  flex justify-center items-start pt-24 z-50" style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
          <div className="bg-white rounded-xl shadow-lg w-96 p-6 relative">
            <button
              onClick={() => setLoginOpen(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold text-[var(--color-secondary)] mb-4 text-center">Iniciar Sesión</h2>
            <form className="flex flex-col gap-4">
              <input type="email" placeholder="Correo electrónico" className="border p-2 rounded"/>
              <input type="password" placeholder="Contraseña" className="border p-2 rounded"/>
              <button type="submit" className="btn-primary w-full">Iniciar Sesión</button>
            </form>
            <div className="flex flex-col items-center text-sm mt-4 gap-2">
              <button className="text-blue-600 hover:underline">Olvidé mi contraseña</button>
              <span>
                ¿No estás registrado?{" "}
                <Link href="/register" className="text-blue-600 hover:underline">
                Regístrate
                </Link>
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Contenido de la página */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-center text-[var(--color-secondary)] mb-6">
          ¿Quiénes somos?
        </h1>

        <p className="text-lg text-gray-600 mb-8">
          En <b>Blitz Hardware</b>, somos un equipo de apasionados por la tecnología y los componentes de
          PC. Nos dedicamos a ofrecerte las mejores marcas y productos para que puedas armar el equipo de
          tus sueños...
        </p>

        <p className="text-lg text-gray-600 mb-8">
          Nuestra misión es ofrecer productos de calidad a precios competitivos, con un enfoque en el
          servicio al cliente...
        </p>

        {/* Logos de las empresas colaboradoras */}
        <div className="bg-gray-50 py-12">
          <h2 className="text-3xl font-bold text-center text-[var(--color-secondary)] mb-8">
            Empresas que Confían en Nosotros
          </h2>
          <div className="flex justify-center space-x-12">
            <Image src="/images/nvidia.png" alt="Logo Empresa 1" width={100} height={100} className="h-16 object-contain mx-auto" />
            <Image src="/images/hp.png" alt="Logo Empresa 2" width={100} height={100} className="h-16 object-contain mx-auto" />
            <Image src="/images/corsair.png" alt="Logo Empresa 3" width={100} height={100} className="h-16 object-contain mx-auto" />
            <Image src="/images/msi.png" alt="Logo Empresa 4" width={100} height={100} className="h-16 object-contain mx-auto" />
          </div>
        </div>

        <div className="text-center mt-8">
          <Link href="/" className="btn-primary px-6 py-3 text-white">
            Volver al Inicio
          </Link>
        </div>
      </div>

     {/* ==== FOOTER ==== */}
<footer className="bg-[#FFD700] text-black mt-16">  {/* Fondo amarillo con texto negro */}
  {/* Links principales */}
  <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
    {/* Ayuda */}
    <div>
      <h4 className="text-xl font-semibold mb-4 border-l-4 border-blue-300 pl-3">Ayuda</h4> {/* Cambié border-teal-400 a border-gray-300 */}
      <ul className="space-y-2 text-black">  {/* Cambié text-gray-200 a text-black */}
        <li><Link href="/ayuda" className="hover:text-teal-300">Centro de ayuda</Link></li>
        <li><Link href="/seguimiento" className="hover:text-teal-300">Seguimiento de mi compra</Link></li>
      </ul>
    </div>

    {/* Nosotros */}
    <div>
      <h4 className="text-xl font-semibold mb-4 border-l-4 border-blue-300 pl-3">Nosotros</h4> {/* Cambié border-teal-400 a border-gray-300 */}
      <ul className="space-y-2 text-black">  {/* Cambié text-gray-200 a text-black */}
        <li><Link href="/quienes_somos" className="hover:text-teal-300">Quiénes somos</Link></li>
        <li><Link href="/terminos" className="hover:text-teal-300">Términos y Condiciones</Link></li>
      </ul>
    </div>

    {/* Comunidad */}
    <div>
      <h4 className="text-xl font-semibold mb-4 border-l-4 border-blue-300 pl-3">Comunidad Blitz</h4> {/* Cambié border-teal-400 a border-gray-300 */}
      <ul className="space-y-2 text-black">  {/* Cambié text-gray-200 a text-black */}
        <li><a href="https://www.instagram.com/mr.popo_lf" target="_blank" className="hover:text-teal-300">Instagram</a></li>
      </ul>
    </div>
  </div>

  <hr className="border-white/10" />

  {/* Medios de pago */}
  <div className="max-w-7xl mx-auto px-6 py-8">
    <h5 className="text-lg font-semibold mb-6 border-l-4  border-blue-300 pl-3">Medios de pago</h5> 
    <div className="flex flex-wrap items-center gap-6 ">
      <span className="bg-white/5 px-4 py-2 rounded-md">
        <img src="/images/mercado.png" alt="Mercado Pago" width={100} height={50} />
      </span>
    </div>
  </div>

  {/* Badges + redes + dirección/horario */}
  <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
    {/* Badges */}
    <div className="flex flex-wrap items-center gap-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded bg-white/10 grid place-items-center">🏛️</div>
        <div className="text-sm text-black">
          Dirección <br /> <span className="font-semibold">ChileCompra</span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded bg-white/10 grid place-items-center">🛡️</div>
        <div className="text-sm text-black">
          Protegido con <span className="font-semibold">seguridad</span>
        </div>
      </div>
    </div>

  
  </div>

  {/* Barra inferior */}
  <div className="bg-black/30 text-center text-xs text-white-300 py-3">
    © 2025–2025 | Desarrollado por Cristopher Garcia, Jesus Lagos e Ignacio Varas, Proyecto Capstone
  </div>
</footer>
{/* ==== /FOOTER ==== */}
    </div>
  );
}
