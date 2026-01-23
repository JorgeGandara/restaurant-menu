"use client";
import { useRouter } from "next/navigation";

type LogoutButtonProps = { restaurant: string };

export default function LogoutButton({ restaurant }: LogoutButtonProps) {
    const router = useRouter();

    const handleLogout = async () => {
        // Llamar al endpoint de logout
        await fetch("/api/logout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ restaurantSlug: restaurant }),
        });

        // Redirige al menú público
        router.push(`/${restaurant}`);
    };

    return (
        <button
            onClick={handleLogout}
            className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
            Cerrar Sesión
        </button>
    );
}

