'use client'

import { useActionState, useEffect, useState } from 'react';
import { createPlate } from './actions';
import { Plate } from '@/types/Plate';
import { uploadImageClient } from '@/sanity/lib/uploadImagenClient';

type Category = {
  _id: string;
  name: string;
};

type Props = {
  restaurantId: string;
  restaurantSlug: string;
  onSuccess?: (newPlate: Plate) => void; // 🔹 ahora recibe el plato
  mode?: "menu" | "admin";
}

export default function CreatePlateForm({ restaurantId, restaurantSlug, onSuccess, mode = "menu" }: Props) {
  const initialState = { message: '' };
  const [state, formAction] = useActionState(createPlate, initialState);
  const [imageAssetId, setImageAssetId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`/api/categories?restaurant=${restaurantSlug}`);
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, [restaurantSlug]);

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

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const assetId = await uploadImageClient(file);
    setImageAssetId(assetId);
    setUploading(false);
  };

  return (
    <form action={formAction} className="space-y-4 p-6 pt-0">
      <input type="hidden" name="restaurantId" value={restaurantId} />
      <input type="hidden" name="restaurantSlug" value={restaurantSlug} />
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
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[var(--primary-color)] focus:ring-[var(--primary-color)] sm:text-sm border p-2"
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
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[var(--primary-color)] focus:ring-[var(--primary-color)] sm:text-sm border p-2"
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
          placeholder="Ingredientes y pasos de preparación..."
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[var(--primary-color)] focus:ring-[var(--primary-color)] sm:text-sm border p-2"
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
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[var(--primary-color)] focus:ring-[var(--primary-color)] sm:text-sm border p-2"
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
          disabled={loadingCategories}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[var(--primary-color)] focus:ring-[var(--primary-color)] sm:text-sm border p-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <option value="">{loadingCategories ? 'Cargando categorías...' : 'Selecciona una categoría'}</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Imagen */}
      <div>
        <label htmlFor="image" className="block text-sm font-medium text-gray-700">
          Imagen
        </label>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={handleImageChange}
          className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold text-[color:color-mix(in_srgb,var(--primary-color),black_20%)] file:bg-[color:color-mix(in_srgb,var(--primary-color),white_90%)] file:text-[color:color-mix(in_srgb,var(--primary-color),black_20%)] hover:file:bg-[color:color-mix(in_srgb,var(--primary-color),white_80%)]"
        />
      </div>

      {/* Submit */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={uploading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[var(--primary-color)] hover:bg-[color:color-mix(in_srgb,var(--primary-color),black_10%)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--primary-color)] Transition-colors duration-200"
        >
          {uploading ? "Subiendo imagen..." : "Crear Plato"}
        </button>
      </div>

      {state?.message && !state.success && (
        <p className="text-red-500 text-sm">{state.message}</p>
      )}
    </form>
  );
}

