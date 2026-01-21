'use server'

import { sanityClient } from "@/sanity/lib/apiClient";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPlate(prevState: any, formData: FormData) {
  
  const restaurantId = formData.get("restaurantId") as string;
  const restaurantSlug = formData.get("restaurantSlug") as string;

  if (!restaurantId) {
    throw new Error("Restaurant ID is missing");
  }

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = Number(formData.get("price"));
  const category = formData.get("category") as string;
  const imageFile = formData.get("image") as File;

  if (!name || !category) {
    throw new Error("Name and Category are required");
  }

  let imageAssetId = null;

  try {
    if (imageFile && imageFile.size > 0) {
        const arrayBuffer = await imageFile.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        
        const asset = await sanityClient.assets.upload('image', buffer, {
            filename: imageFile.name,
            contentType: imageFile.type
        });
        imageAssetId = asset._id;
    }

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
