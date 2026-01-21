import { createClient, groq } from "next-sanity";
import { PLATES_BY_RESTAURANT, RESTAURANT_BY_SLUG } from "./queries";

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

export async function getRestaurantSettings(restaurantSlug: string) {
    return client.fetch(
        RESTAURANT_BY_SLUG,
        { slug: restaurantSlug }, 
        {
            next: { revalidate: 30 },
        }
    )
}
