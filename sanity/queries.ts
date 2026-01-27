import { groq } from "next-sanity";

export const RESTAURANT_BY_SLUG = groq`
  *[_type == "restaurantSettings" && restaurant->slug.current == $slug][0]{
    _id,
    name,
    description,
    address,
    phone,
    email,
    instagram,
    facebook,
    whatsapp,
    logo,
    imagen_del_restaurante,
    googleMapsUrl,
    videoHowToArrive,
    typography,
    backgroundImage,
    "slug": restaurant->slug.current,
    "restaurantId": restaurant._ref
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

export const ADMIN_PLATES_BY_RESTAURANT = groq`
  *[
    _type == "plate" &&
    restaurant->slug.current == $slug
  ]{
    _id,
    name,
    price,
    category
  }
`;

export const PLATE_BY_ID = groq`
  *[_type == "plate" && _id == $id][0]{
    _id,
    name,
    description,
    price,
    category
  }
`;

export const GET_ADMIN_KEY = groq`
  *[_type == "restaurantSettings" && restaurant->slug.current == $slug][0].adminKey
`;


