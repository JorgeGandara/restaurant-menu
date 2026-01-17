import Image from "next/image";
import Link from "next/link";
import { getRestaurantSettings } from "../sanity/sanity-utils";

export default async function Home() {
  const settings = await getRestaurantSettings();

  return (
    <main className="w-full min-h-screen flex items-center justify-center p-4">

      <div className="w-full max-w-md">

        {/* Card */}
        {/* Card */}
        <div className="glass-container glass-container--rounded w-full">
          <div className="glass-filter"></div>
          <div className="glass-overlay"></div>
          <div className="glass-specular"></div>

          <div className="glass-content flex-col text-center">

            {/* Decorative Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-orange-500/20 blur-3xl rounded-full -z-10"></div>

            {/* Logo */}
            <div className="mb-6 relative">
              <div className="absolute inset-0 bg-white/20 blur-xl rounded-full scale-110"></div>
              <Image
                src="/images/logo.png"
                alt={settings?.name || "Restaurante"}
                width={160}
                height={160}
                className="rounded-full shadow-2xl relative z-10 border-4 border-white/30"
              />
            </div>

            {/* Bienvenida */}
            <h1 className="text-6xl text-gray-900 mb-2 font-bold">
              {settings?.name || "Marviche"}
            </h1>
            <p className="text-gray-800 text-lg font-medium mb-8 max-w-xs">
              {settings?.description || "Disfruta lo mejor de la comida de mar"}
            </p>

            {/* Botones */}
            <div className="w-full flex flex-col gap-6">

              <Link href="/menu" className="w-full group">
                <div className="glass-container glass-container--rounded w-full p-0 transition-transform duration-300 group-hover:scale-[1.02]">
                  <div className="glass-filter"></div>
                  <div className="glass-overlay"></div>
                  <div className="glass-specular"></div>
                  <div className="glass-content w-full justify-center py-4 bg-orange-500/20">
                    <span className="text-xl font-bold tracking-wide text-gray-900 drop-shadow-sm">Ver Menú</span>
                  </div>
                </div>
              </Link>

              <div className="flex flex-col gap-4">
                <Link href="/location" className="w-full group">
                  <div className="glass-container glass-container--rounded w-full p-0 transition-transform duration-300 group-hover:scale-[1.02]">
                    <div className="glass-filter"></div>
                    <div className="glass-overlay"></div>
                    <div className="glass-specular"></div>
                    <div className="glass-content w-full justify-center gap-3 py-3">
                      <span className="text-lg font-medium text-gray-900">Ubicación</span>
                    </div>
                  </div>
                </Link>

                <Link href="/contact" className="w-full group">
                  <div className="glass-container glass-container--rounded w-full p-0 transition-transform duration-300 group-hover:scale-[1.02]">
                    <div className="glass-filter"></div>
                    <div className="glass-overlay"></div>
                    <div className="glass-specular"></div>
                    <div className="glass-content w-full justify-center gap-3 py-3">
                      <span className="text-lg font-medium text-gray-900">Contacto</span>
                    </div>
                  </div>
                </Link>
              </div>

            </div>

            {/* Dynamic Footer Info */}
            {(settings?.address || settings?.phone) && (
              <div className="mt-8 pt-6 border-t border-gray-900/10 w-full text-sm text-gray-800 font-medium">
                {settings.address && <p>{settings.address}</p>}
                {settings.phone && <p>{settings.phone}</p>}
              </div>
            )}
          </div>
        </div>

      </div>

    </main>
  );
}
