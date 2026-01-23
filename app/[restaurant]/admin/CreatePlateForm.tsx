'use client'

import { useActionState, useEffect } from 'react';
import { createPlate } from './actions';
import { Plate } from '@/types/Plate';



type Props = {
  restaurantId: string;
  restaurantSlug: string;
  onSuccess?: (newPlate: Plate) => void; // 🔹 ahora recibe el plato
  mode?: "menu" | "admin";
}

export default function CreatePlateForm({ restaurantId, restaurantSlug, onSuccess, mode = "menu" }: Props) {
  const initialState = { message: '' };
  const [state, formAction] = useActionState(createPlate, initialState);

  useEffect(() => {
    if (!state?.success) return;

    // 🟢 ADMIN → redirección
    if (state.redirectTo) {
      window.location.href = state.redirectTo;
      return;
    }

    // 🟢 MENU → UI optimista
    if (state.plate) {
      onSuccess?.(state.plate);
    }
  }, [state, onSuccess]);

  return (
    <form action={formAction} className="space-y-4 p-6 pt-0">
      <input type="hidden" name="restaurantId" value={restaurantId} />
      <input type="hidden" name="restaurantSlug" value={restaurantSlug} />
      <input type="hidden" name="mode" value={mode} />

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre del Plato</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm border p-2"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descripción</label>
        <textarea
          id="description"
          name="description"
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm border p-2"
        />
      </div>

      <div>
        <label htmlFor="price" className="block text-sm font-medium text-gray-700">Precio</label>
        <input
          type="number"
          id="price"
          name="price"
          min="0"
          step="0.01"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm border p-2"
        />
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Categoría</label>
        <select
          id="category"
          name="category"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm border p-2"
        >
          <option value="">Selecciona una categoría</option>
          <option value="entradas">Entradas</option>
          <option value="platos-fuertes">Platos Fuertes</option>
          <option value="postres">Postres</option>
          <option value="bebidas">Bebidas</option>
        </select>
      </div>

      <div>
        <label htmlFor="image" className="block text-sm font-medium text-gray-700">Imagen</label>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
        />
      </div>

      <div className="pt-4">
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 Transition-colors duration-200"
        >
          Crear Plato
        </button>
      </div>

      {state?.message && !state.success && (
        <p className="text-red-500 text-sm">{state.message}</p>
      )}
    </form>
  );
}

