import { NextRequest, NextResponse } from "next/server";
import { getAdminKey } from "@/sanity/sanity-utils";

export async function POST(request: NextRequest) {
    try {
        const { restaurantSlug, password } = await request.json();

        if (!restaurantSlug || !password) {
            return NextResponse.json({ isValid: false }, { status: 400 });
        }

        const adminKey = await getAdminKey(restaurantSlug);

        if (!adminKey) {
            return NextResponse.json({ isValid: false }, { status: 404 });
        }

        const isValid = password === adminKey;

        return NextResponse.json({ isValid });
    } catch (error) {
        console.error("Error verifying admin:", error);
        return NextResponse.json({ isValid: false }, { status: 500 });
    }
}
