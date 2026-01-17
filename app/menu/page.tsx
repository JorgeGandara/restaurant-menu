import Link from "next/link";
import Image from "next/image";
import { getPlates } from "../../sanity/sanity-utils";
import { Plate } from "../../types/Plate";
import { urlFor } from "../../sanity/lib/image";

export default async function Menu() {
    const plates = await getPlates();

    return (
        <main className="w-full min-h-screen p-6 pb-20">

            {/* Back Button Container */}
            <div className="max-w-6xl mx-auto mb-6 flex justify-start">
                <div className="glass-container glass-container--small glass-container--rounded p-0">
                    <div className="glass-filter"></div>
                    <div className="glass-overlay"></div>
                    <div className="glass-specular"></div>
                    <div className="glass-content py-2 px-4">
                        <Link href="/">
                            <button className="glass-button-outline w-10 h-10 rounded-full flex items-center justify-center hover:bg-black/10 transition text-gray-900 border-gray-900/50">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                                </svg>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Unified Glass Container for Menu Grid */}
            <div className="max-w-6xl mx-auto glass-container glass-container--rounded p-0">
                <div className="glass-filter"></div>
                <div className="glass-overlay"></div>
                <div className="glass-specular"></div>

                <div className="glass-content w-full flex-col items-stretch !p-8">

                    {/* Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
                        {plates.map((plate: Plate) => (
                            <div key={plate._id} className="flex flex-col group hover:bg-white/5 transition-colors">

                                {/* Image */}
                                <div className="relative h-48 w-full shrink-0 mb-4 rounded-xl overflow-hidden bg-black/5">
                                    <Image
                                        src={plate.image ? urlFor(plate.image).url() : "/images/default-ui-image.webp"}
                                        alt={plate.name}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>

                                {/* Text Content */}
                                <div className="flex flex-col flex-grow">
                                    <div className="flex justify-between items-start mb-2">
                                        <h2 className="text-xl text-gray-900 font-serif font-bold leading-tight">{plate.name}</h2>
                                        <span className="text-lg text-orange-600 font-bold whitespace-nowrap ml-2">
                                            ${plate.price}
                                        </span>
                                    </div>

                                    <p className="text-gray-700 text-sm flex-grow leading-relaxed font-medium">
                                        {plate.description}
                                    </p>
                                </div>
                            </div>
                        ))}

                        {plates.length === 0 && (
                            <div className="col-span-full text-center py-20 text-gray-800">
                                <p className="text-xl font-medium">No hay platos disponibles por el momento.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

        </main >
    );
}
