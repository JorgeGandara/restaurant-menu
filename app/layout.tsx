import type { Metadata } from "next";
import { Montserrat, Playfair_Display } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { client } from "../sanity/lib/client";
import imageUrlBuilder from "@sanity/image-url";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const faith = localFont({
  src: "./fonts/faith.ttf",
  variable: "--font-faith",
});

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
  const settings = await client.fetch(
    `*[_type == "restaurantSettings" && restaurant->slug.current == "your_slug"][0]{backgroundImage}`
  );

  const backgroundImageUrl = settings?.backgroundImage
    ? urlFor(settings.backgroundImage).url()
    : null;

  return (
    <html lang="es">
      <body
        className={`
          ${montserrat.variable}
          ${playfair.variable}
          ${faith.variable}
          antialiased
          min-h-screen
        `}
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

