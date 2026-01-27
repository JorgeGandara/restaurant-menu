import { createClient, groq } from "next-sanity";
import { PLATES_BY_RESTAURANT, RESTAURANT_BY_SLUG, PLATE_BY_ID, ADMIN_PLATES_BY_RESTAURANT, GET_ADMIN_KEY} from "./queries";

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,

    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,

    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,

    useCdn: process.env.NODE_ENV === 'production',

})

export async function getPlates(restaurantSlug: string) {
    return client.fetch(
        PLATES_BY_RESTAURANT,
        { slug: restaurantSlug },
        {
            next: { revalidate: 30 },
        }
    )
}

export async function getAdminPlates(restaurantSlug: string) {
    return client.fetch(
        ADMIN_PLATES_BY_RESTAURANT,
        { slug: restaurantSlug },
        {
            next: { revalidate: 30 },
        }
    )
}

export async function getRestaurantSettings(restaurantSlug: string) {
    return client.fetch(
        RESTAURANT_BY_SLUG,
        { slug: restaurantSlug },
        {
            next: { revalidate: 30 },
        }
    );
}

export async function getPlate(id: string) {
    return client.fetch(
        PLATE_BY_ID,
        { id },
        {
            next: { revalidate: 0 },
        }
    )
}

export async function getAdminKey(restaurantSlug: string) {
    return client.fetch(
        GET_ADMIN_KEY,
        { slug: restaurantSlug },
        {
            next: { revalidate: 0 },
            token: process.env.NEXT_PUBLIC_SANITY_TOKEN
        }
    )
}
