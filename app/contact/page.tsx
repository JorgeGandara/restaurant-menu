import Link from "next/link";
import { getRestaurantSettings } from "../../sanity/sanity-utils";

export default async function Contact() {
    const settings = await getRestaurantSettings();

    return (
        <main className="w-full min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-md">

                {/* Card */}
                <div className="glass-container glass-container--rounded w-full p-0">
                    <div className="glass-filter"></div>
                    <div className="glass-overlay"></div>
                    <div className="glass-specular"></div>

                    <div className="glass-content flex-col items-start w-full">
                        {/* Header */}
                        <div className="flex items-center gap-4 mb-6 w-full">
                            <Link href="/">
                                <button className="glass-button-outline w-10 h-10 rounded-full flex items-center justify-center hover:bg-black/10 transition text-gray-900 border-gray-900/50">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                                    </svg>
                                </button>
                            </Link>
                            <h1 className="text-3xl text-gray-900 font-serif font-bold">Contacto</h1>
                        </div>

                        <div className="flex flex-col gap-6 text-gray-800 w-full">

                            {posts(settings?.phone, "Teléfono", "tel:")}
                            {posts(settings?.email, "Correo", "mailto:")}
                            {posts(settings?.address, "Dirección", "")}

                            {/* Socials */}
                            <div className="pt-4 border-t border-gray-900/10 w-full">
                                <h2 className="text-sm uppercase tracking-wider text-gray-600 font-bold mb-4">Redes Sociales</h2>
                                <div className="flex gap-4 flex-wrap">
                                    {socialLink(settings?.instagram, "Instagram")}
                                    {socialLink(settings?.facebook, "Facebook")}
                                    {socialLink(settings?.whatsapp, "WhatsApp")}
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}

function posts(value: string | undefined, label: string, prefix: string) {
    if (!value) return null;
    const isLink = prefix !== "";
    const content = (
        <div>
            <p className="text-xs text-orange-600 font-bold uppercase tracking-wider mb-1">{label}</p>
            <p className="text-lg font-medium">{value}</p>
        </div>
    );

    if (isLink) {
        return (
            <a href={`${prefix}${value}`} className="hover:text-orange-700 transition-colors block">
                {content}
            </a>
        );
    }
    return <div className="block">{content}</div>;
}

function socialLink(url: string | undefined, label: string) {
    if (!url) return null;
    return (
        <a href={url} target="_blank" rel="noopener noreferrer" className="glass-button-outline px-4 py-2 rounded-lg text-sm hover:bg-orange-500/80 hover:text-white transition">
            {label}
        </a>
    );
}
