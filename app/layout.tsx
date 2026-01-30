import type { Metadata } from "next";
import { Montserrat, Playfair_Display } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { client } from "../sanity/lib/client";
import imageUrlBuilder from "@sanity/image-url";

// Fuente de Google Fonts y fuente local



const builder = imageUrlBuilder(client);

function urlFor(source: any) {
  return builder.image(source);
}

export const metadata: Metadata = {
  title: "Multiware Menu",
  description: "Plataforma de menús digitales para restaurantes",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Obtén las configuraciones de Sanity
  const settings = await client.fetch(
    `*[_type == "restaurantSettings" && restaurant->slug.current == "marviche"][0]{
      backgroundImage,
      typography
    }`
  );

  const backgroundImageUrl = settings?.backgroundImage
    ? urlFor(settings.backgroundImage).url()
    : null;

  const typography = settings?.typography || {};
  console.log("Typography settings:", typography);
  return (
    <html
      lang="es"
      style={{
        "--font-family": typography.fontFamily || "var(--font-montserrat)",
        "--font-size": typography.fontSize || "16px",
        "--font-weight": typography.fontWeight || "400",
      } as React.CSSProperties}
    >
      <body
        style={{
          backgroundImage: backgroundImageUrl
            ? `url(${backgroundImageUrl})`
            : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {children}

        {/* SVG global reutilizable */}
        <svg className="absolute w-0 h-0 pointer-events-none">
          <defs>
            <filter id="lensFilter">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.01"
                numOctaves="3"
                result="noise"
              />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" />
            </filter>
          </defs>
        </svg>
      </body>
    </html>
  );
}

