"use server";

import { auth } from "@/auth";
import { db } from "@/db/database";
import { bids, items } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { Knock } from "@knocklabs/node";
import { env } from "@/env";

const knock = new Knock(env.KNOCK_SECRET_KEY);

export async function createBid(itemId: number) {
  const session = await auth();

  const userId = session?.user?.id;

  if (!userId) {
    throw new Error("You must be logged in to place a bid");
  }

  // if (!session || !session.user || !session.user.id)
  //   throw new Error("You must be logged in to place a bid");

  const item = await db.query.items.findFirst({
    where: eq(items.id, itemId),
  });

  if (!item) throw new Error("Item not found");

  // const latestBidValue = item.startingPrice + item.bidInterval;
  const latestBidValue =
    item.currentBid === 0
      ? item.startingPrice + item.bidInterval
      : item.currentBid + item.bidInterval;

  await db.insert(bids).values({
    amount: latestBidValue,
    itemId,
    userId,
    timestamp: new Date(),
  });

  await db
    .update(items)
    .set({
      currentBid: latestBidValue,
    })
    .where(eq(items.id, itemId));

  const currentBids = await db.query.bids.findMany({
    where: eq(bids.itemId, itemId),
    with: {
      user: true,
    },
  });

  const recipients: {
    id: string;
    name: string;
    email: string;
  }[] = [];

  for (const bid of currentBids) {
    if (
      bid.userId !== userId &&
      !recipients.find((recipient) => recipient.id === bid.userId)
    ) {
      recipients.push({
        id: bid.userId + "",
        name: bid.user.name ?? "Anonymous",
        email: bid.user.email,
      });
    }
  }

  if (recipients.length > 0) {
    await knock.workflows.trigger("user-placed-bid", {
      actor: {
        id: userId,
        name: session.user.name ?? "Anonymous",
        email: session.user.email,
        collection: "users",
      },
      recipients,
      data: {
        itemId,
        bidAmount: latestBidValue,
      },
    });
  }

  revalidatePath(`/items/${itemId}`);
}
