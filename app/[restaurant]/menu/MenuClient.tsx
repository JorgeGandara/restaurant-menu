"use client";

import Link from "next/link";
import MenuGrid from "./MenuGrid";
import CategoryGrid from "./CategoryGrid";
import AdminButton from "../components/AdminButton";
import MenuAdminActions from "./MenuAdminActions";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Plate } from "@/types/Plate";
import { urlFor } from "@/sanity/lib/image";

type Props = {
    initialPlates: Plate[];
    restaurant: string;
    restaurantId: string;
    isAdmin: boolean;
    primaryColor: string;
};

const ITEMS_PER_PAGE = 6;

export default function MenuClient({ initialPlates, restaurant, restaurantId, isAdmin, primaryColor }: Props) {
    // State for Categories
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    // Filter plates based on category (if selected) or return all (but we usually want to start with categories)
    // Actually, if we are in "All" mode we show categories. If we are in "Category" mode we show plates.

    // We compute the categories from the initial full list
    const categories = useMemo(() => {
        const uniqueCategories = Array.from(new Set(initialPlates.map(p => p.category || "Otros")));
        return uniqueCategories.map(catName => {
            // Find first plate with image for this category
            const plateWithImage = initialPlates.find(p => (p.category || "Otros") === catName && p.image);
            return {
                name: catName,
                image: plateWithImage?.image ? urlFor(plateWithImage.image).url() : undefined
            };
        });
    }, [initialPlates]);

    // Current source of truth for the *filtered* list we are viewing
    // If selectedCategory is null, we aren't viewing a list of plates (we view categories)
    // But we need a list for the "Edit/Search" logic if we were to implement that. 
    // For now, let's focus on: Category -> Plates.

    const [filteredPlates, setFilteredPlates] = useState<Plate[]>([]);
    const [displayedPlates, setDisplayedPlates] = useState<Plate[]>([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const observerTarget = useRef<HTMLDivElement>(null);

    // Handle selection
    const handleCategorySelect = (categoryName: string) => {
        setSelectedCategory(categoryName);
        const filtered = initialPlates.filter(p => (p.category || "Otros") === categoryName);
        setFilteredPlates(filtered);
        setDisplayedPlates(filtered.slice(0, ITEMS_PER_PAGE));
        setPage(1);
        setIsLoading(false);
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleBackToCategories = () => {
        setSelectedCategory(null);
        setFilteredPlates([]);
        setDisplayedPlates([]);
    };

    // Pagination Logic
    const loadMorePlates = useCallback(() => {
        if (isLoading || !selectedCategory) return;

        const startIndex = page * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;

        if (startIndex >= filteredPlates.length) return;

        setIsLoading(true);

        setTimeout(() => {
            const nextBatch = filteredPlates.slice(startIndex, endIndex);

            setDisplayedPlates(prev => {
                // Fix duplication: ensure we don't add plates that are already displayed
                const existingIds = new Set(prev.map(p => p._id));
                const uniqueNewPlates = nextBatch.filter(p => !existingIds.has(p._id));

                if (uniqueNewPlates.length === 0) return prev;
                return [...prev, ...uniqueNewPlates];
            });

            setPage(prev => prev + 1);
            setIsLoading(false);
        }, 300);
    }, [page, filteredPlates, isLoading, selectedCategory]);

    // Intersection Observer
    useEffect(() => {
        if (!selectedCategory) return; // Don't observe if in category view

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !isLoading) {
                    const hasMore = page * ITEMS_PER_PAGE < filteredPlates.length;
                    if (hasMore) {
                        loadMorePlates();
                    }
                }
            },
            { threshold: 0.1, rootMargin: '100px' }
        );

        const currentTarget = observerTarget.current;
        if (currentTarget) {
            observer.observe(currentTarget);
        }

        return () => {
            if (currentTarget) {
                observer.unobserve(currentTarget);
            }
        };
    }, [loadMorePlates, page, filteredPlates.length, isLoading, selectedCategory]);


    // CRUD Handlers
    const handlePlateDeleted = (plateId: string) => {
        // Update local state
        setFilteredPlates(prev => prev.filter(p => p._id !== plateId));
        setDisplayedPlates(prev => prev.filter(p => p._id !== plateId));
        // Also update initial plates if possible, or trigger re-fetch? 
        // For simplicity we just update the client view. 
        // Ideally we should sync with initialPlates but that's a prop.
    };

    const handlePlateCreated = (newPlate: Plate) => {
        // If the new plate belongs to current category, add it.
        // Also we should probably re-eval categories if a new category is created.
        // This simple implementation focuses on the list view.

        // Optimistic update
        if (selectedCategory && (newPlate.category || "Otros") === selectedCategory) {
            setFilteredPlates(prev => [newPlate, ...prev]);
            setDisplayedPlates(prev => [newPlate, ...prev]);
        }
    };

    const handlePlateUpdated = (updated: Plate) => {
        setFilteredPlates(prev => prev.map(p => (p._id === updated._id ? updated : p)));
        setDisplayedPlates(prev => prev.map(p => (p._id === updated._id ? updated : p)));
    };

    const hasMore = selectedCategory && (page * ITEMS_PER_PAGE < filteredPlates.length);

    return (
        <main className="w-full min-h-screen p-4 pb-24"  style={{ "--primary-color": primaryColor } as React.CSSProperties}>
            {/* Header / Nav */}
            <div className="max-w-6xl mx-auto mb-6 flex items-center gap-4 md:gap-6">
                {/* Back Button Logic */}
                {selectedCategory ? (
                    <button
                        onClick={handleBackToCategories}
                        className="group relative z-50 glass-container glass-container--rounded bg-white/60 dark:bg-black/50
                        backdrop-blur-md border border-white/30 w-14 h-14 p-0 flex items-center justify-center 
                        transition-all hover:scale-110 active:scale-95"
                    >
                        <div className="glass-specular rounded-full"></div>
                        <svg className="w-6 h-6 text-[var(--primary-color)] transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                ) : (
                    <Link href={`/${restaurant}`} className="group relative z-50 glass-container glass-container--rounded bg-white/60 dark:bg-black/50 
                    backdrop-blur-md border border-white/30 w-14 h-14 flex items-center justify-center transition-all hover:scale-110 active:scale-95">
                        <div className="glass-specular rounded-full"></div>
                        <svg className="w-6 h-6 text-[var(--primary-color)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                    </Link>
                )}

                <h1 className="relative top-[1px] md:top-0 
                text-3xl font-serif font-bold text-[var(--primary-color)] dark:text-white drop-shadow-sm">
                    {selectedCategory || "Nuestro Menú"}
                </h1>
            </div>

            {/* Content Switcher */}
            <div className="max-w-7xl mx-auto">
                {!selectedCategory ? (
                    <div className="animate-in slide-in-from-bottom-4 duration-500 fade-in">
                        <CategoryGrid
                            categories={categories}
                            onSelectCategory={handleCategorySelect}
                        />
                        {initialPlates.length === 0 && (
                            <div className="text-center py-20 text-gray-500">
                                No se encontraron platos disponibles.
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="glass-container glass-container--rounded p-0 animate-in slide-in-from-right-4 duration-500 fade-in">
                        <div className="glass-filter" />
                        <div className="glass-overlay" />

                        <div className="glass-content w-full flex-col !p-6 md:!p-8">
                            <MenuGrid
                                plates={displayedPlates}
                                restaurant={restaurant}
                                isAdmin={isAdmin}
                                onPlateDeleted={handlePlateDeleted}
                                onPlateUpdated={handlePlateUpdated}
                            />

                            {/* Loader Indicator */}
                            {isLoading && (
                                <div className="flex justify-center py-8 w-full">
                                    <div className="animate-spin rounded-full h-10 w-10 border-4 border-[var(--primary-color)] border-t-transparent"></div>
                                </div>
                            )}

                            {/* Observer Trigger */}
                            {hasMore && <div ref={observerTarget} className="h-4 w-full" />}
                        </div>
                    </div>
                )}
            </div>

            {isAdmin && (
                <>
                    <AdminButton restaurant={restaurant} />
                    <MenuAdminActions
                        restaurant={restaurant}
                        restaurantId={restaurantId}
                        isAdmin={isAdmin}
                        onPlateCreated={handlePlateCreated}
                    />
                </>
            )}
        </main>
    );
}
