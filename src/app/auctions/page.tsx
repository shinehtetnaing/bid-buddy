import { auth } from "@/auth";
import { ItemCard } from "@/components/item-card";
import { db } from "@/db/database";
import { items } from "@/db/schema";
import { eq } from "drizzle-orm";
import { EmptyState } from "./empty-state";

export default async function MyAuctions() {
  const session = await auth();
  if (!session || !session.user) throw new Error("Unauthorized");

  const allItems = await db.query.items.findMany({
    where: eq(items.userId, session.user.id!),
  });

  const hasItems = allItems.length > 0;

  return (
    <main className="container mx-auto py-12 space-y-8">
      <h1 className="text-4xl font-bold">Your Current Auctions</h1>

      {hasItems ? (
        <div className="grid grid-cols-4 gap-8">
          {allItems.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <EmptyState />
      )}
    </main>
  );
}
