"use client";

import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { Plate } from "@/types/Plate";

type Category = {
    name: string;
    image?: string;
};

type CategoryGridProps = {
    categories: Category[];
    onSelectCategory: (categoryName: string) => void;
};

export default function CategoryGrid({ categories, onSelectCategory }: CategoryGridProps) {
    return (
        <div className=" grid gap-4 w-full animate-in fade-in duration-500
    [grid-template-columns:repeat(auto-fit,minmax(140px,1fr))]
    md:[grid-template-columns:repeat(auto-fit,minmax(180px,1fr))]
    lg:[grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]">
            {categories.map((category) => (
                <button
                    key={category.name}
                    onClick={() => onSelectCategory(category.name)}
                    className="group relative h-28 md:h-36 w-full rounded-2xl overflow-hidden glass-container shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.03]"
                >
                    {/* Background Image */}
                    {category.image ? (
                        <Image
                            src={category.image}
                            alt={category.name}
                            fill
                            sizes="(max-width: 768px) 50vw, 25vw"
                            className="object-cover transition-transform duration-700 group-hover:scale-110 brightness-75 group-hover:brightness-90"
                        />
                    ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-black opacity-80" />
                    )}

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                    {/* Text Content */}
                    <div className="absolute inset-0 flex items-center justify-center p-2">
                        <span className="text-white font-bold text-lg md:text-xl uppercase tracking-wider text-center text-[var(--primary-color)]
                         drop-shadow-lg group-hover:tracking-widest transition-all duration-300">
                            {category.name}
                        </span>
                    </div>

                    {/* Specular & Glass effects */}
                    <div className="absolute inset-0 rounded-2xl ring-1 ring-white/20 group-hover:ring-white/40 transition-all duration-300" />
                </button>
            ))}
        </div>
    );
}
