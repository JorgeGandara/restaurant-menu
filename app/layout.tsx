import type { Metadata } from "next";
import {
  Playfair_Display,
  Bebas_Neue,
  Cormorant,
  Montserrat,
  Righteous,
  Dancing_Script,
  Oswald,
  Lora,
  Poppins,
  Inter,
  Nunito,
  Crimson_Text
} from 'next/font/google';
import "./globals.css";
import { client } from "../sanity/lib/client";
import imageUrlBuilder from "@sanity/image-url";

// ============================================
// FUENTES ELEGANTES
// ============================================
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

const cormorant = Cormorant({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const crimson = Crimson_Text({
  subsets: ['latin'],
  variable: '--font-crimson',
  weight: ['400', '600', '700'],
  display: 'swap',
});

// ============================================
// FUENTES MODERNAS
// ============================================
const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

// ============================================
// FUENTES IMPACTANTES
// ============================================
const bebas = Bebas_Neue({
  subsets: ['latin'],
  variable: '--font-bebas',
  weight: ['400'],
  display: 'swap',
});

const oswald = Oswald({
  subsets: ['latin'],
  variable: '--font-oswald',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

const righteous = Righteous({
  subsets: ['latin'],
  variable: '--font-righteous',
  weight: ['400'],
  display: 'swap',
});

// ============================================
// FUENTES ARTESANALES
// ============================================
const dancing = Dancing_Script({
  subsets: ['latin'],
  variable: '--font-dancing',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
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
  return (
    <html
      lang="es"
      className={`
        ${playfair.variable}
        ${cormorant.variable}
        ${lora.variable}
        ${crimson.variable}
        ${montserrat.variable}
        ${poppins.variable}
        ${inter.variable}
        ${nunito.variable}
        ${bebas.variable}
        ${oswald.variable}
        ${righteous.variable}
        ${dancing.variable}
      `}
    >
      <body>
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