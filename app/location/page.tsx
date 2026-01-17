import Link from "next/link";
import { getRestaurantSettings } from "../../sanity/sanity-utils";

export default async function Location() {
    const settings = await getRestaurantSettings();
    const address = settings?.address || "Bogota, Colombia";
    const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

    return (
        <main className="w-full min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-md">

                {/* Card */}
                <div className="glass-container glass-container--rounded w-full h-[600px] p-0">
                    <div className="glass-filter"></div>
                    <div className="glass-overlay"></div>
                    <div className="glass-specular"></div>

                    <div className="glass-content flex-col h-full w-full">
                        {/* Header */}
                        <div className="flex items-center gap-4 mb-6 shrink-0 w-full">
                            <Link href="/">
                                <button className="glass-button-outline w-10 h-10 rounded-full flex items-center justify-center hover:bg-black/10 transition text-gray-900 border-gray-900/50">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                                    </svg>
                                </button>
                            </Link>
                            <h1 className="text-3xl text-gray-900 font-serif font-bold">Ubicación</h1>
                        </div>

                        {/* Address Text */}
                        <div className="mb-6 text-gray-800 shrink-0 w-full">
                            <p className="text-xs text-orange-600 font-bold uppercase tracking-wider mb-1">Dirección</p>
                            <p className="text-lg font-medium leading-relaxed">{address}</p>
                        </div>

                        {/* Map */}
                        <div className="w-full flex-grow rounded-2xl overflow-hidden border border-white/10 relative bg-white/5 shadow-inner">
                            <iframe
                                width="100%"
                                height="100%"
                                src={mapUrl}
                                style={{ border: 0, filter: 'grayscale(0.2) contrast(1.1) opacity(0.85)' }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </div>

                </div>

            </div>
        </main>
    );
}
