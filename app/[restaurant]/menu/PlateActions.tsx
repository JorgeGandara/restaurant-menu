"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import EditPlateForm from "../admin/EditPlateForm";
import DeletePlateButton from "../admin/DeletePlateButton";
import { EditIcon } from "../components/icons";
import { Plate } from "@/types/Plate";

type PlateActionsProps = {
    plate: Plate;
    restaurantSlug: string;
    isAdmin: boolean;
    onPlateDeleted?: (plateId: string) => void; // ✅ prop
    onPlateUpdated?: (plate: Plate) => void;
};

export default function PlateActions({ plate, restaurantSlug, isAdmin, onPlateDeleted, onPlateUpdated }: PlateActionsProps) {
    const [showEdit, setShowEdit] = useState(false);

    if (!isAdmin) return null;

    return (
        <>
            <div className="absolute top-2 right-2 flex gap-2 z-10">
                <button
                    onClick={() => setShowEdit(true)}
                    className="p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-md hover:shadow-lg transition"
                    title="Editar plato"
                >
                    <EditIcon className="size-6" />
                </button>

                <DeletePlateButton
                    plateId={plate._id}
                    restaurantSlug={restaurantSlug}
                    onSuccess={() => onPlateDeleted?.(plate._id)}
                />
            </div>

            {showEdit &&
                typeof document !== "undefined" &&
                createPortal(
                    <div className="fixed inset-0 z-[9999] bg-black/40 flex items-center justify-center p-4">
                        <div className="absolute inset-0 z-0" onClick={() => setShowEdit(false)}></div>
                        <div className="bg-white rounded-xl p-6 w-full max-w-lg relative z-10 max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-200">
                            <h2 className="text-xl font-bold mb-4">Editar plato</h2>

                            <EditPlateForm
                                plate={plate}
                                restaurantSlug={restaurantSlug}
                                onSuccess={() => setShowEdit(false)}
                                onPlateUpdated={onPlateUpdated}
                                mode="menu"
                            />

                            <button
                                onClick={() => setShowEdit(false)}
                                className="absolute top-3 right-3 text-gray-500 hover:text-black p-1"
                            >
                                ✕
                            </button>
                        </div>
                    </div>,
                    document.body
                )}
        </>
    );
}

