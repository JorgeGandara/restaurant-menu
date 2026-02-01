import { NextRequest, NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';
import { groq } from 'next-sanity';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const restaurantSlug = searchParams.get('restaurant');

    if (!restaurantSlug) {
      return NextResponse.json(
        { error: 'Missing restaurant parameter' },
        { status: 400 }
      );
    }

    const query = groq`
      *[_type == "category" && restaurant->slug.current == $slug] | order(name asc){
        _id,
        name
      }
    `;

    const categories = await client.fetch(query, { slug: restaurantSlug });

    return NextResponse.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}
