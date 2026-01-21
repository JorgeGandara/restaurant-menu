import Image from "next/image";
import Link from "next/link";
import { getRestaurantSettings } from "@/sanity/sanity-utils";
import { notFound } from "next/navigation";

interface HomeProps {
  params: Promise<{
    restaurant?: string;
  }>;
}

export default async function Home({ params }: HomeProps) {
  const { restaurant } = await params;

  if (!restaurant) {
    notFound();
  }

  const settings = await getRestaurantSettings(restaurant);

  if (!settings) {
    notFound();
  }

  return (
    <main className="w-full min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        {/* Card principal */}
        <div className="glass-container glass-container--rounded w-full">
          <div className="glass-filter"></div>
          <div className="glass-overlay"></div>
          <div className="glass-specular"></div>

          <div className="glass-content flex-col text-center relative">

            {/* Decorative glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-orange-500/20 blur-3xl rounded-full -z-10"></div>

            {/* Logo */}
            <div className="mb-6 relative">
              <div className="absolute inset-0 bg-white/20 blur-xl rounded-full scale-110"></div>
              <Image
                src={settings.logo || "/images/logo.png"}
                alt={settings.name}
                width={160}
                height={160}
                className="rounded-full shadow-2xl relative z-10 border-4 border-white/30 mx-auto"
              />
            </div>

            {/* Nombre */}
            <h1 className="text-6xl font-bold text-gray-900 mb-2">
              {settings.name}
            </h1>

            {/* Descripción */}
            <p className="text-gray-800 text-lg font-medium mb-8 max-w-xs mx-auto">
              {settings.description}
            </p>

            {/* Botones */}
            <div className="w-full flex flex-col gap-6">

              {/* Ver menú */}
              <Link href={`/${restaurant}/menu`} className="w-full group">
                <div className="glass-container glass-container--rounded w-full p-0 transition-transform duration-300 group-hover:scale-[1.02]">
                  <div className="glass-filter"></div>
                  <div className="glass-overlay"></div>
                  <div className="glass-specular"></div>
                  <div className="glass-content w-full justify-center py-4 bg-orange-500/20">
                    <span className="text-xl font-bold tracking-wide text-gray-900 drop-shadow-sm">
                      Ver Menú
                    </span>
                  </div>
                </div>
              </Link>

              {/* Ubicación & Contacto */}
              <div className="flex flex-col gap-4">

                <Link href={`/${restaurant}/location`} className="w-full group">
                  <div className="glass-container glass-container--rounded w-full p-0 transition-transform duration-300 group-hover:scale-[1.02]">
                    <div className="glass-filter"></div>
                    <div className="glass-overlay"></div>
                    <div className="glass-specular"></div>
                    <div className="glass-content w-full justify-center py-3">
                      <span className="text-lg font-medium text-gray-900">
                        Ubicación
                      </span>
                    </div>
                  </div>
                </Link>

                <Link href={`/${restaurant}/contact`} className="w-full group">
                  <div className="glass-container glass-container--rounded w-full p-0 transition-transform duration-300 group-hover:scale-[1.02]">
                    <div className="glass-filter"></div>
                    <div className="glass-overlay"></div>
                    <div className="glass-specular"></div>
                    <div className="glass-content w-full justify-center py-3">
                      <span className="text-lg font-medium text-gray-900">
                        Contacto
                      </span>
                    </div>
                  </div>
                </Link>

              </div>
            </div>

            {/* Footer dinámico */}
            {(settings.address || settings.phone) && (
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
