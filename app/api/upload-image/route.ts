import { NextResponse } from "next/server";
import sharp from "sharp";
import { sanityClient } from "@/sanity/lib/apiClient";

export const runtime = "nodejs"; // sharp needs node

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "Archivo inválido" }, { status: 400 });
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "El archivo no es una imagen" }, { status: 400 });
    }

    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: "La imagen es demasiado grande (máx 10MB)" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const webpBuffer = await sharp(buffer)
      .webp({ quality: 75, effort: 6 })
      .toBuffer();

    const asset = await sanityClient.assets.upload("image", webpBuffer, {
      filename: file.name.replace(/\.[^.]+$/, ".webp"),
      contentType: "image/webp",
    });

    return NextResponse.json({ assetId: asset._id });
  } catch (error) {
    console.error("Upload error", error);
    return NextResponse.json({ error: "Error subiendo imagen" }, { status: 500 });
  }
}
