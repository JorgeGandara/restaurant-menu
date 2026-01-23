'use server';

import { cookies } from 'next/headers';
import { sanityClient } from "@/sanity/lib/apiClient";
import { revalidatePath } from "next/cache";

export async function deletePlate(formData: FormData) {
    // 1️⃣ Validar cookie
    const cookieStore = cookies();
    const adminCookie = (await cookieStore).get('admin_session'); // tu cookie de sesión
    if (!adminCookie || adminCookie.value !== 'true') {
        throw new Error('No autorizado');
    }

    const plateId = formData.get("plateId") as string;
    const restaurantSlug = formData.get("restaurantSlug") as string;

    if (!plateId || !restaurantSlug) {
        throw new Error("Missing required fields");
    }

    try {
        await sanityClient.delete(plateId);
        revalidatePath(`/${restaurantSlug}/menu`);
        revalidatePath(`/${restaurantSlug}/admin`);
    } catch (error) {
        console.error("Error deleting plate:", error);
        throw new Error("Failed to delete plate");
    }
}