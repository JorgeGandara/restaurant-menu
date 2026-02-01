
import { getPlate, getRestaurantSettings } from "@/sanity/sanity-utils";
import EditPlateForm from "../../EditPlateForm";
import { notFound } from "next/navigation";
import Image from "next/image";

type Props = {
    params: Promise<{
        restaurant: string;
        id: string;
    }>;
};

export default async function EditPlatePage({ params }: Props) {
    const { restaurant, id } = await params;
    const restaurantData = await getRestaurantSettings(restaurant);
    const plate = await getPlate(id);

    if (!restaurantData || !plate) {
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
                        Editar Plato
                    </h1>
                </div>
                <EditPlateForm
                    restaurantSlug={restaurant}
                    plate={plate}
                    mode="admin"
                />
            </div>
        </div>
    );
}
