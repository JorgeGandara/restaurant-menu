import Image from "next/image";
import Link from "next/link";
import { getRestaurantSettings } from "@/sanity/sanity-utils";
import { notFound } from "next/navigation";
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
    <main className="w-full min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        {/* Card principal */}
        <div className="glass-container glass-container--rounded w-full shadow-2xl transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_25px_-5px_color-mix(in_srgb,var(--primary-color),transparent_80%)]">
          <div className="glass-filter"></div>
          <div className="glass-overlay"></div>
          <div className="glass-specular"></div>

          <div className="glass-content flex-col text-center relative">

            {/* Decorative glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-[color:color-mix(in_srgb,var(--primary-color),transparent_80%)] blur-3xl rounded-full -z-10 animate-pulse"></div>
            <div className="absolute top-10 left-1/2 -translate-x-1/2 w-32 h-32 bg-[color:color-mix(in_srgb,var(--primary-color),transparent_90%)] blur-2xl rounded-full -z-10 animate-pulse [animation-delay:1s]"></div>

            {/* Logo */}
            <AdminActivator restaurant={restaurant}>
              <div className="mb-6 relative cursor-default">
                {settings.logo ? (
                  <Image
                    src={urlFor(settings.logo).url()}
                    alt={settings.name}
                    width={160}
                    height={160}
                    className="rounded-full shadow-2xl relative z-10 border-4 border-white/40 mx-auto"
                    style={{
                      boxShadow: `0 25px 50px -12px color-mix(in srgb, var(--primary-color), transparent 70%)`
                    }}
                  />
                ) : (
                  <div
                    className="w-40 h-40 rounded-full flex items-center justify-center relative z-10 border-4 border-white/40 mx-auto text-white shadow-2xl"
                    style={{
                      background: `linear-gradient(135deg, color-mix(in srgb, var(--primary-color), white 20%), color-mix(in srgb, var(--primary-color), black 10%))`,
                      boxShadow: `0 25px 50px -12px color-mix(in srgb, var(--primary-color), transparent 80%)`
                    }}
                  >
                    Sin Logo
                  </div>
                )}
              </div>
            </AdminActivator>

            {/* Nombre */}
            <h1
              className="text-6xl font-bold mb-2 bg-clip-text text-transparent drop-shadow-sm"
              style={{
                backgroundImage: `linear-gradient(135deg, color-mix(in srgb, var(--primary-color), black 10%), color-mix(in srgb, var(--primary-color), white 10%), color-mix(in srgb, var(--primary-color), black 20%))`
              }}
            >
              {settings.name}
            </h1>

            {/* Descripción */}
            <p className="text-gray-800 text-lg font-medium mb-8 max-w-xs mx-auto leading-relaxed transition-all duration-300 hover:scale-105 hover:text-[color:color-mix(in_srgb,var(--primary-color),black_20%)]">
              {settings.description}
            </p>

            <div className="w-64 h-0.5 mx-auto mb-4" style={{ background: `linear-gradient(90deg, transparent, color-mix(in srgb, var(--primary-color), transparent 40%), transparent)` }}></div>

            {/* Botones */}
            <div className="w-full flex flex-col gap-6">

              {/* Ver menú */}
              <Link href={`/${restaurant}/menu`} className="w-full group">
                <div className="glass-container glass-container--rounded w-full p-0 transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl group-active:scale-95 shadow-lg group-hover:-translate-y-1">
                  <div className="glass-filter"></div>
                  <div className="glass-overlay"></div>
                  <div className="glass-specular"></div>
                  <div
                    className="glass-content w-full justify-center py-4 relative overflow-hidden"
                    style={{ background: `linear-gradient(135deg, color-mix(in srgb, var(--primary-color), transparent 75%), color-mix(in srgb, var(--primary-color), transparent 80%), color-mix(in srgb, var(--primary-color), transparent 75%))` }}
                  >
                    {/* Efecto de brillo al hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                    <div className="absolute inset-0 transition-all duration-500 opacity-0 group-hover:opacity-100"
                      style={{ background: `linear-gradient(135deg, color-mix(in srgb, var(--primary-color), transparent 80%), color-mix(in srgb, var(--primary-color), transparent 80%))` }}
                    ></div>
                    <span
                      className="text-xl font-bold tracking-wide text-gray-900 drop-shadow-sm relative z-10 group-hover:scale-110 transition-all duration-300 inline-block group-hover:text-[color:color-mix(in_srgb,var(--primary-color),black_30%)]"
                    >
                      Ver Menú
                    </span>
                  </div>
                </div>
              </Link>

              {/* Ubicación & Contacto */}
              <div className="flex flex-col gap-4">

                <Link href={`/${restaurant}/location`} className="w-full group">
                  <div className="glass-container glass-container--rounded w-full p-0 transition-all duration-300 group-hover:scale-[1.03] group-hover:shadow-xl group-active:scale-95 shadow-md shadow-gray-400/10 group-hover:-translate-y-0.5">
                    <div className="glass-filter"></div>
                    <div className="glass-overlay"></div>
                    <div className="glass-specular"></div>
                    <div className="glass-content w-full justify-center py-3 relative overflow-hidden bg-gradient-to-br from-white/50 to-gray-50/30">
                      {/* Background tint on hover */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: `linear-gradient(135deg, white, color-mix(in srgb, var(--primary-color), transparent 90%))` }}></div>
                      {/* Efecto de brillo sutil */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[color:color-mix(in_srgb,var(--primary-color),transparent_80%)]/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                      <span className="text-lg font-medium text-gray-900 relative z-10 group-hover:scale-105 transition-all duration-300 inline-block group-hover:text-[color:color-mix(in_srgb,var(--primary-color),black_20%)]">
                        Ubicación
                      </span>
                    </div>
                  </div>
                </Link>

                <Link href={`/${restaurant}/contact`} className="w-full group">
                  <div className="glass-container glass-container--rounded w-full p-0 transition-all duration-300 group-hover:scale-[1.03] group-hover:shadow-xl group-active:scale-95 shadow-md shadow-gray-400/10 group-hover:-translate-y-0.5">
                    <div className="glass-filter"></div>
                    <div className="glass-overlay"></div>
                    <div className="glass-specular"></div>
                    <div className="glass-content w-full justify-center py-3 relative overflow-hidden bg-gradient-to-br from-white/50 to-gray-50/30">
                      {/* Background tint on hover */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: `linear-gradient(135deg, white, color-mix(in srgb, var(--primary-color), transparent 90%))` }}></div>
                      {/* Efecto de brillo sutil */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[color:color-mix(in_srgb,var(--primary-color),transparent_80%)]/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                      <span className="text-lg font-medium text-gray-900 relative z-10 group-hover:scale-105 transition-all duration-300 inline-block group-hover:text-[color:color-mix(in_srgb,var(--primary-color),black_20%)]">
                        Contacto
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