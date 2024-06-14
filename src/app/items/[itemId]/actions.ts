"use server";

import { auth } from "@/auth";
import { db } from "@/db/database";
import { bids, items } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function createBid(itemId: number) {
  const session = await auth();

  if (!session || !session.user || !session.user.id)
    throw new Error("You must be logged in to place a bid");

  const item = await db.query.items.findFirst({
    where: eq(items.id, itemId),
  });

  if (!item) throw new Error("Item not found");

  const latestBidValue = item.startingPrice + item.bidInterval;

  await db.insert(bids).values({
    amount: latestBidValue,
    itemId,
    userId: session.user.id,
    timestamp: new Date(),
  });

  await db
    .update(items)
    .set({
      currentBid: latestBidValue,
    })
    .where(eq(items.id, itemId));

  revalidatePath(`/items/${itemId}`);
}
