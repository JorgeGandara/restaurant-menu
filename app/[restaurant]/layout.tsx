import { getRestaurantSettings } from "@/sanity/sanity-utils";
import { urlFor } from "@/sanity/lib/image";
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
                backgroundImage: settings.backgroundImage
                  ? `linear-gradient(
                      rgba(0,0,0,0.4),
                      rgba(0,0,0,0.4)
                    ), url('${urlFor(settings.backgroundImage).url()}')`
                  : undefined,
                backgroundAttachment: "fixed",
                backgroundSize: "cover",
                backgroundPosition: "center",
                fontFamily: settings.typography?.fontFamily || 'inherit',
                fontSize: settings.typography?.fontSize ? `${settings.typography.fontSize}px` : 'inherit',
                fontWeight: settings.typography?.fontWeight || 'inherit',
            }}
        >
            {children}
        </div>
        
    );
}