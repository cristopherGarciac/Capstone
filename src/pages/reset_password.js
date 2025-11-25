import { useState } from "react";
import { useRouter } from "next/router";

export default function ResetPassword() {
  const router = useRouter();
  const { token } = router.query;
  
  const [pass, setPass] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/auth/reset", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password: pass }),
    });

    const data = await res.json();
    if (res.ok) {
      setMsg("Contraseña actualizada. Puedes iniciar sesión.");
      setTimeout(() => router.push("/"), 2000);
    } else {
      setMsg(data.error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">

        <h1 className="text-2xl font-bold mb-4 text-center">
          Restablecer Contraseña
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="password"
            placeholder="Nueva contraseña"
            className="border p-3 rounded-lg"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            required
          />

          <button className="bg-[var(--color-primary)] text-white py-3 rounded-lg">
            Guardar nueva contraseña
          </button>
        </form>

        {msg && <p className="text-center mt-4 text-gray-600">{msg}</p>}
      </div>
    </div>
  );
}
