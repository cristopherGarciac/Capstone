import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";

export default function Seguimiento() {
  const { user } = useContext(UserContext);
  const [codigo, setCodigo] = useState("");
  const [pedidos, setPedidos] = useState([]);
  const [buscando, setBuscando] = useState(false);

  const buscarPedidos = async () => {
    if (!codigo && !user) return;

    setBuscando(true);

    try {
      const res = await fetch(
        `/api/obtener_pedidos?${codigo ? `codigo=${codigo}` : `email=${user.email}`}`
      );
      const data = await res.json();
      setPedidos(data.pedidos || []);
    } catch (error) {
      console.error("Error al buscar pedidos:", error);
      setPedidos([]);
    } finally {
      setBuscando(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-[var(--color-secondary)] mb-6">
        Seguimiento de mi compra
      </h1>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Ingresa tu código de seguimiento"
          className="border p-2 rounded w-full sm:w-80"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
        />
        <button
          onClick={buscarPedidos}
          className="btn-primary px-6 py-2 rounded text-white bg-[var(--color-primary)] hover:bg-[var(--color-accent)]"
        >
          {buscando ? "Buscando..." : "Buscar"}
        </button>
      </div>

      {pedidos.length > 0 && (
        <div className="w-full max-w-3xl bg-white rounded-xl shadow p-4">
          <h2 className="text-xl font-bold mb-3">Estado de tu pedido</h2>
          {pedidos.map((pedido, index) => (
            <div key={index} className="mb-6 border-b pb-4">
              <p className="font-semibold mb-2">
                Pedido #{pedido.id} - Estado:{" "}
                <span className="text-green-600">{pedido.estado}</span>
              </p>
              <p className="text-sm mb-2">
                Fecha: {new Date(pedido.fecha).toLocaleString()}
              </p>
              {pedido.direcciones && (
                <p className="text-sm mb-2">
                  Dirección de envío: {pedido.direcciones.calle}, {pedido.direcciones.numero}, {pedido.direcciones.comuna}, {pedido.direcciones.region}
                </p>
              )}

              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border px-2 py-1 text-left">Producto</th>
                    <th className="border px-2 py-1 text-center">Cantidad</th>
                    <th className="border px-2 py-1 text-right">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {pedido.pedido_items.map((item, i) => (
                    <tr key={i}>
                      <td className="border px-2 py-1">{item.productos?.titulo}</td>
                      <td className="border px-2 py-1 text-center">{item.cantidad}</td>
                      <td className="border px-2 py-1 text-right">
                        ${item.precio_unit * item.cantidad}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <p className="text-right font-bold mt-2 text-lg">
                Total: ${pedido.total}
              </p>
            </div>
          ))}
        </div>
      )}

      {pedidos.length === 0 && !buscando && (
        <p className="text-gray-500 mt-4">
          Ingresa tu código de seguimiento o inicia sesión para ver tus pedidos.
        </p>
      )}
      <p className="font-semibold mb-2">
  Pedido #{pedidos.id} - Tracking: <span className="text-blue-600">{pedidos.trackingNumber}</span> - Estado: <span className="text-green-600">{pedidos.estado}</span>
</p>

    </main>
  );
}
