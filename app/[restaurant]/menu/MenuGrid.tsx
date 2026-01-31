"use client";

import Image from "next/image";
import { useState } from "react";
import { Plate } from "@/types/Plate";
import { urlFor } from "@/sanity/lib/image";
import PlateActions from "./PlateActions";

type MenuGridProps = {
    plates: Plate[];
    restaurant: string;
    isAdmin: boolean;
    onPlateDeleted?: (plateId: string) => void;
    onPlateUpdated?: (plate: Plate) => void;
};

export default function MenuGrid({ plates, restaurant, isAdmin, onPlateDeleted, onPlateUpdated }: MenuGridProps) {
    const [openRecipes, setOpenRecipes] = useState<Record<string, boolean>>({});

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            {plates.map((plate: Plate) => (
                <div
                    key={plate._id}
                    className="flex flex-col rounded-xl p-3 relative"
                >
                    {isAdmin && (
                        <PlateActions
                            plate={plate}
                            restaurantSlug={restaurant}
                            isAdmin={isAdmin}
                            onPlateDeleted={onPlateDeleted}
                            onPlateUpdated={onPlateUpdated}
                        />
                    )}

                    <div className="relative h-48 w-full mb-4 rounded-xl overflow-hidden bg-black/5 isolate">
                        <Image
                            src={plate.image ? urlFor(plate.image).url() : "/images/default-ui-image.webp"}
                            alt={plate.name}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover transition-transform duration-300 ease-out hover:scale-105 will-change-transform translate-z-0"
                        />
                    </div>

                    <div className="flex flex-col">
                        <div className="flex justify-between items-start mb-2 gap-2">
                            <h2 className="text-xl text-gray-900 font-serif font-bold leading-tight">
                                {plate.name}
                            </h2>
                            <span className="text-lg text-orange-600 font-bold whitespace-nowrap">
                                ${plate.price}
                            </span>
                        </div>

                        <p className="text-gray-700 text-sm leading-relaxed font-medium">
                            {plate.description}
                        </p>

                        {isAdmin && plate.recipe && (
                            <div className="mt-3 rounded-xl border border-orange-200 bg-white/90 shadow-sm">
                                <button
                                    type="button"
                                    onClick={() =>
                                        setOpenRecipes((prev) => ({
                                            ...prev,
                                            [plate._id]: !prev[plate._id],
                                        }))
                                    }
                                    className="w-full flex items-center justify-between px-3 py-2 text-left"
                                >
                                    <div className="flex items-center gap-2">
                                        <span className="h-2 w-2 rounded-full bg-orange-500" aria-hidden />
                                        <span className="text-xs font-bold text-orange-700 uppercase tracking-wide">
                                            Receta de {plate.name}
                                        </span>
                                    </div>
                                    <span className={`text-orange-700 transition-transform ${openRecipes[plate._id] ? "rotate-180" : "rotate-0"}`}>
                                        ▾
                                    </span>
                                </button>

                                {openRecipes[plate._id] && (
                                    <div className="px-3 pb-3">
                                        <p className="text-gray-700 text-sm whitespace-pre-wrap leading-relaxed border-l-2 border-orange-200 pl-3">
                                            {plate.recipe}
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            ))}

            {plates.length === 0 && (
                <div className="col-span-full text-center py-20 text-gray-800">
                    <p className="text-xl font-medium">
                        No hay platos disponibles por el momento.
                    </p>
                </div>
            )}
        </div>
    );
}
