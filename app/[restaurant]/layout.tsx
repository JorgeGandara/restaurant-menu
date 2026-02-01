import { getRestaurantSettings } from "@/sanity/sanity-utils";
import { urlFor } from "@/sanity/lib/image";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface LayoutProps {
    children: React.ReactNode;
    params: Promise<{
        restaurant?: string;
    }>;
}

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
    const { restaurant } = await params;
    if (!restaurant) return {};

    const settings = await getRestaurantSettings(restaurant);
    const faviconUrl = settings?.favicon ? urlFor(settings.favicon).url() : '/favicon.ico';

    return {
        title: settings?.name || 'Restaurant Menu',
        description: settings?.description || 'Menu digital',
        icons: {
            icon: faviconUrl,
            shortcut: faviconUrl,
            apple: faviconUrl,
        }
    };
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
                backgroundImage: settings.backgroundImage ? `url('${urlFor(settings.backgroundImage).url()}')` : undefined,
                backgroundColor: "rgba(0, 0, 0, 0.3)",
                backgroundBlendMode: "darken",
                backgroundAttachment: "fixed",
                backgroundSize: "cover",
                backgroundPosition: "center",
                fontFamily: settings.typography?.fontFamily || 'inherit',
                fontSize: settings.typography?.fontSize ? `${settings.typography.fontSize}px` : 'inherit',
                fontWeight: settings.typography?.fontWeight || 'inherit',
                "--primary-color": settings.primaryColor || "#EA580C",
            } as React.CSSProperties}
        >
            {children}
        </div>

    );
}