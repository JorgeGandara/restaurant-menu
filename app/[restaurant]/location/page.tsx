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
            <div className="w-full max-w-md">
                <div className="glass-container glass-container--rounded w-full p-0 overflow-hidden">
                    <div className="glass-filter" />
                    <div className="glass-overlay" />
                    <div className="glass-specular" />

                    <div className="glass-content flex-col items-start w-full">
                        {/* Header */}
                        <div className="flex items-center gap-4 mb-6 w-full">
                            <Link href={`/${restaurant}`}>
                                <button className="glass-button-outline w-10 h-10 rounded-full flex items-center justify-center hover:bg-black/10 transition">
                                    ←
                                </button>
                            </Link>
                            <h1 className="text-3xl font-serif font-bold text-gray-900">
                                Ubicación
                            </h1>
                        </div>

                        {/* Restaurant Image */}
                        {settings.imagen_del_restaurante && urlFor(settings.imagen_del_restaurante).url() && (
                            <div className="w-full h-48 relative rounded-xl overflow-hidden mb-6 shadow-inner border border-white/20">
                                <Image
                                    src={urlFor(settings.imagen_del_restaurante).url()}
                                    alt={settings.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        )}

                        <div className="flex flex-col gap-6 w-full text-gray-800">
                            <div>
                                <p className="text-xs text-orange-600 font-bold uppercase tracking-wider mb-1">
                                    Dirección
                                </p>
                                <p className="text-lg font-medium leading-tight mb-3">
                                    {settings.address || "Dirección no disponible"}
                                </p>

                                {settings.googleMapsUrl && (
                                    <a
                                        href={settings.googleMapsUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-sm font-bold text-orange-600 hover:text-orange-700 transition"
                                    >
                                        📍 Ver en Google Maps
                                    </a>
                                )}
                            </div>

                            {/* Video Section: ¿Cómo puedo llegar? */}
                            {settings.videoHowToArrive && (
                                <div className="pt-4 border-t border-gray-900/10 w-full">
                                    <h3 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                                        🎬 ¿Cómo puedo llegar?
                                    </h3>

                                    <div className="w-full rounded-xl overflow-hidden bg-black/5 p-2">
                                        {/* VIDEO SUBIDO A SANITY */}
                                        {settings.videoHowToArrive.source === 'file' &&
                                            settings.videoHowToArrive.videoFile?.asset?.url && (
                                                <video
                                                    controls
                                                    className="w-full rounded-lg"
                                                    preload="metadata"
                                                >
                                                    <source
                                                        src={settings.videoHowToArrive.videoFile.asset.url}
                                                    />
                                                    Tu navegador no soporta video HTML5.
                                                </video>
                                            )}

                                        {/* VIDEO POR URL (YouTube / Vimeo) */}
                                        {settings.videoHowToArrive.source === 'url' &&
                                            settings.videoHowToArrive.videoUrl && (
                                                <iframe
                                                    src={toEmbedUrl(settings.videoHowToArrive.videoUrl)}
                                                    className="w-full aspect-video rounded-lg"
                                                    allow="autoplay; fullscreen; picture-in-picture"
                                                    loading="lazy"
                                                />
                                            )}
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

function social(url?: string, label?: string) {
    if (!url) return null;
    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-button-outline px-4 py-2 rounded-lg text-sm hover:bg-orange-500 hover:text-white transition"
        >
            {label}
        </a>
    );
}
