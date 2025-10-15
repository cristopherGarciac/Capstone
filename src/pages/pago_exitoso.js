import { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/UserContext";

export default function PagoExitoso() {
  const { user } = useContext(UserContext);
  const [boletaVisible, setBoletaVisible] = useState(false);
  const [boleta, setBoleta] = useState(null);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    const cart = storedCart ? JSON.parse(storedCart) : [];
    const total = cart.reduce((acc, it) => acc + it.precio * it.qty, 0);

    if (user && cart.length > 0) {
      fetch("/api/enviar_boleta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email, detalle: cart, total }),
      })
        .then((res) => res.json())
        .then((data) => {
          setBoleta({ cart, total, trackingNumber: data.trackingNumber });
          setBoletaVisible(true);
          localStorage.removeItem("cart");
        })
        .catch((err) => console.error("❌ Error enviando boleta:", err));
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-lg w-full text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">¡Pago Exitoso!</h1>
        <p className="text-gray-700 mb-2">
          Gracias por tu compra en <b>Blitz Hardware</b>.
        </p>
        <p className="text-gray-700 mb-6">
          En breve recibirás tu comprobante de compra al correo:{" "}
          <b>{user ? user.email : "Correo no disponible"}</b>
        </p>

        {boletaVisible && boleta && (
          <div className="mt-6 border-t pt-4">
            <h2 className="text-xl font-bold mb-3">Boleta de tu compra</h2>
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr>
                  <th className="border px-2 py-1 text-left">Producto</th>
                  <th className="border px-2 py-1 text-center">Cantidad</th>
                  <th className="border px-2 py-1 text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {boleta.cart.map((it, i) => (
                  <tr key={i}>
                    <td className="border px-2 py-1">{it.titulo}</td>
                    <td className="border px-2 py-1 text-center">{it.qty}</td>
                    <td className="border px-2 py-1 text-right">
                      ${it.precio * it.qty}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-right font-bold mt-4 text-lg">
              Total: ${boleta.total}
            </p>

            {boleta.trackingNumber && (
              <p className="text-center mt-2 text-gray-600">
                Número de seguimiento: <b>{boleta.trackingNumber}</b>
              </p>
            )}

            <p className="text-center mt-4 text-gray-600">
              Se envió una copia de la boleta a <b>{user.email}</b>.
            </p>

            <button
              onClick={() => setBoletaVisible(false)}
              className="mt-4 bg-[var(--color-accent)] text-white px-4 py-2 rounded hover:opacity-90 w-full"
            >
              Cerrar Boleta
            </button>
          </div>
        )}
      </div>
    </div>
  );
}