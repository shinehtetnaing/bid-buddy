"use server";

import { auth } from "@/auth";
import { db } from "@/db/database";
import { items } from "@/db/schema";
import { getSignedUrlForS3Object } from "@/lib/s3";
import { redirect } from "next/navigation";

export async function createUploadUrl(key: string, type: string) {
  return await getSignedUrlForS3Object(key, type);
}

export async function createItem({
  fileName,
  name,
  startingPrice,
}: {
  fileName: string;
  name: string;
  startingPrice: number;
}) {
  const session = await auth();

  if (!session) throw new Error("Unauthorized");

  const user = session.user;

  if (!user || !user.id) throw new Error("Unauthorized");

  // const startingPrice = formData.get("startingPrice") as string;
  // const priceAsCents = Math.floor(parseFloat(startingPrice) * 100);

  await db.insert(items).values({
    // name: formData.get("name") as string,
    // startingPrice: priceAsCents,
    name,
    startingPrice,
    fileKey: fileName,
    userId: user.id!,
  });
  redirect("/");
}
