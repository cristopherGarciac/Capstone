import { useUser } from "../context/UserContext";
import { useState, useEffect, useRef } from "react";
import { useThemeCuenta } from "../hooks/useThemeCuenta";
import Link from "next/link";

export default function MiCuenta() {
  const { user, setUser, logout } = useUser();
  const [showEditContacto, setShowEditContacto] = useState(false);
  const [showEditDireccion, setShowEditDireccion] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

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

  const fileInputRef = useRef(null);
  const [previewImg, setPreviewImg] = useState(
    user?.fotoperfil || "/images/default-user.jpg"
  );

  // ============================================================
  // CARGAR FOTO PREVIA
  // ============================================================
  useEffect(() => {
    if (user?.fotoperfil) {
      setPreviewImg(user.fotoperfil);
    }
  }, [user]);

  // ============================================================
  // CARGAR PEDIDOS AUTOMÁTICAMENTE
  // ============================================================
  useEffect(() => {
    const cargarPedidos = async () => {
      if (!user?.email) return;

      setLoadingPedidos(true);
      try {
        const res = await fetch(`/api/obtener_pedidos?email=${user.email}`);
        const data = await res.json();
        setPedidos(data.pedidos || []);
      } catch (err) {
        console.error("Error cargando pedidos:", err);
      } finally {
        setLoadingPedidos(false);
      }
    };

    cargarPedidos();
  }, [user?.email]);

  // ============================================================
  // LOGOUT
  // ============================================================
  const handleLogout = () => {
    setLoggingOut(true);

    setTimeout(() => {
      logout();
      window.location.href = "/";
    }, 2000);
  };

  if (!user) return <p className="p-6">Cargando...</p>;

  // ============================================================
  // SUBIR NUEVA FOTO
  // ============================================================
  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imgURL = URL.createObjectURL(file);
    setPreviewImg(imgURL);

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result;

      try {
        const res = await fetch("/api/usuarios/foto", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: user.id, foto: base64 }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error);

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

  return (
    <div className="mi-cuenta-page min-h-screen py-10 px-4 transition-all">
      {/* TÍTULO */}
      <h1 className="text-3xl font-bold text-center mb-10">Mi Cuenta</h1>

      {/* SELECTOR DE TEMA */}
      <div className="text-center mb-8">
        <p className="text-sm mb-2 text-[var(--textSoft)]">Tema visual</p>

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
        {/* SIDEBAR */}
        <aside className="mi-cuenta-card shadow rounded-xl p-6 space-y-4">
          <div className="flex flex-col items-center mb-4">
            <img
              src={previewImg}
              alt="Foto de perfil"
              className="w-28 h-28 rounded-full object-cover border shadow-md"
            />

            <button
              className="mt-3 text-sm text-blue-500 underline"
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

          <p className="font-semibold">Resumen</p>

          <button className="block text-left text-[var(--textSoft)] hover:text-[var(--text)]">
            Mis pedidos
          </button>

          <hr className="my-4" />

          <div className="text-center mb-8">
            <Link
              href="/"
              className="inline-block px-5 py-2 rounded-lg font-medium bg-[var(--primary)] text-white shadow hover:opacity-90 transition"
            >
              ← Volver al inicio
            </Link>
          </div>

          {loggingOut && (
            <div className="fixed inset-0 bg-black/50 flex flex-col justify-center items-center text-white text-xl z-[99999]">
              <div className="loader mb-4"></div>
              Cerrando sesión… por favor espere
            </div>
          )}

          <button
            onClick={handleLogout}
            className="text-red-600 font-medium flex items-center gap-2"
          >
            🔒 Cerrar sesión
          </button>
        </aside>

        {/* INFORMACIÓN DE CONTACTO */}
        <section className="mi-cuenta-card shadow rounded-xl p-6 md:col-span-2">
          <h2 className="text-lg font-semibold mb-4">Información de contacto</h2>

          <div className="space-y-2 text-sm">
            <p><strong>Nombre:</strong> {user.nombre}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Teléfono:</strong> {user.telefono}</p>
            <p><strong>RUT:</strong> {user.rut}</p>
          </div>

          <button
            onClick={() => setShowEditContacto(true)}
            className="mt-5 px-5 py-2 rounded-lg text-sm font-medium btn-primary"
          >
            Editar
          </button>
        </section>

        {/* DIRECCIÓN */}
        <section className="mi-cuenta-card shadow rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">Dirección de envío predeterminada</h2>

          {user.direccion ? (
            <>
              <p><strong>Calle:</strong> {user.direccion.calle} {user.direccion.numero}</p>
              <p><strong>Comuna:</strong> {user.direccion.comuna}</p>
              <p><strong>Región:</strong> {user.direccion.region}</p>
            </>
          ) : (
            <p className="text-[var(--textSoft)] text-sm">
              Aún no tienes dirección guardada.
            </p>
          )}

          <button
            onClick={() => setShowEditDireccion(true)}
            className="mt-5 px-5 py-2 rounded-lg text-sm btn-primary"
          >
            Editar dirección
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

      {/* MODALES */}
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
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-black text-xl"
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

      setUser((prev) => ({ ...prev, nombre, telefono, rut }));
      setOk("Datos actualizados correctamente.");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-xl font-semibold mb-2">Editar información de contacto</h3>

      {error && <p className="text-sm text-red-600">{error}</p>}
      {ok && <p className="text-sm text-green-600">{ok}</p>}

      <div>
        <label className="block mb-1 text-sm font-medium">Nombre</label>
        <input
          className="w-full border rounded-lg px-3 py-2"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">Teléfono</label>
        <input
          className="w-full border rounded-lg px-3 py-2"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">RUT</label>
        <input
          className="w-full border rounded-lg px-3 py-2"
          value={rut}
          onChange={(e) => setRut(e.target.value)}
        />
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={close}
          className="px-4 py-2 border rounded-lg"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-5 py-2 btn-primary rounded-lg"
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

  // Cargar regiones/comunas
  useEffect(() => {
    const load = async () => {
      const res = await fetch("/api/regionesComunas");
      const data = await res.json();

      if (Array.isArray(data)) {
        setRegiones(data);

        if (user.direccion) {
          const r = data.find((reg) => reg.nombre === user.direccion.region);
          if (r) {
            setRegionId(r.id.toString());
            const c = r.comunas.find((co) => co.nombre === user.direccion.comuna);
            if (c) setComunaId(c.id.toString());
          }
        }
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
      const regionObj = regiones.find((r) => r.id.toString() === regionId);
      const comunaObj = regionObj?.comunas.find((c) => c.id.toString() === comunaId);

      const region = regionObj?.nombre || "";
      const comuna = comunaObj?.nombre || "";

      const direccionId = user.direccion?.id || null;

      const res = await fetch("/api/direccion/actualizar", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          direccionId,
          comuna,
          region,
          calle,
          numero,
          usuarioId: user.id,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setUser((prev) => ({
        ...prev,
        direccion: {
          id: data.direccion.id,
          comuna,
          region,
          calle,
          numero,
          lat: data.direccion.lat,
          lng: data.direccion.lng,
        },
      }));

      setOk("Dirección actualizada correctamente.");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const comunas = regionId
    ? regiones.find((r) => r.id.toString() === regionId)?.comunas
    : [];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-xl font-semibold mb-2">Editar dirección</h3>

      {error && <p className="text-sm text-red-600">{error}</p>}
      {ok && <p className="text-sm text-green-600">{ok}</p>}

      <div>
        <label className="block text-sm mb-1 font-medium">Región</label>
        <select
          value={regionId}
          onChange={(e) => {
            setRegionId(e.target.value);
            setComunaId("");
          }}
          className="w-full border rounded-lg px-3 py-2"
          required
        >
          <option value="">Selecciona región</option>
          {regiones.map((r) => (
            <option key={r.id} value={r.id}>
              {r.nombre}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm mb-1 font-medium">Comuna</label>
        <select
          value={comunaId}
          onChange={(e) => setComunaId(e.target.value)}
          className="w-full border rounded-lg px-3 py-2"
          required
        >
          <option value="">Selecciona comuna</option>
          {comunas &&
            comunas.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nombre}
              </option>
            ))}
        </select>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="col-span-2">
          <label className="block text-sm mb-1 font-medium">Calle</label>
          <input
            className="w-full border rounded-lg px-3 py-2"
            required
            value={calle}
            onChange={(e) => setCalle(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm mb-1 font-medium">Número</label>
          <input
            className="w-full border rounded-lg px-3 py-2"
            required
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={close}
          className="px-4 py-2 border rounded-lg"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-5 py-2 btn-primary rounded-lg"
        >
          {loading ? "Guardando..." : "Guardar dirección"}
        </button>
      </div>
    </form>
  );
}
