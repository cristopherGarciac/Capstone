import { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/UserContext";

const IVA = 0.19;

// Aplica IVA al precio base
function precioConIVA(precio) {
  return Math.round(precio * (1 + IVA));
}

// Aplica cupón
function aplicarCupon(total, cupon) {
  if (!cupon) return total;

  if (cupon.tipo === "porcentaje") {
    return Math.round(total * (1 - cupon.valor / 100));
  }

  if (cupon.tipo === "fijo") {
    return Math.max(0, total - cupon.valor);
  }

  return total;
}

export default function PagoExitoso() {
  const { user } = useContext(UserContext);
  const [boletaVisible, setBoletaVisible] = useState(false);
  const [boleta, setBoleta] = useState(null);

  useEffect(() => {
    const procesarPago = async () => {
      const storedCart = localStorage.getItem("cart");
      const storedCupon = localStorage.getItem("cupon");

      const cart = storedCart ? JSON.parse(storedCart) : [];
      const cupon = storedCupon ? JSON.parse(storedCupon) : null;

      if (!user || cart.length === 0) return;

      // === CALCULAR PRECIOS ===
      const cartConIVA = cart.map((it) => ({
        ...it,
        precioFinal: precioConIVA(it.precio),
        subtotal: precioConIVA(it.precio) * it.qty,
      }));

      let total = cartConIVA.reduce((acc, it) => acc + it.subtotal, 0);

      // Aplicar cupón
      total = aplicarCupon(total, cupon);

      try {
        // 1) ACTUALIZAR STOCK EN BD
        await fetch("/api/actualizar_stock", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            productos: cart.map((p) => ({
              id: p.id,
              qty: p.qty,
            })),
          }),
        });

        // 2) ENVIAR BOLETA
        const res = await fetch("/api/enviar_boleta", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: user.email,
            detalle: cartConIVA,
            total,
            cupon,
          }),
        });

        const data = await res.json();

        // 3) CARGAR BOLETA EN PANTALLA
        setBoleta({
          cart: cartConIVA,
          total,
          cupon,
          trackingNumber: data.trackingNumber,
        });

        setBoletaVisible(true);

        // 4) LIMPIAR CARRITO Y CUPÓN
        localStorage.removeItem("cart");
        localStorage.removeItem("cupon");
      } catch (err) {
        console.error("❌ Error procesando pago:", err);
      }
    };

    procesarPago();
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-lg w-full text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">¡Pago Exitoso!</h1>
        <p className="text-gray-700 mb-2">
          Gracias por tu compra en <b>Blitz Hardware</b>.
        </p>
        <p className="text-gray-700 mb-6">
          En breve recibirás tu comprobante al correo:
          <br />
          <b>{user ? user.email : "Correo no disponible"}</b>
        </p>

        {boletaVisible && boleta && (
          <div className="mt-6 border-t pt-4">
            <h2 className="text-xl font-bold mb-3">Boleta de tu compra</h2>

            {/* TABLA DE PRODUCTOS */}
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
                      ${it.subtotal.toLocaleString("es-CL")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* CUPÓN */}
            {boleta.cupon && (
              <p className="text-green-600 mt-3">
                Cupón aplicado: <b>{boleta.cupon.codigo}</b>
              </p>
            )}

            {/* TOTAL */}
            <p className="text-right font-bold mt-4 text-lg">
              Total: ${boleta.total.toLocaleString("es-CL")}
            </p>

            {/* TRACKING */}
            {boleta.trackingNumber && (
              <p className="text-center mt-2 text-gray-600">
                Número de seguimiento: <b>{boleta.trackingNumber}</b>
              </p>
            )}

            {/* BOTONES */}
            <button
              onClick={() => setBoletaVisible(false)}
              className="mt-4 bg-[var(--color-accent)] text-white px-4 py-2 rounded hover:opacity-90 w-full"
            >
              Cerrar Boleta
            </button>

            <button
              onClick={() => (window.location.href = "/")}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
            >
              Volver al inicio
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
