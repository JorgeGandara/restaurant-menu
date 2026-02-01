export async function uploadImageClient(file: File): Promise<string> {
  if (!file.type.startsWith("image/")) {
    throw new Error("El archivo no es una imagen");
  }

  if (file.size > 10 * 1024 * 1024) {
    throw new Error("La imagen es demasiado grande (máx 10MB)");
  }

  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("/api/upload-image", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || "Error subiendo imagen");
  }

  const data = (await res.json()) as { assetId: string };
  return data.assetId;
}
