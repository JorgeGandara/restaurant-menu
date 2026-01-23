"use client";

import { useState } from "react";
import CreatePlateForm from "../admin/CreatePlateForm";
import { Plate } from "@/types/Plate";

type MenuAdminActionsProps = {
    restaurant: string;
    restaurantId: string;
    isAdmin: boolean;
    onPlateCreated?: (newPlate: Plate) => void; // ✅ prop
};

export default function MenuAdminActions({ restaurant, restaurantId, isAdmin, onPlateCreated }: MenuAdminActionsProps) {
    const [openCreate, setOpenCreate] = useState(false);

    if (!isAdmin) return null;

    return (
        <>
            <button
                onClick={() => setOpenCreate(true)}
                className="fixed bottom-24 right-6 z-50 w-14 h-14 rounded-full bg-orange-600 text-white text-3xl shadow-xl hover:scale-105 transition"
                title="Agregar nuevo plato"
            >
                +
            </button>

            {openCreate && (
                <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
                    <div className="bg-white rounded-xl p-6 w-full max-w-lg relative">
                        <h2 className="text-xl font-bold mb-4">Nuevo plato</h2>

                        <CreatePlateForm
                            restaurantId={restaurantId}
                            restaurantSlug={restaurant}
                            onSuccess={(newPlate) => {
                                setOpenCreate(false);
                                onPlateCreated?.(newPlate); // ✅ agregar dinámicamente
                            }}
                            mode="menu"
                        />

                        <button
                            onClick={() => setOpenCreate(false)}
                            className="absolute top-3 right-3 text-gray-500 hover:text-black"
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}


