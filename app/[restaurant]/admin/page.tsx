import { getRestaurantSettings, getAdminPlates } from "@/sanity/sanity-utils";
import CreatePlateForm from "./CreatePlateForm";
import DeletePlateButton from "./DeletePlateButton";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Plate } from "@/types/Plate";

type Props = {
  params: Promise<{
    restaurant: string;
  }>;
};

export default async function AdminPage({ params }: Props) {
  const { restaurant } = await params;
  const restaurantData = await getRestaurantSettings(restaurant);

  if (!restaurantData) {
    notFound();
  }

  const plates = await getAdminPlates(restaurant);

  return (
    <div className="relative min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="fixed inset-0 z-0 bg-gray-100">
         <Image
            src="/images/fondo.png"
            alt="Fondo restaurante"
            fill
            className="object-cover blur-[3px] scale-110 opacity-50"
            priority
         />
      </div>
      
      <div className="relative z-10 w-full max-w-4xl mx-auto space-y-8">
        
        {/* Create Form Section */}
        <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-2xl overflow-hidden border border-white/20">
            <div className="px-6 pt-8 pb-4 text-center">
            <h1 className="text-3xl font-extrabold text-gray-900">
                Administración de Menú
            </h1>
            <p className="mt-2 text-sm text-gray-600 font-medium">
                {restaurantData.name}
            </p>
            </div>
            <div className="px-6 pb-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Agregar Nuevo Plato</h2>
                <CreatePlateForm restaurantId={restaurantData._id} restaurantSlug={restaurant} />
            </div>
        </div>

        {/* Existing Plates List */}
        <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-2xl overflow-hidden border border-white/20 p-6">
             <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">Platos Existentes ({plates.length})</h2>
             
             <div className="space-y-4">
                {plates.map((plate: Plate) => (
                    <div key={plate._id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="mb-4 sm:mb-0">
                            <h3 className="font-bold text-gray-900 text-lg">{plate.name}</h3>
                            <div className="flex items-center gap-3 text-sm text-gray-500">
                                <span className="px-2 py-0.5 bg-gray-100 rounded-full capitalize">{plate.category}</span>
                                <span className="font-semibold text-gray-700">${plate.price}</span>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-3 self-end sm:self-auto">
                            <Link 
                                href={`/${restaurant}/admin/edit/${plate._id}`}
                                className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-2">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                </svg>
                                Editar
                            </Link>
                            
                            <DeletePlateButton restaurantSlug={restaurant} plateId={plate._id} />
                        </div>
                    </div>
                ))}
                
                {plates.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                        No hay platos registrados aún. Usa el formulario de arriba para crear uno.
                    </div>
                )}
             </div>
        </div>

      </div>
    </div>
  );
}
