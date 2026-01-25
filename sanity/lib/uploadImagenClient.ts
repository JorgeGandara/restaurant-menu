import { sanityClient } from "./apiClient";

export async function uploadImageClient(file: File): Promise<string> {
    const asset = await sanityClient.assets.upload("image", file, {
        filename: file.name,
        contentType: file.type,
    });
    return asset._id;
}