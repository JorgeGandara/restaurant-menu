"use client";

import Link from "next/link";
import MenuGrid from "./MenuGrid";
import AdminButton from "../components/AdminButton";
import MenuAdminActions from "./MenuAdminActions";
import { useState, useEffect, useRef, useCallback } from "react";
import { Plate } from "@/types/Plate";

type Props = {
    initialPlates: Plate[];
    restaurant: string;
    restaurantId: string;
    isAdmin: boolean;
};

const ITEMS_PER_PAGE = 6;

export default function MenuClient({ initialPlates, restaurant, restaurantId, isAdmin }: Props) {
    const [plates, setPlates] = useState<Plate[]>(initialPlates);
    const [displayedPlates, setDisplayedPlates] = useState<Plate[]>([]);
    const [page, setPage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const observerTarget = useRef<HTMLDivElement>(null);

    // Función para cargar más platos (memoizada para evitar recreaciones)
    const loadMorePlates = useCallback(() => {
        if (isLoading) return;
        
        const startIndex = page * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        
        if (startIndex >= plates.length) return;

        setIsLoading(true);
        
        setTimeout(() => {
            const newPlates = plates.slice(startIndex, endIndex);
            setDisplayedPlates(prev => [...prev, ...newPlates]);
            setPage(prev => prev + 1);
            setIsLoading(false);
        }, 300);
    }, [page, plates, isLoading]);

    // Cargar platos iniciales solo una vez
    useEffect(() => {
        const initialBatch = plates.slice(0, ITEMS_PER_PAGE);
        setDisplayedPlates(initialBatch);
        setPage(1);
    }, [plates]);

    // Configurar Intersection Observer
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !isLoading) {
                    const hasMore = page * ITEMS_PER_PAGE < plates.length;
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
    }, [loadMorePlates, page, plates.length, isLoading]);

    const handlePlateDeleted = (plateId: string) => {
        setPlates(prev => prev.filter(p => p._id !== plateId));
        setDisplayedPlates(prev => prev.filter(p => p._id !== plateId));
    };

    const handlePlateCreated = (newPlate: Plate) => {
        setPlates(prev => [newPlate, ...prev]);
        setDisplayedPlates(prev => [newPlate, ...prev]);
    };

    const handlePlateUpdated = (updated: Plate) => {
        setPlates(prev =>
            prev.map(p => (p._id === updated._id ? updated : p))
        );
        setDisplayedPlates(prev =>
            prev.map(p => (p._id === updated._id ? updated : p))
        );
    };

    const hasMore = page * ITEMS_PER_PAGE < plates.length;

    return (
        <main className="w-full min-h-screen p-4 bg-gradient-to-br from-orange-50/10 via-gray-50/50 to-orange-50/10 ">
            {/* Back Button */}
            <div className="max-w-6xl mx-auto mb-6 flex justify-start">
                <Link href={`/${restaurant}`} className="group relative z-50">
                    <div className="glass-container glass-container--rounded w-16 h-16 p-0 relative transition-all duration-300 group-hover:scale-110 group-active:scale-95">
                        <div className="glass-filter pointer-events-none"></div>
                        <div className="glass-overlay pointer-events-none"></div>
                        <div className="glass-specular pointer-events-none"></div>

                        <div className="glass-content relative w-full h-full overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-200/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>

                            <svg
                                className="absolute inset-0 m-auto w-8 h-8 text-orange-600 z-[9999]"
                                fill="none"
                                stroke="currentColor"
                                viewBox="2 0 24 24"
                            >
                                <path
                                    d="M15 19l-7-7 7-7"
                                    strokeWidth={3}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>
                    </div>
                </Link>
            </div>

            {/* Menu Container */}
            <div className="max-w-6xl mx-auto glass-container glass-container--rounded p-0">
                <div className="glass-filter" />
                <div className="glass-overlay" />
                <div className="glass-specular" />

                <div className="glass-content w-full flex-col items-stretch !p-8">
                    <MenuGrid
                        plates={displayedPlates}
                        restaurant={restaurant}
                        isAdmin={isAdmin}
                        onPlateDeleted={handlePlateDeleted}
                        onPlateUpdated={handlePlateUpdated}
                    />

                    {/* Loading Indicator */}
                    {isLoading && (
                        <div className="flex justify-center items-center py-8">
                            <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-200 border-t-orange-600"></div>
                        </div>
                    )}

                    {/* Observer Target - solo si hay más items */}
                    {hasMore && <div ref={observerTarget} className="h-4" />}
                </div>
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