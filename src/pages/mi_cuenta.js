import { useUser } from "../context/UserContext";
import { useState, useEffect, useRef } from "react";
import { useThemeCuenta } from "../hooks/useThemeCuenta";
import Link from "next/link";

/* ============================================================
   MI CUENTA CON SISTEMA DE TEMAS + FOTO DE PERFIL + PEDIDOS
============================================================ */
export default function MiCuenta() {
  const { user, setUser, logout } = useUser();
  
  // Estados para modales
  const [showEditContacto, setShowEditContacto] = useState(false);
  const [showEditDireccion, setShowEditDireccion] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  // Estados para Pedidos (Lógica traída de seguimiento.js)
  const [pedidos, setPedidos] = useState([]);
  const [loadingPedidos, setLoadingPedidos] = useState(false);

  const { theme, setTheme } = useThemeCuenta();

  const THEMES_LABELS = {
    claro: "Claro",
    oscuro: "Oscuro",
    azul: "Azul cielo",
    gamer: "Gamer",
    pro: "Profesional",
  };

  // Para subir imagen
  const fileInputRef = useRef(null);
  const [previewImg, setPreviewImg] = useState(
    user?.fotoperfil || "/images/default-user.jpg"
  );

  useEffect(() => {
    if (user?.fotoperfil) {
      setPreviewImg(user.fotoperfil);
    }
  }, [user]);

  // ---------------------------------------------
  // CARGAR PEDIDOS AUTOMÁTICAMENTE
  // ---------------------------------------------
  useEffect(() => {
    const cargarPedidos = async () => {
      if (!user?.email) return;
      setLoadingPedidos(true);
      try {
        // Usamos la misma API que seguimiento.js
        const res = await fetch(`/api/obtener_pedidos?email=${user.email}`);
        const data = await res.json();
        setPedidos(data.pedidos || []);
      } catch (error) {
        console.error("Error cargando pedidos:", error);
      } finally {
        setLoadingPedidos(false);
      }
    };

    if (user) {
      cargarPedidos();
    }
  }, [user]);

  const handleLogout = () => {
    setLoggingOut(true);
    // Esperar 2 segundos
    setTimeout(() => {
      logout();               // limpia el contexto
      window.location.href = "/"; // redirige al index
    }, 2000);
  };

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 1. Crear URL para vista previa
    const imgURL = URL.createObjectURL(file);
    setPreviewImg(imgURL);

    // 2. Convertir imagen a base64 para guardarla en BD
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result; // 👈 FOTO BASE64 COMPLETA

      try {
        // 3. Guardar imagen en backend
        const res = await fetch("/api/usuarios/foto", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: user.id, foto: base64 }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error);

        // 4. Guardar en contexto + localStorage
        setUser((prev) => ({
          ...prev,
          fotoperfil: base64,
        }));

      } catch (error) {
        console.error("Error guardando foto:", error);
      }
    };

    reader.readAsDataURL(file);
  };

  if (!user) return <p className="p-6 text-center mt-10">Cargando perfil...</p>;

  return (
    <div className="mi-cuenta-page min-h-screen py-10 px-4 transition-all bg-gray-50">

      {/* Título */}
      <h1 className="text-3xl font-bold text-center mb-10">
        Mi Cuenta
      </h1>

      {/* Selector de Tema */}
      <div className="text-center mb-8">
        <p className="text-sm mb-2 text-[var(--textSoft)]">
          Tema visual
        </p>

        <div className="flex justify-center gap-3 flex-wrap">
          {Object.entries(THEMES_LABELS).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setTheme(key)}
              className={`px-4 py-1 text-sm rounded-lg border transition ${
                theme === key
                  ? "bg-[var(--primary)] text-white"
                  : "bg-[var(--cardBg)] text-[var(--text)]"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">

        {/* =========================
            SIDEBAR (Columna Izquierda)
        ========================== */}
        <aside className="mi-cuenta-card shadow rounded-xl p-6 space-y-4 h-fit">

          {/* FOTO DE PERFIL */}
          <div className="flex flex-col items-center mb-4">
            <img
              src={previewImg}
              alt="Foto de perfil"
              className="w-28 h-28 rounded-full object-cover border shadow-md"
            />

            <button
              className="mt-3 text-sm text-blue-500 underline hover:text-blue-700"
              onClick={() => fileInputRef.current.click()}
            >
              Cambiar imagen
            </button>

            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>

          <p className="font-semibold text-center">Resumen</p>

          <hr className="my-4" />
          
          {/* Botón para volver al inicio */}
          <div className="text-center mb-4">
            <Link
              href="/"
              className="inline-block px-5 py-2 rounded-lg font-medium bg-[var(--primary)] text-white shadow hover:opacity-90 transition w-full"
            >
              ← Volver al inicio
            </Link>
          </div>

          <div className="text-center">
            <button
              onClick={() => handleLogout()}
              className="text-red-600 font-medium flex items-center justify-center gap-2 w-full hover:bg-red-50 p-2 rounded transition"
            >
              🔒 Cerrar sesión
            </button>
          </div>

          {loggingOut && (
            <div className="fixed inset-0 bg-black/50 flex flex-col justify-center items-center text-white text-xl z-[99999]">
              <div className="loader mb-4"></div>
              Cerrando sesión… por favor espere
            </div>
          )}
        </aside>

        {/* =========================
            INFORMACIÓN DE CONTACTO (Centro)
        ========================== */}
        <section className="mi-cuenta-card shadow rounded-xl p-6 md:col-span-2 h-fit">
          <h2 className="text-lg font-semibold mb-4 border-b pb-2">Información de contacto</h2>

          <div className="space-y-3 text-sm">
            <p className="grid grid-cols-3"><span className="font-medium text-[var(--textSoft)]">Nombre:</span> <span className="col-span-2">{user.nombre} {user.apellido}</span></p>
            <p className="grid grid-cols-3"><span className="font-medium text-[var(--textSoft)]">Email:</span> <span className="col-span-2">{user.email}</span></p>
            <p className="grid grid-cols-3"><span className="font-medium text-[var(--textSoft)]">Teléfono:</span> <span className="col-span-2">{user.telefono || "No registrado"}</span></p>
            <p className="grid grid-cols-3"><span className="font-medium text-[var(--textSoft)]">RUT:</span> <span className="col-span-2">{user.rut || "No registrado"}</span></p>
          </div>

          <button
            onClick={() => setShowEditContacto(true)}
            className="mt-6 px-5 py-2 rounded-lg text-sm font-medium btn-primary"
          >
            Editar
          </button>
        </section>

        {/* =========================
            DIRECCIÓN (Derecha)
        ========================== */}
        <section className="mi-cuenta-card shadow rounded-xl p-6 h-fit">
          <h2 className="text-lg font-semibold mb-4 border-b pb-2">Dirección de envío</h2>

          {user.direccion ? (
            <div className="space-y-2 text-sm">
              <p><span className="font-medium text-[var(--textSoft)]">Calle:</span> {user.direccion.calle} {user.direccion.numero}</p>
              <p><span className="font-medium text-[var(--textSoft)]">Comuna:</span> {user.direccion.comuna}</p>
              <p><span className="font-medium text-[var(--textSoft)]">Región:</span> {user.direccion.region}</p>
            </div>
          ) : (
            <p className="text-[var(--textSoft)] text-sm italic">
              Aún no tienes dirección guardada.
            </p>
          )}

          <button
            onClick={() => setShowEditDireccion(true)}
            className="mt-6 px-5 py-2 rounded-lg text-sm btn-primary"
          >
            {user.direccion ? "Editar dirección" : "Agregar dirección"}
          </button>
        </section>

        {/* =================================================================
            🚀 NUEVA SECCIÓN: HISTORIAL DE PEDIDOS (Ocupa el ancho restante)
           ================================================================= */}
        <section className="mi-cuenta-card shadow rounded-xl p-6 md:col-start-2 md:col-span-3">
          <h2 className="text-xl font-bold mb-4 border-b pb-2 flex justify-between items-center">
            <span>📦 Mis Pedidos Recientes</span>
            <span className="text-sm font-normal text-[var(--textSoft)]">Historial de compras</span>
          </h2>

          {loadingPedidos ? (
            <p className="text-center py-8 text-[var(--textSoft)]">Cargando tus pedidos...</p>
          ) : pedidos.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-100/50 text-[var(--textSoft)] uppercase text-xs">
                  <tr>
                    <th className="px-4 py-3 rounded-l-lg">ID Pedido</th>
                    <th className="px-4 py-3">Fecha</th>
                    <th className="px-4 py-3">Estado</th>
                    <th className="px-4 py-3">Items</th>
                    <th className="px-4 py-3 text-right rounded-r-lg">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {pedidos.map((pedido) => (
                    <tr key={pedido.id} className="hover:bg-black/5 transition-colors">
                      <td className="px-4 py-4 font-medium">#{pedido.id.slice(0, 8)}...</td>
                      <td className="px-4 py-4 text-[var(--textSoft)]">
                        {new Date(pedido.fecha).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-4">
                        <span className={`px-2 py-1 rounded text-xs font-bold 
                          ${pedido.estado === 'PENDIENTE' ? 'bg-yellow-100 text-yellow-700' : 
                            pedido.estado === 'PAGADO' || pedido.estado === 'COMPLETADO' ? 'bg-green-100 text-green-700' : 
                            'bg-gray-100 text-gray-700'}`}>
                          {pedido.estado}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-[var(--textSoft)] max-w-xs truncate">
                        {pedido.pedido_items?.map(i => i.productos?.titulo || i.titulo || "Producto").join(", ")}
                      </td>
                      <td className="px-4 py-4 text-right font-bold">
                        ${Number(pedido.total).toLocaleString('es-CL')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-10 bg-gray-50 rounded-lg border border-dashed">
              <p className="text-gray-500 mb-2">Aún no has realizado ninguna compra.</p>
              <Link href="/catalogo" className="text-[var(--primary)] font-medium hover:underline">
                Ir al catálogo
              </Link>
            </div>
          )}
        </section>

      </div>

      {/* =========================
          MODALES (Sin cambios en lógica interna)
      ========================== */}
      {showEditContacto && (
        <Modal onClose={() => setShowEditContacto(false)}>
          <EditarContactoForm
            user={user}
            setUser={setUser}
            close={() => setShowEditContacto(false)}
          />
        </Modal>
      )}

      {showEditDireccion && (
        <Modal onClose={() => setShowEditDireccion(false)}>
          <EditarDireccionForm
            user={user}
            setUser={setUser}
            close={() => setShowEditDireccion(false)}
          />
        </Modal>
      )}
    </div>
  );
}

/* ============================================================
   MODAL
============================================================ */
function Modal({ children, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-[9999]">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg relative animate-[zoomIn_.2s_ease-out]">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-black text-xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}

/* ============================================================
   FORMULARIO CONTACTO
============================================================ */
function EditarContactoForm({ user, setUser, close }) {
  const [nombre, setNombre] = useState(user.nombre || "");
  const [apellido, setApellido] = useState(user.apellido || ""); // Agregué apellido por si acaso
  const [telefono, setTelefono] = useState(user.telefono || "");
  const [rut, setRut] = useState(user.rut || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [ok, setOk] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setOk("");
    setLoading(true);

    try {
      const res = await fetch("/api/usuarios/edit", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: user.id,
          nombre,
          telefono,
          rut,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setUser(prev => ({ ...prev, nombre, telefono, rut }));
      setOk("Datos actualizados correctamente.");
      setTimeout(close, 1000);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-xl font-semibold mb-4 text-[var(--color-secondary)]">Editar Contacto</h3>

      {error && <p className="text-sm text-red-600 bg-red-50 p-2 rounded">{error}</p>}
      {ok && <p className="text-sm text-green-600 bg-green-50 p-2 rounded">{ok}</p>}

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">Nombre</label>
        <input
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[var(--primary)] outline-none"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">Teléfono</label>
        <input
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[var(--primary)] outline-none"
          value={telefono}
          onChange={e => setTelefono(e.target.value)}
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">RUT</label>
        <input
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[var(--primary)] outline-none"
          value={rut}
          onChange={e => setRut(e.target.value)}
        />
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <button type="button" onClick={close} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
          Cancelar
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-5 py-2 bg-[var(--primary)] text-white rounded-lg hover:opacity-90 transition font-medium"
        >
          {loading ? "Guardando..." : "Guardar cambios"}
        </button>
      </div>
    </form>
  );
}

/* ============================================================
   FORMULARIO DIRECCIÓN
============================================================ */
function EditarDireccionForm({ user, setUser, close }) {
  const [regiones, setRegiones] = useState([]);
  const [regionId, setRegionId] = useState("");
  const [comunaId, setComunaId] = useState("");
  const [calle, setCalle] = useState(user.direccion?.calle || "");
  const [numero, setNumero] = useState(user.direccion?.numero || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [ok, setOk] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/regionesComunas");
        const data = await res.json();

        if (Array.isArray(data)) {
          setRegiones(data);

          if (user.direccion) {
            const r = data.find(reg => reg.nombre === user.direccion.region);
            if (r) {
              setRegionId(r.id.toString());
              const c = r.comunas.find(co => co.nombre === user.direccion.comuna);
              if (c) setComunaId(c.id.toString());
            }
          }
        }
      } catch (e) {
        console.error(e);
      }
    };

    load();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setOk("");
    setLoading(true);

    try {
      const regionObj = regiones.find(r => r.id.toString() === regionId);
      const comunaObj = regionObj?.comunas.find(c => c.id.toString() === comunaId);

      const region = regionObj?.nombre || "";
      const comuna = comunaObj?.nombre || "";

      const direccionId = user.direccion?.id || null;

      const res = await fetch("/api/direccion/actualizar", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          direccionId: direccionId,
          comuna,
          region,
          calle,
          numero,
          usuarioId: user.id,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setUser(prev => ({
        ...prev,
        direccion: {
          id: data.direccion.id,
          comuna,
          region,
          calle,
          numero,
          lat: data.direccion.lat,
          lng: data.direccion.lng,
        }
      }));

      setOk("Dirección actualizada correctamente.");
      setTimeout(close, 1000);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const comunas = regionId
    ? regiones.find(r => r.id.toString() === regionId)?.comunas
    : [];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-xl font-semibold mb-4 text-[var(--color-secondary)]">Editar dirección</h3>

      {error && <p className="text-sm text-red-600 bg-red-50 p-2 rounded">{error}</p>}
      {ok && <p className="text-sm text-green-600 bg-green-50 p-2 rounded">{ok}</p>}

      <div>
        <label className="block text-sm mb-1 font-medium text-gray-700">Región</label>
        <select
          value={regionId}
          onChange={e => { setRegionId(e.target.value); setComunaId(""); }}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[var(--primary)] outline-none bg-white"
          required
        >
          <option value="">Selecciona región</option>
          {regiones.map(r => (
            <option key={r.id} value={r.id}>{r.nombre}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm mb-1 font-medium text-gray-700">Comuna</label>
        <select
          value={comunaId}
          onChange={e => setComunaId(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[var(--primary)] outline-none bg-white"
          required
          disabled={!regionId}
        >
          <option value="">Selecciona comuna</option>
          {comunas && comunas.map(c => (
            <option key={c.id} value={c.id}>{c.nombre}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="col-span-2">
          <label className="block text-sm mb-1 font-medium text-gray-700">Calle</label>
          <input className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[var(--primary)] outline-none" required value={calle} onChange={e=>setCalle(e.target.value)} />
        </div>

        <div>
          <label className="block text-sm mb-1 font-medium text-gray-700">Número</label>
          <input className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[var(--primary)] outline-none" required value={numero} onChange={e=>setNumero(e.target.value)} />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <button type="button" onClick={close} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">Cancelar</button>
        <button type="submit" disabled={loading} className="px-5 py-2 bg-[var(--primary)] text-white rounded-lg hover:opacity-90 transition font-medium">
          {loading ? "Guardando..." : "Guardar dirección"}
        </button>
      </div>
    </form>
  );
}