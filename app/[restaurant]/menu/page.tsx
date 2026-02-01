import { getPlates, getRestaurantSettings } from "@/sanity/sanity-utils";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import MenuClient from "./MenuClient";

interface MenuProps {
    params: Promise<{
        restaurant?: string;
    }>;
}

export default async function Menu({ params }: MenuProps) {
    const { restaurant } = await params;

    if (!restaurant) notFound();

    const plates = await getPlates(restaurant);
    const restaurantData = await getRestaurantSettings(restaurant);

    if (!restaurantData) notFound();

    const restaurantId = restaurantData.restaurantId;

    const cookieStore = cookies();
    const adminSession = (await cookieStore).get("admin_session");
    const isAdmin = adminSession?.value === restaurant;

    return (
        <MenuClient
            initialPlates={plates}
            restaurant={restaurant}
            restaurantId={restaurantId}
            isAdmin={isAdmin}
        />
    );
}
