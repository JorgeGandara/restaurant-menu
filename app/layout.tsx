import type { Metadata } from "next";
import { Geist, Geist_Mono, Gabarito, Poppins } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Marviche",
  description: "by multiware",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`
          ${geistSans.variable}
          ${geistMono.variable}
          antialiased
          min-h-screen
          bg-cover
          bg-center
          bg-no-repeat
        `}
        style={{
          backgroundImage: "url('/images/fondo.png')"
        }}
      >
        <div className="min-h-screen bg-white/67">
          {children}
        </div>
      </body>
    </html>
  );
}
