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
        <main className="w-full min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-md relative">
                {/* Efectos decorativos de fondo */}
                <div className="absolute top-20 left-1/2 -translate-x-1/2 w-64 h-64 bg-[color:color-mix(in_srgb,var(--primary-color),transparent_90%)] blur-3xl rounded-full -z-10 animate-pulse"></div>
                <div className="absolute top-40 left-1/2 -translate-x-1/2 w-40 h-40 bg-[color:color-mix(in_srgb,var(--primary-color),transparent_95%)] blur-2xl rounded-full -z-10 animate-pulse"></div>

                <div className="glass-container glass-container--rounded w-full p-0 shadow-2xl transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_25px_-5px_color-mix(in_srgb,var(--primary-color),transparent_80%)]">
                    <div className="glass-filter" />
                    <div className="glass-overlay" />
                    <div className="glass-specular" />

                    <div className="glass-content flex-col items-center w-full relative">
                        {/* Resplandor decorativo superior */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-[color:color-mix(in_srgb,var(--primary-color),transparent_85%)] blur-3xl rounded-full -z-10"></div>

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
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[color:color-mix(in_srgb,var(--primary-color),white_80%)]/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>

                                        {/* FLECHA animada */}
                                        <svg
                                            className="
                                        absolute inset-0 m-auto
                                        w-6 h-6
                                        text-[var(--primary-color)]
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
                            <h1
                                className="text-3xl font-serif font-bold bg-clip-text text-transparent drop-shadow-sm"
                                style={{
                                    backgroundImage: `linear-gradient(135deg, color-mix(in srgb, var(--primary-color), black 10%), color-mix(in srgb, var(--primary-color), white 10%), color-mix(in srgb, var(--primary-color), black 20%))`
                                }}
                            >
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
                            <div className="w-full h-px mb-6" style={{ background: `linear-gradient(90deg, transparent, color-mix(in srgb, var(--primary-color), transparent 60%), transparent)` }}></div>

                            <h2 className="text-sm uppercase tracking-wider font-bold mb-4 flex items-center justify-center gap-2">
                                <span
                                    className="bg-clip-text text-transparent"
                                    style={{ backgroundImage: `linear-gradient(to right, color-mix(in srgb, var(--primary-color), black 10%), var(--primary-color))` }}
                                >
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
            <div className="glass-container glass-container--rounded w-full p-0 transition-all duration-300 hover:shadow-[0_10px_15px_-3px_color-mix(in_srgb,var(--primary-color),transparent_80%)] shadow-md shadow-gray-400/5 group-hover:scale-[1.02] group-active:scale-[0.98] group-hover:-translate-y-0.5">
                <div className="glass-filter"></div>
                <div className="glass-overlay"></div>
                <div className="glass-specular"></div>
                <div className="glass-content flex-col items-center text-center p-4 bg-gradient-to-br from-white/40 to-gray-50/20 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[color:color-mix(in_srgb,var(--primary-color),transparent_85%)]/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                    <p className="text-xs text-[var(--primary-color)] font-bold uppercase tracking-wider mb-2 relative z-10 flex items-center gap-2">
                        {label}
                    </p>
                    <p className="text-lg font-medium relative z-10 group-hover:text-[color:color-mix(in_srgb,var(--primary-color),black_40%)] transition-colors duration-300">
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
            <div className="glass-container glass-container--rounded p-0 transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl hover:shadow-[0_20px_25px_-5px_color-mix(in_srgb,var(--primary-color),transparent_60%)] group-active:scale-95 shadow-lg shadow-[color:color-mix(in_srgb,var(--primary-color),transparent_80%)]">
                <div className="glass-filter"></div>
                <div className="glass-overlay"></div>
                <div className="glass-specular"></div>
                <div
                    className="glass-content px-4 py-2 relative overflow-hidden"
                    style={{ background: `linear-gradient(135deg, color-mix(in srgb, var(--primary-color), transparent 75%), color-mix(in srgb, var(--primary-color), transparent 80%), color-mix(in srgb, var(--primary-color), transparent 75%))` }}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
                    <div className="absolute inset-0 transition-all duration-500 opacity-0 group-hover:opacity-100"
                        style={{ background: `linear-gradient(135deg, color-mix(in srgb, var(--primary-color), transparent 80%), color-mix(in srgb, var(--primary-color), transparent 80%))` }}
                    ></div>
                    <span className="text-sm font-bold text-gray-900 relative z-10 group-hover:text-[color:color-mix(in_srgb,var(--primary-color),black_40%)] transition-colors duration-300 flex items-center gap-2">
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