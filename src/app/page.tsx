import { ItemCard } from "@/components/item-card";
import { db } from "@/db/database";

export default async function Home() {
  const allItems = await db.query.items.findMany();

  return (
    <main className="space-y-8">
      <h1 className="text-4xl font-bold">Items for Sale</h1>

      <div className="grid grid-cols-4 gap-8">
        {allItems.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </main>
  );
}
