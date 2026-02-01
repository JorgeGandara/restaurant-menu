"use server";

import { cookies } from "next/headers";
import { getAdminKey } from "@/sanity/sanity-utils";

export async function login(
    prevState: { error?: string; success?: boolean } | null,
    formData: FormData
) {

    const password = formData.get("password") as string;
    const restaurantSlug = formData.get("restaurantSlug") as string;

    if (!password || !restaurantSlug) {
        return { error: "Faltan datos" };
    }

    // 1. Fetch admin key from Sanity
    const adminKey = await getAdminKey(restaurantSlug);

    if (!adminKey) {
        return { error: "No se ha configurado una clave para este restaurante." };
    }


    if (password !== adminKey) {
        return { error: "Contraseña incorrecta" };
    }

    // 3. Set Cookie
    const cookieStore = await cookies();
    cookieStore.set("admin_session", restaurantSlug, {
        httpOnly: true,
        secure: false,
        path: "/",
        maxAge: 60 * 60 * 24,
    });

    // 4. Return success instead of Redirecting
    return { success: true };
}
