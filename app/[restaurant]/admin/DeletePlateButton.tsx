'use client'

import { useActionState, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { deletePlate } from './actions';
import { DeleteIcon } from '../components/icons';

type Props = {
    restaurantSlug: string;
    plateId: string;
    onSuccess?: () => void;
};

const initialState = {
    message: '',
};

export default function DeletePlateButton({ restaurantSlug, plateId, onSuccess }: Props) {
    const [state, formAction] = useActionState(deletePlate, initialState);
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);
    const handleConfirmDelete = () => {
        onSuccess?.();      // ⚡ UI optimista inmediata
        setIsOpen(false);   // cerrar modal
    };
    if (!mounted) return null;

    return (
        <>
            {/* ✅ BOTÓN INLINE */}
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="p-2 bg-red-100 text-red-700 hover:bg-red-200 rounded-lg shadow-md transition"
                title="Eliminar plato"
            >
                <DeleteIcon className="size-6" />
            </button>

            {/* ✅ SOLO EL MODAL VA AL PORTAL */}
            {isOpen &&
                createPortal(
                    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                        {/* Backdrop */}
                        <div
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Modal */}
                        <div className="relative bg-white rounded-lg shadow-xl max-w-sm w-full overflow-hidden animate-in zoom-in-95 duration-200">
                            <div className="p-6 text-center">
                                <h3 className="text-lg font-bold text-gray-900 mb-2">
                                    ¿Eliminar plato?
                                </h3>
                                <p className="text-sm text-gray-500 mb-6">
                                    Esta acción no se puede deshacer.
                                </p>

                                <div className="flex gap-3 justify-center">
                                    <button
                                        type="button"
                                        onClick={() => setIsOpen(false)}
                                        className="px-4 py-2 border rounded-md text-sm"
                                    >
                                        Cancelar
                                    </button>

                                    <form action={formAction}  onSubmit={handleConfirmDelete}>
                                        <input type="hidden" name="restaurantSlug" value={restaurantSlug} />
                                        <input type="hidden" name="plateId" value={plateId} />
                                        <button
                                            type="submit"
                                            className="px-4 py-2 bg-red-600 text-white rounded-md"
                                        >
                                            Sí, eliminar
                                        </button>
                                    </form>
                                </div>

                                {state?.message && !state.success && (
                                    <p className="text-red-500 text-xs mt-2">{state.message}</p>
                                )}
                            </div>
                        </div>
                    </div>,
                    document.body
                )}
        </>
    );
}



