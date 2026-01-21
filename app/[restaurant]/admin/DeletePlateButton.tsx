'use client'

import { useActionState, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { deletePlate } from './actions';

const initialState = {
  message: '',
};

type Props = {
    restaurantSlug: string;
    plateId: string;
}

export default function DeletePlateButton({ restaurantSlug, plateId }: Props) {
    const [state, formAction] = useActionState(deletePlate, initialState);
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <>
            <button 
                type="button" 
                onClick={() => setIsOpen(true)}
                className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-md text-sm font-medium transition-colors"
            >
                Eliminar
            </button>

            {mounted && isOpen && createPortal(
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div 
                        className="fixed inset-0 bg-black/50 transition-opacity backdrop-blur-sm"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Modal */}
                    <div className="relative bg-white rounded-lg shadow-xl max-w-sm w-full overflow-hidden transform transition-all animate-in zoom-in-95 duration-200">
                        <div className="p-6">
                            <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-red-600">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                            </div>

                            <h3 className="text-lg font-bold text-gray-900 text-center mb-2">
                                ¿Eliminar plato?
                            </h3>
                            
                            <p className="text-sm text-gray-500 text-center mb-6">
                                ¿Estás seguro de que quieres eliminar este plato? Esta acción no se puede deshacer.
                            </p>
                            
                            <div className="flex gap-3 justify-center">
                                <button
                                    type="button"
                                    onClick={() => setIsOpen(false)}
                                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
                                >
                                    Cancelar
                                </button>
                                
                                <form action={formAction} onSubmit={() => setIsOpen(false)}>
                                    <input type="hidden" name="restaurantSlug" value={restaurantSlug} />
                                    <input type="hidden" name="plateId" value={plateId} />
                                    <button 
                                        type="submit" 
                                        className="px-4 py-2 bg-red-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors shadow-sm"
                                    >
                                        Sí, eliminar
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>,
                document.body
            )}
            
            {state?.message && state.message !== 'Plate deleted successfully' && (
                <p className="text-red-500 text-xs absolute mt-1">{state.message}</p>
            )}
        </>
    );
}

