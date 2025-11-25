// src/pages/logout.js
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/");
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-3xl font-semibold text-blue-600 mb-4">
        Has cerrado la sesión
      </h1>

      <p className="text-lg text-gray-700">
        Usted ha cerrado la sesión e irá a su página de inicio en{" "}
        <strong>5 segundos</strong>.
      </p>
    </div>
  );
} 