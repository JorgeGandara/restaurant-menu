import { getRestaurantSettings } from "@/sanity/sanity-utils";
import CreatePlateForm from "./CreatePlateForm";
import { notFound } from "next/navigation";
import Image from "next/image";

type Props = {
  params: Promise<{
    restaurant: string;
  }>;
};

export default async function CreatePlatePage({ params }: Props) {
  const { restaurant } = await params;
  const restaurantData = await getRestaurantSettings(restaurant);

  if (!restaurantData) {
    notFound();
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 z-0">
         <Image
            src="/images/fondo.png"
            alt="Fondo restaurante"
            fill
            className="object-cover blur-[3px] scale-110"
            priority
         />
      </div>
      
      <div className="relative z-10 w-full max-w-xl mx-auto bg-white/80 backdrop-blur-md rounded-xl shadow-2xl overflow-hidden border border-white/20">
        <div className="px-6 pt-8 pb-4 text-center">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Agregar Nuevo Plato
          </h1>
          <p className="mt-2 text-sm text-gray-600 font-medium">
            Complete el formulario para agregar un nuevo plato al menú de {restaurantData.name}.
          </p>
        </div>
        <CreatePlateForm restaurantId={restaurantData._id} restaurantSlug={restaurant} />
      </div>
    </div>
  );
}
