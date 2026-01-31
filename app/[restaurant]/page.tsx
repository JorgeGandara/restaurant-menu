import Image from "next/image";
import Link from "next/link";
import { getRestaurantSettings } from "@/sanity/sanity-utils";
import { notFound } from "next/navigation";
import AdminButton from "./components/AdminButton";
import AdminActivator from "./components/AdminActivator";
import { urlFor } from "@/sanity/lib/image";

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
    <main className="w-full min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-orange-50/10 via-gray-50/50 to-orange-50/10">
      <div className="w-full max-w-md">

        {/* Card principal */}
        <div className="glass-container glass-container--rounded w-full shadow-2xl shadow-orange-500/10 hover:shadow-orange-500/20 transition-all duration-500 hover:-translate-y-1">
          <div className="glass-filter"></div>
          <div className="glass-overlay"></div>
          <div className="glass-specular"></div>

          <div className="glass-content flex-col text-center relative">

            {/* Decorative glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-orange-500/20 blur-3xl rounded-full -z-10 animate-pulse"></div>
            <div className="absolute top-10 left-1/2 -translate-x-1/2 w-32 h-32 bg-orange-400/10 blur-2xl rounded-full -z-10 animate-pulse [animation-delay:1s]"></div>

            {/* Logo */}
            <AdminActivator restaurant={restaurant}>
              <div className="mb-6 relative cursor-default">
                {settings.logo ? (
                  <Image
                    src={urlFor(settings.logo).url()}
                    alt={settings.name}
                    width={160}
                    height={160}
                    className="rounded-full shadow-2xl shadow-orange-500/30 relative z-10 border-4 border-white/40 mx-auto"
                  />
                ) : (
                  <div className="w-40 h-40 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative z-10 border-4 border-white/40 mx-auto text-gray-400 shadow-2xl shadow-orange-500/20">
                    Sin Logo
                  </div>
                )}
              </div>
            </AdminActivator>

            {/* Nombre */}
            <h1 className="text-6xl font-bold mb-2 bg-gradient-to-br from-orange-600 via-orange-500 to-orange-700 bg-clip-text text-transparent drop-shadow-sm">
              {settings.name}
            </h1>

            {/* Descripción */}
            <p className="text-gray-800 text-lg font-medium mb-8 max-w-xs mx-auto leading-relaxed transition-all duration-300 hover:text-orange-800 hover:scale-105">
              {settings.description}
            </p>

            <div className="w-64 h-0.5 bg-gradient-to-r from-transparent via-orange-500/60 to-transparent mx-auto mb-4"></div>

            {/* Botones */}
            <div className="w-full flex flex-col gap-6">

              {/* Ver menú */}
              <Link href={`/${restaurant}/menu`} className="w-full group">
                <div className="glass-container glass-container--rounded w-full p-0 transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-orange-500/40 group-active:scale-95 shadow-lg shadow-orange-500/20 group-hover:-translate-y-1">
                  <div className="glass-filter"></div>
                  <div className="glass-overlay"></div>
                  <div className="glass-specular"></div>
                  <div className="glass-content w-full justify-center py-4 bg-gradient-to-br from-orange-500/25 via-orange-500/20 to-orange-400/25 relative overflow-hidden">
                    {/* Efecto de brillo al hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-400/0 to-orange-600/0 group-hover:from-orange-400/20 group-hover:to-orange-600/20 transition-all duration-500"></div>
                    <span className="text-xl font-bold tracking-wide text-gray-900 drop-shadow-sm relative z-10 group-hover:text-orange-900 group-hover:scale-110 transition-all duration-300 inline-block">
                      ✨ Ver Menú
                    </span>
                  </div>
                </div>
              </Link>

              {/* Ubicación & Contacto */}
              <div className="flex flex-col gap-4">

                <Link href={`/${restaurant}/location`} className="w-full group">
                  <div className="glass-container glass-container--rounded w-full p-0 transition-all duration-300 group-hover:scale-[1.03] group-hover:shadow-xl group-hover:shadow-orange-500/20 group-active:scale-95 shadow-md shadow-gray-400/10 group-hover:-translate-y-0.5">
                    <div className="glass-filter"></div>
                    <div className="glass-overlay"></div>
                    <div className="glass-specular"></div>
                    <div className="glass-content w-full justify-center py-3 relative overflow-hidden bg-gradient-to-br from-white/50 to-orange-50/30 group-hover:from-orange-50/40 group-hover:to-orange-100/40 transition-all duration-500">
                      {/* Efecto de brillo sutil */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-200/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                      <span className="text-lg font-medium text-gray-900 relative z-10 group-hover:text-orange-800 group-hover:scale-105 transition-all duration-300 inline-block">
                        📍 Ubicación
                      </span>
                    </div>
                  </div>
                </Link>

                <Link href={`/${restaurant}/contact`} className="w-full group">
                  <div className="glass-container glass-container--rounded w-full p-0 transition-all duration-300 group-hover:scale-[1.03] group-hover:shadow-xl group-hover:shadow-orange-500/20 group-active:scale-95 shadow-md shadow-gray-400/10 group-hover:-translate-y-0.5">
                    <div className="glass-filter"></div>
                    <div className="glass-overlay"></div>
                    <div className="glass-specular"></div>
                    <div className="glass-content w-full justify-center py-3 relative overflow-hidden bg-gradient-to-br from-white/50 to-orange-50/30 group-hover:from-orange-50/40 group-hover:to-orange-100/40 transition-all duration-500">
                      {/* Efecto de brillo sutil */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-200/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                      <span className="text-lg font-medium text-gray-900 relative z-10 group-hover:text-orange-800 group-hover:scale-105 transition-all duration-300 inline-block">
                        💬 Contacto
                      </span>
                    </div>
                  </div>
                </Link>

              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}