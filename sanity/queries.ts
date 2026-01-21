import { groq } from "next-sanity";

export const RESTAURANT_BY_SLUG = groq`
  *[_type == "restaurant" && slug.current == $slug][0]{
    _id,
    name,
    slug
  }
`;

export const PLATES_BY_RESTAURANT = groq`
  *[
    _type == "plate" &&
    restaurant->slug.current == $slug
  ]{
    _id,
    name,
    description,
    price,
    image,
    category
  }
`;