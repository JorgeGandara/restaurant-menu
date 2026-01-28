'use client'

import { useActionState, useEffect, useState } from 'react';
import { editPlate } from './actions';
import { Plate } from '@/types/Plate';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { uploadImageClient } from '@/sanity/lib/uploadImagenClient';

const initialState = { message: '' };

type Props = {
  restaurantSlug: string;
  plate: Plate;
  onSuccess?: () => void;
  onPlateUpdated?: (plate: Plate) => void;
  mode?: "menu" | "admin";
}

export default function EditPlateForm({ restaurantSlug, plate, onSuccess, onPlateUpdated, mode = "menu" }: Props) {
  const [state, formAction, isPending] = useActionState(editPlate, initialState);
  const [imageAssetId, setImageAssetId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const assetId = await uploadImageClient(file);
    setImageAssetId(assetId);
    setUploading(false);
  };

  useEffect(() => {
    if (!state?.success) return;

    if (state.redirectTo) {
      window.location.href = state.redirectTo;
      return;
    }

    if (state?.success && state?.plate) {
      onPlateUpdated?.(state.plate);
      onSuccess?.();
    }
  }, [state, onSuccess, onPlateUpdated]);

  return (
    <form action={formAction} className="space-y-4 p-6 pt-0">
      <input type="hidden" name="restaurantSlug" value={restaurantSlug} />
      <input type="hidden" name="plateId" value={plate._id} />
      <input type="hidden" name="mode" value={mode} />
      <input type="hidden" name="imageAssetId" value={imageAssetId ?? ""} />

      {/* Nombre */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Nombre del Plato
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          defaultValue={plate.name}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm border p-2"
        />
      </div>

      {/* Descripción */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Descripción
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          defaultValue={plate.description}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm border p-2"
        />
      </div>

      {/* Receta (Solo Admin) */}
      <div>
        <label htmlFor="recipe" className="block text-sm font-medium text-gray-700">
          Receta (Visible solo para administradores)
        </label>
        <textarea
          id="recipe"
          name="recipe"
          rows={5}
          defaultValue={plate.recipe || ""}
          placeholder="Ingredientes y pasos de preparación..."
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm border p-2"
        />
      </div>

      {/* Precio */}
      <div>
        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
          Precio
        </label>
        <input
          type="number"
          id="price"
          name="price"
          min="0"
          step="0.01"
          defaultValue={plate.price}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm border p-2"
        />
      </div>

      {/* Categoría */}
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
          Categoría
        </label>
        <select
          id="category"
          name="category"
          required
          defaultValue={plate.category}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm border p-2"
        >
          <option value="">Selecciona una categoría</option>
          <option value="entradas">Entradas</option>
          <option value="platos-fuertes">Platos Fuertes</option>
          <option value="postres">Postres</option>
          <option value="bebidas">Bebidas</option>
        </select>
      </div>

      {/* Imagen actual */}
      {plate.image && (
        <div className="mb-2 relative h-20 w-20">
          <Image
            src={urlFor(plate.image).url()}
            alt="Current"
            fill
            className="object-cover rounded-md"
          />
        </div>
      )}

      {/* Imagen nueva */}
      <div>
        <label htmlFor="image" className="block text-sm font-medium text-gray-700">
          Imagen (deja vacío para mantener actual)
        </label>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={handleImageChange}
          className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
        />
      </div>

      {/* Submit */}
      <div className="pt-4 flex gap-2">
        <button
          type="submit"
          disabled={isPending || uploading}
          className="flex-1 justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 Transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {uploading ? 'Subiendo imagen...' : isPending ? 'Guardando...' : 'Guardar Cambios'}
        </button>
      </div>

      {state?.message && !state.success && (
        <p className="text-red-500 text-sm">{state.message}</p>
      )}
    </form>

  );
}

