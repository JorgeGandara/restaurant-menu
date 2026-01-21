import { getRestaurantSettings } from "@/sanity/sanity-utils";
import { notFound } from "next/navigation";

interface LayoutProps {
    children: React.ReactNode;
    params: Promise<{
        restaurant?: string;
    }>;
}

export default async function RestaurantLayout({
    children,
    params,
}: LayoutProps) {

    const { restaurant } = await params;

    if (!restaurant) {
        return children;
    }

    const settings = await getRestaurantSettings(restaurant);

    if (!settings) {
        notFound();
    }

    return (
        <div
            className="min-h-screen"
            style={{
                backgroundImage: `linear-gradient(
          rgba(0,0,0,0.2),
          rgba(0,0,0,0.2)
        ), url('${settings.backgroundImage || "/images/fondo.png"}')`,
                backgroundAttachment: "fixed",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            {children}
        </div>
    );
}