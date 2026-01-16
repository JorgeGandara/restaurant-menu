import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="w-full min-h-screen flex items-center justify-center">

      <div className="w-full max-w-md px-6">

        {/* Card */}
        <div className="bg-white/90 backdrop-blur rounded-2xl shadow-xl p-6 flex flex-col items-center">

          {/* Logo */}
          <div className="mb-4">
            <Image
              src="/images/logo.png"
              alt="Logo del restaurante"
              width={140}
              height={140}
              className="rounded-full"
            />

          </div>

          {/* Bienvenida */}
          <h1 className="text-2xl font-semibold text-orange-600 mb-1">
            ¡Bienvenidos!
          </h1>
          <p className="text-gray-600 text-center mb-6">
            Disfruta lo mejor de la comida de mar
          </p>

          {/* Botones */}
          <div className="w-full flex flex-col gap-4">

            <Link href="/menu">
              <button className="w-full py-4 rounded-xl bg-orange-500 text-white text-lg font-medium hover:bg-orange-400 transition">
                Ver Menú
              </button>
            </Link>

            <Link href="/location">
              <button className="w-full py-4 rounded-xl border border-orange-500 text-orange-500 text-lg font-medium hover:bg-orange-50 transition">
                📍 Ubicación 📍
              </button>
            </Link>

            <Link href="/contact">
              <button className="w-full py-4 rounded-xl border border-orange-500 text-orange-500 text-lg font-medium hover:bg-orange-50 transition">
                📲​ Contacto 📲​
              </button>
            </Link>

          </div>

        </div>

      </div>

    </main>
  );
}
