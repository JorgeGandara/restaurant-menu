'use server'

import { sanityClient } from "@/sanity/lib/apiClient";
import { Plate } from "@/types/Plate";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type ActionState = {
  message?: string;
  success?: boolean;
  redirectTo?: string;
  plate?: Plate;

}

async function checkAdminCookie(restaurantSlug: string) {
  const cookieStore = cookies();
  const adminCookie = (await cookieStore).get('admin_session');
  if (!adminCookie || adminCookie.value !== restaurantSlug) {
    throw new Error('No autorizado');
  }
}

// async function uploadImage(imageFile: File): Promise<string | null> {
//   if (imageFile && imageFile.size > 0) {
//     const arrayBuffer = await imageFile.arrayBuffer();
//     const buffer = Buffer.from(arrayBuffer);

//     const asset = await sanityClient.assets.upload('image', buffer, {
//       filename: imageFile.name,
//       contentType: imageFile.type
//     });
//     return asset._id;
//   }
//   return null;
// }

export async function createPlate(_state: ActionState, formData: FormData): Promise<ActionState> {
  const restaurantId = formData.get("restaurantId") as string;
  const restaurantSlug = formData.get("restaurantSlug") as string;
  const mode = formData.get("mode") as "menu" | "admin";



  if (!restaurantId || !restaurantSlug) {
    return { message: "Restaurant ID or Slug is missing" };
  }

    await checkAdminCookie(restaurantSlug);

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const recipe = formData.get("recipe") as string;
    const price = Number(formData.get("price"));
    const category = formData.get("category") as string;

  if (!name || !category) {
    return { message: "Name and Category are required" };
  }

  try {
    const imageAssetId = formData.get("imageAssetId") as string;

    const doc = {
      _type: 'plate',
      name,
      description,
      recipe,
      price,
      category,
      restaurant: {
        _type: 'reference',
        _ref: restaurantId
      },
      ...(imageAssetId && {
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: imageAssetId
          }
        }
      })
    };

    const createdPlate = await sanityClient.create(doc);

    const plate: Plate = {
      _id: createdPlate._id,
      name: createdPlate.name,
      description: createdPlate.description,
      recipe: createdPlate.recipe,
      price: createdPlate.price,
      category: createdPlate.category,
      restaurantId: restaurantId,
      image: createdPlate.image?.asset?._ref || "" // acceso correcto al _ref
    };

    revalidatePath(`/${restaurantSlug}/admin`);
    revalidatePath(`/${restaurantSlug}/menu`);
    

    // 🟡 ADMIN → redirigir
    if (mode === "admin") {
      return {
        success: true,
        redirectTo: `/${restaurantSlug}/admin`,
      };
    }

    // 🟢 MENU → UI optimista
    return {
      success: true,
      plate,
    };

  } catch (error) {
    console.error("Error creating plate:", error);
    return { message: "Failed to create plate" };
  }
}

export async function editPlate(_state: ActionState, formData: FormData): Promise<ActionState> {


  const plateId = formData.get("plateId") as string;
  const restaurantSlug = formData.get("restaurantSlug") as string;
  const mode = formData.get("mode") as "menu" | "admin";

  if (!plateId || !restaurantSlug) {
    return { message: "Plate ID or Slug is missing" };
  }


  await checkAdminCookie(restaurantSlug);

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const recipe = formData.get("recipe") as string;
  const price = Number(formData.get("price"));
  const category = formData.get("category") as string;

  if (!name || !category) {
    return { message: "Name and Category are required" };
  }

  try {
    const imageAssetId = formData.get("imageAssetId") as string;

    const updates: any = {
      name,
      description,
      recipe,
      price,
      category,
    };

    if (imageAssetId) {
      updates.image = {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: imageAssetId
        }
      };
    }

    const updatedDoc = await sanityClient
      .patch(plateId)
      .set(updates)
      .commit();

    const updatedPlate: Plate = {
      _id: updatedDoc._id,
      name: updatedDoc.name,
      description: updatedDoc.description,
      recipe: updatedDoc.recipe,
      price: updatedDoc.price,
      category: updatedDoc.category,
      image: updatedDoc.image?.asset?._ref || "",
      restaurantId: updatedDoc.restaurant?._ref || "",
    };

    revalidatePath(`/${restaurantSlug}/admin`);
    revalidatePath(`/${restaurantSlug}/menu`);


    // 🟢 ADMIN → redirigir
    if (mode === "admin") {
      return {
        success: true,
        redirectTo: `/${restaurantSlug}/admin`,
      };
    }

    // 🟢 MENU→  UI optimista
    return {
      success: true,
      plate: updatedPlate,
    };

  } catch (error) {
    console.error("Error editing plate:", error);
    return { message: "Failed to update plate" };
  }
}

export async function deletePlate(_state: ActionState, formData: FormData): Promise<ActionState> {


  const plateId = formData.get("plateId") as string;
  const restaurantSlug = formData.get("restaurantSlug") as string;
  const mode = formData.get("mode") as "menu" | "admin";

  if (!plateId || !restaurantSlug) {
    return { message: "Missing required fields" };
  }

  await checkAdminCookie(restaurantSlug);

  try {
    await sanityClient.delete(plateId);
  } catch (error) {
    console.error("Error deleting plate:", error);
    return { message: "Failed to delete plate" };
  }

  revalidatePath(`/${restaurantSlug}/admin`);
  revalidatePath(`/${restaurantSlug}/menu`);

  return { message: "Plate deleted successfully" };
}
