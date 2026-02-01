import Link from "next/link";
import { getRestaurantSettings } from "@/sanity/sanity-utils";
import { notFound } from "next/navigation";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";

interface LocationProps {
    params: Promise<{
        restaurant?: string;
    }>
}

export default async function Location({ params }: LocationProps) {
    const { restaurant } = await params;

    if (!restaurant) {
        notFound();
    }

    const settings = await getRestaurantSettings(restaurant);

    if (!settings) {
        notFound();
    }

    function toEmbedUrl(url: string) {
        if (url.includes('youtube.com/watch')) {
            const id = new URL(url).searchParams.get('v')
            return `https://www.youtube.com/embed/${id}`
        }
        if (url.includes('youtu.be')) {
            const id = url.split('/').pop()
            return `https://www.youtube.com/embed/${id}`
        }
        return url
    }

    return (
        <main className="w-full min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-md relative">
                {/* Efectos decorativos de fondo */}
                <div className="absolute top-20 left-1/2 -translate-x-1/2 w-64 h-64 bg-[color:color-mix(in_srgb,var(--primary-color),transparent_90%)] blur-3xl rounded-full -z-10 animate-pulse"></div>
                <div className="absolute top-40 left-1/2 -translate-x-1/2 w-40 h-40 bg-[color:color-mix(in_srgb,var(--primary-color),transparent_95%)] blur-2xl rounded-full -z-10 animate-pulse"></div>

                <div className="glass-container glass-container--rounded w-full p-0 overflow-hidden shadow-2xl transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_25px_-5px_color-mix(in_srgb,var(--primary-color),transparent_80%)]">
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
                                Ubicación
                            </h1>
                        </div>

                        {/* Restaurant Image - ocupando todo el espacio */}
                        {settings.imagen_del_restaurante && urlFor(settings.imagen_del_restaurante).url() && (
                            <div className="w-full mb-6 group">
                                <div className="glass-container glass-container--rounded w-full p-0 overflow-hidden transition-all duration-500 hover:shadow-[0_20px_25px_-5px_color-mix(in_srgb,var(--primary-color),transparent_70%)] shadow-lg group-hover:-translate-y-1">
                                    <div className="glass-filter"></div>
                                    <div className="glass-overlay"></div>
                                    <div className="glass-specular"></div>
                                    <div className="glass-content p-2 relative">
                                        <div className="w-full h-48 relative rounded-lg overflow-hidden border-2 border-white/30">
                                            <Image
                                                src={urlFor(settings.imagen_del_restaurante).url()}
                                                alt={settings.name}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                                sizes="(max-width: 768px) 100vw, 448px"
                                                priority
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="flex flex-col gap-6 w-full text-gray-800">
                            {/* Dirección - centrado */}
                            <div className="group">
                                <div className="glass-container glass-container--rounded w-full p-0 transition-all duration-300 hover:shadow-[0_10px_15px_-3px_color-mix(in_srgb,var(--primary-color),transparent_80%)] shadow-md shadow-gray-400/5 group-hover:-translate-y-0.5">
                                    <div className="glass-filter"></div>
                                    <div className="glass-overlay"></div>
                                    <div className="glass-specular"></div>
                                    <div className="glass-content flex-col items-center text-center p-4 bg-gradient-to-br from-white/40 to-gray-50/20 relative overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[color:color-mix(in_srgb,var(--primary-color),transparent_85%)]/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                                        <p className="text-xs text-[var(--primary-color)] font-bold uppercase tracking-wider mb-2 relative z-10 flex items-center gap-2">
                                            Dirección
                                        </p>
                                        <p className="text-lg font-medium leading-tight mb-4 relative z-10 group-hover:text-[color:color-mix(in_srgb,var(--primary-color),black_40%)] transition-colors duration-300">
                                            {settings.address || "Dirección no disponible"}
                                        </p>

                                        {settings.googleMapsUrl && (
                                            <a
                                                href={settings.googleMapsUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 relative z-10 group/link"
                                            >
                                                <div className="glass-container glass-container--rounded p-0 transition-all duration-300 group-hover/link:scale-105 group-hover/link:shadow-lg hover:shadow-[0_10px_15px_-3px_color-mix(in_srgb,var(--primary-color),transparent_60%)] group-active/link:scale-95 shadow-md shadow-[color:color-mix(in_srgb,var(--primary-color),transparent_80%)]">
                                                    <div className="glass-filter"></div>
                                                    <div className="glass-overlay"></div>
                                                    <div className="glass-specular"></div>
                                                    <div
                                                        className="glass-content px-4 py-2 relative overflow-hidden"
                                                        style={{ background: `linear-gradient(135deg, color-mix(in srgb, var(--primary-color), transparent 75%), color-mix(in srgb, var(--primary-color), transparent 80%), color-mix(in srgb, var(--primary-color), transparent 75%))` }}
                                                    >
                                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/link:translate-x-full transition-transform duration-700 ease-out"></div>
                                                        <span className="text-sm font-bold text-[color:color-mix(in_srgb,var(--primary-color),black_30%)] relative z-10 group-hover/link:text-[color:color-mix(in_srgb,var(--primary-color),black_40%)] transition-colors duration-300">
                                                            Ver en Google Maps →
                                                        </span>
                                                    </div>
                                                </div>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Video Section - centrado */}
                            {settings.videoHowToArrive && (
                                <div>
                                    <div className="w-full h-px mb-6" style={{ background: `linear-gradient(90deg, transparent, color-mix(in srgb, var(--primary-color), transparent 60%), transparent)` }}></div>

                                    <div className="glass-container glass-container--rounded w-full p-0 transition-all duration-500 hover:shadow-2xl hover:shadow-[0_25px_50px_-12px_color-mix(in_srgb,var(--primary-color),transparent_70%)] shadow-lg shadow-[color:color-mix(in_srgb,var(--primary-color),transparent_90%)] hover:-translate-y-1 group">
                                        <div className="glass-filter"></div>
                                        <div className="glass-overlay"></div>
                                        <div className="glass-specular"></div>
                                        <div className="glass-content flex-col items-center text-center p-4 bg-gradient-to-br from-white/40 to-gray-50/20 relative overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[color:color-mix(in_srgb,var(--primary-color),transparent_80%)]/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>

                                            <h3 className="text-sm font-bold text-gray-700 mb-4 flex items-center gap-2 relative z-10">
                                                <span
                                                    className="bg-clip-text text-transparent"
                                                    style={{ backgroundImage: `linear-gradient(to right, color-mix(in srgb, var(--primary-color), black 10%), var(--primary-color))` }}
                                                >
                                                    ¿Cómo puedo llegar?
                                                </span>
                                            </h3>

                                            <div className="w-full rounded-xl overflow-hidden relative z-10 shadow-inner border-2 border-white/30 bg-black/5 p-2 transition-all duration-500 hover:border-[color:color-mix(in_srgb,var(--primary-color),transparent_50%)]">
                                                {settings.videoHowToArrive.source === 'file' &&
                                                    settings.videoHowToArrive.videoFile?.asset?.url && (
                                                        <video
                                                            controls
                                                            className="w-full rounded-lg shadow-lg"
                                                            preload="metadata"
                                                        >
                                                            <source
                                                                src={settings.videoHowToArrive.videoFile.asset.url}
                                                            />
                                                            Tu navegador no soporta video HTML5.
                                                        </video>
                                                    )}

                                                {settings.videoHowToArrive.source === 'url' &&
                                                    settings.videoHowToArrive.videoUrl && (
                                                        <iframe
                                                            src={toEmbedUrl(settings.videoHowToArrive.videoUrl)}
                                                            className="w-full aspect-video rounded-lg shadow-lg"
                                                            allow="autoplay; fullscreen; picture-in-picture"
                                                            loading="lazy"
                                                        />
                                                    )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}