import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json();
    const restaurantSlug = body.restaurantSlug;

    const res = NextResponse.json({ message: "Logged out" });

    res.cookies.set({
        name: "admin_session",
        value: "",
        path: "/",
        maxAge: 0,
    });

    return res;
}
