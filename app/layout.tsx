import type { Metadata } from "next";
import { Montserrat, Playfair_Display } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "Multiware Menu",
  description: "Plataforma de menús digitales para restaurantes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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

