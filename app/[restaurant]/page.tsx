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
        <div className="glass-container glass-container--rounded w-full">
          <div className="glass-filter" />
          <div className="glass-overlay" />
          <div className="glass-specular" />

          <div className="glass-content flex-col text-center">
            <div className="mb-6 relative">
              <Image
                src={settings.logo || "/images/logo.png"}
                alt={settings.name}
                width={160}
                height={160}
                className="rounded-full shadow-2xl mx-auto"
              />
            </div>

            <h1 className="text-4xl font-bold">{settings.name}</h1>

            <p className="mt-2 text-gray-700">{settings.description}</p>

            <div className="mt-8 space-y-4">
              <Link href={`/${restaurant}/menu`}>
                <button className="glass-button w-full py-3">
                  Ver menú
                </button>
              </Link>
              <Link href={`/${restaurant}/location`}>
                <button className="glass-button w-full py-3">
                  Ubicación
                </button>
              </Link>

              <Link href={`/${restaurant}/contact`}>
                <button className="glass-button w-full py-3">
                  Contacto
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
