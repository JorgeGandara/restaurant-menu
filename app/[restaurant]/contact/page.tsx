import Link from "next/link";
import { getRestaurantSettings } from "@/sanity/sanity-utils";
import { notFound } from "next/navigation";

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
            <div className="w-full max-w-md">

                <div className="glass-container glass-container--rounded w-full p-0">
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
                                Contacto
                            </h1>
                        </div>

                        <div className="flex flex-col gap-6 w-full text-gray-800">
                            {info(settings.phone, "Teléfono", "tel:")}
                            {info(settings.email, "Correo", "mailto:")}
                            {info(settings.address, "Dirección")}
                        </div>

                        {/* Socials */}
                        <div className="pt-6 mt-6 border-t border-gray-900/10 w-full">
                            <h2 className="text-sm uppercase tracking-wider text-gray-600 font-bold mb-4">
                                Redes Sociales
                            </h2>
                            <div className="flex gap-4 flex-wrap">
                                {social(settings.instagram, "Instagram")}
                                {social(settings.facebook, "Facebook")}
                                {social(settings.whatsapp, "WhatsApp")}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </main>
    );
}

/* Helpers */
function info(value?: string, label?: string, prefix = "") {
    if (!value) return null;

    const content = (
        <>
            <p className="text-xs text-orange-600 font-bold uppercase tracking-wider mb-1">
                {label}
            </p>
            <p className="text-lg font-medium">{value}</p>
        </>
    );

    return prefix ? (
        <a href={`${prefix}${value}`} className="hover:text-orange-700 transition">
            {content}
        </a>
    ) : (
        <div>{content}</div>
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
