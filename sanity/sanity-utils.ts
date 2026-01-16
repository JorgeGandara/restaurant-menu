import { createClient, groq } from "next-sanity";

export async function getPlates() {
    const client = createClient({

        projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,

        dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,

        apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,

    })

    return client.fetch(groq`*[_type == "plate"]{
        _id,
        name,
        description,
        category,
        image,
        price
        }`
    )
}
