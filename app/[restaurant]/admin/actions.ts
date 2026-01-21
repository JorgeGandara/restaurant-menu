'use server'

import { sanityClient } from "@/sanity/lib/apiClient";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

type ActionState = {
    message: string;
}

async function uploadImage(imageFile: File): Promise<string | null> {
    if (imageFile && imageFile.size > 0) {
        const arrayBuffer = await imageFile.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        
        const asset = await sanityClient.assets.upload('image', buffer, {
            filename: imageFile.name,
            contentType: imageFile.type
        });
        return asset._id;
    }
    return null;
}

export async function createPlate(prevState: ActionState, formData: FormData): Promise<ActionState> {
  const restaurantId = formData.get("restaurantId") as string;
  const restaurantSlug = formData.get("restaurantSlug") as string;

  if (!restaurantId || !restaurantSlug) {
    return { message: "Restaurant ID or Slug is missing" };
  }

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = Number(formData.get("price"));
  const category = formData.get("category") as string;
  const imageFile = formData.get("image") as File;

  if (!name || !category) {
    return { message: "Name and Category are required" };
  }

  try {
    const imageAssetId = await uploadImage(imageFile);

    const doc = {
        _type: 'plate',
        name,
        description,
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

    await sanityClient.create(doc);
    
  } catch (error) {
    console.error("Error creating plate:", error);
    return { message: "Failed to create plate" };
  }

  revalidatePath(`/${restaurantSlug}/menu`); 
  redirect(`/${restaurantSlug}/menu`);
}

export async function editPlate(prevState: ActionState, formData: FormData): Promise<ActionState> {
  const plateId = formData.get("plateId") as string;
  const restaurantSlug = formData.get("restaurantSlug") as string;

  if (!plateId || !restaurantSlug) {
    return { message: "Plate ID or Slug is missing" };
  }

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = Number(formData.get("price"));
  const category = formData.get("category") as string;
  const imageFile = formData.get("image") as File;

  if (!name || !category) {
    return { message: "Name and Category are required" };
  }

  try {
    const imageAssetId = await uploadImage(imageFile);

    const updates: any = {
        name,
        description,
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

    await sanityClient.patch(plateId).set(updates).commit();
    
  } catch (error) {
    console.error("Error editing plate:", error);
    return { message: "Failed to edit plate" };
  }

  revalidatePath(`/${restaurantSlug}/admin`);
  revalidatePath(`/${restaurantSlug}/menu`);
  redirect(`/${restaurantSlug}/admin`);
}

export async function deletePlate(prevState: ActionState, formData: FormData): Promise<ActionState> {
    const plateId = formData.get("plateId") as string;
    const restaurantSlug = formData.get("restaurantSlug") as string;

    if (!plateId || !restaurantSlug) {
        return { message: "Missing required fields" };
    }

    try {
        await sanityClient.delete(plateId);
    } catch (error) {
        console.error("Error deleting plate:", error);
        return { message: "Failed to delete plate" };
    }

    revalidatePath(`/${restaurantSlug}/admin`);
    return { message: "Plate deleted successfully" };
}
