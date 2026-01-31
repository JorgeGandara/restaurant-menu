import Link from "next/link";
import { getRestaurantSettings } from "@/sanity/sanity-utils";
import { notFound } from "next/navigation";
import Image from "next/image";

interface ContactProps {
    params: Promise<{
        restaurant?: string;
    }>;
}

export default async function Contact({ params }: ContactProps) {
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
            <div className="w-full max-w-md relative">
                {/* Efectos decorativos de fondo */}
                <div className="absolute top-20 left-1/2 -translate-x-1/2 w-64 h-64 bg-orange-500/10 blur-3xl rounded-full -z-10 animate-pulse"></div>
                <div className="absolute top-40 left-1/2 -translate-x-1/2 w-40 h-40 bg-orange-400/5 blur-2xl rounded-full -z-10 animate-pulse"></div>

                <div className="glass-container glass-container--rounded w-full p-0 shadow-2xl shadow-orange-500/10 hover:shadow-orange-500/20 transition-all duration-500 hover:-translate-y-1">
                    <div className="glass-filter" />
                    <div className="glass-overlay" />
                    <div className="glass-specular" />

                    <div className="glass-content flex-col items-center w-full relative">
                        {/* Resplandor decorativo superior */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-orange-500/15 blur-3xl rounded-full -z-10"></div>

                        {/* Header - centrado */}
                        <div className="flex items-center justify-center gap-4 mb-6 w-full relative">
                            <Link href={`/${restaurant}`} className="group absolute left-0 z-50">
                                <div className="glass-container glass-container--rounded w-10 h-10 p-0 relative transition-all duration-300 group-hover:scale-110 group-active:scale-95">

                                    {/* glass layers */}
                                    <div className="glass-filter pointer-events-none"></div>
                                    <div className="glass-overlay pointer-events-none"></div>
                                    <div className="glass-specular pointer-events-none"></div>

                                    <div className="glass-content relative w-full h-full overflow-hidden">

                                        {/* animación de brillo */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-200/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>

                                        {/* FLECHA animada */}
                                        <svg
                                            className="
                                        absolute inset-0 m-auto
                                        w-6 h-6
                                        text-orange-600
                                        z-[9999]
                                    "
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="2 0 24 24"
                                        >
                                            <path
                                                d="M10 19l-7-7 7-7"
                                                strokeWidth={3}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </Link>
                            <h1 className="text-3xl font-serif font-bold bg-gradient-to-br from-orange-600 via-orange-500 to-orange-700 bg-clip-text text-transparent drop-shadow-sm">
                                Contacto
                            </h1>
                        </div>

                        {/* Información de contacto - centrado */}
                        <div className="flex flex-col gap-4 w-full text-gray-800">
                            {info(settings.phone, "Teléfono")}
                            {info(settings.email, "Correo")}
                        </div>

                        {/* Separador */}
                        <div className="pt-6 mt-6 w-full">
                            <div className="w-full h-px bg-gradient-to-r from-transparent via-orange-500/40 to-transparent mb-6"></div>

                            <h2 className="text-sm uppercase tracking-wider font-bold mb-4 flex items-center justify-center gap-2">
                                <span className="bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
                                    Redes Sociales
                                </span>
                            </h2>

                            <div className="flex gap-3 flex-wrap justify-center">
                                {social(settings.instagram, "Instagram", "/icons/instagram.webp")}
                                {social(settings.facebook, "Facebook", "/icons/facebook.png")}
                                {social(settings.whatsapp, "WhatsApp", "/icons/whatsapp.png")}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

/* Helpers - centrados */
function info(value?: string, label?: string) {
    if (!value) return null;


    return (
        <div className="group">
            <div className="glass-container glass-container--rounded w-full p-0 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-orange-500/20 group-hover:scale-[1.02] group-active:scale-[0.98] shadow-md shadow-gray-400/5 group-hover:-translate-y-0.5">
                <div className="glass-filter"></div>
                <div className="glass-overlay"></div>
                <div className="glass-specular"></div>
                <div className="glass-content flex-col items-center text-center p-4 bg-gradient-to-br from-white/40 to-orange-50/20 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-100/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                    <p className="text-xs text-orange-600 font-bold uppercase tracking-wider mb-2 relative z-10 flex items-center gap-2">
                        {label}
                    </p>
                    <p className="text-lg font-medium relative z-10 group-hover:text-orange-900 transition-colors duration-300">
                        {value}
                    </p>
                </div>
            </div>
        </div>
    );
}

function social(url?: string, label?: string, iconPath?: string) {
    if (!url) return null;

    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-block"
        >
            <div className="glass-container glass-container--rounded p-0 transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-orange-500/40 group-active:scale-95 shadow-lg shadow-orange-500/20">
                <div className="glass-filter"></div>
                <div className="glass-overlay"></div>
                <div className="glass-specular"></div>
                <div className="glass-content px-4 py-2 bg-gradient-to-br from-orange-500/25 via-orange-500/20 to-orange-400/25 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-400/0 to-orange-600/0 group-hover:from-orange-400/20 group-hover:to-orange-600/20 transition-all duration-500"></div>
                    <span className="text-sm font-bold text-gray-900 relative z-10 group-hover:text-orange-900 transition-colors duration-300 flex items-center gap-2">
                        {iconPath && (
                            <Image
                                src={iconPath}
                                alt={label || "social"}
                                width={20}
                                height={20}
                                className="inline-block group-hover:scale-110 transition-transform duration-300"
                            />
                        )}
                        {label}
                    </span>
                </div>
            </div>
        </a>
    );
}