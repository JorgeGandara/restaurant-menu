"use client";

import Link from "next/link";
import MenuGrid from "./MenuGrid";
import AdminButton from "../components/AdminButton";
import MenuAdminActions from "./MenuAdminActions";
import { useState } from "react";
import { Plate } from "@/types/Plate";

type Props = {
    initialPlates: Plate[];
    restaurant: string;
    restaurantId: string;
    isAdmin: boolean;
};

export default function MenuClient({ initialPlates, restaurant, restaurantId, isAdmin }: Props) {
    const [plates, setPlates] = useState<Plate[]>(initialPlates);

    const handlePlateDeleted = (plateId: string) => {
        setPlates(prev => prev.filter(p => p._id !== plateId));
    };

    const handlePlateCreated = (newPlate: Plate) => {
        setPlates(prev => [newPlate, ...prev]);
    };

    const handlePlateUpdated = (updated: Plate) => {
        setPlates(prev =>
            prev.map(p => (p._id === updated._id ? updated : p))
        );
    };

    return (
        <main className="w-full min-h-screen p-4 bg-gradient-to-br from-orange-50/10 via-gray-50/50 to-orange-50/10 ">

            {/* Back Button */}
            <div className="max-w-6xl mx-auto mb-6 flex justify-start">
                <div className="glass-container glass-container--small glass-container--rounded p-0">
                    <div className="glass-filter" />
                    <div className="glass-overlay" />
                    <div className="glass-specular" />
                    <div className="glass-content py-2 px-4">
                        <Link href={`/${restaurant}`}>
                            <button className="glass-button-outline w-10 h-10 rounded-full flex items-center justify-center hover:bg-black/10 transition text-gray-900 border-gray-900/50">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                                </svg>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Menu Container */}
            <div className="max-w-6xl mx-auto glass-container glass-container--rounded p-0">
                <div className="glass-filter" />
                <div className="glass-overlay" />
                <div className="glass-specular" />

                <div className="glass-content w-full flex-col items-stretch !p-8">
                    <MenuGrid
                        plates={plates}
                        restaurant={restaurant}
                        isAdmin={isAdmin}
                        onPlateDeleted={handlePlateDeleted}
                        onPlateUpdated={handlePlateUpdated}
                    />
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
