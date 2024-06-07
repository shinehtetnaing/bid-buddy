import { db } from "@/db/database";
import { env } from "@/env";
import { getImageUrl } from "@/lib/files";
import Image from "next/image";

export default async function Home() {
  const allItems = await db.query.items.findMany();

  return (
    <main className="container mx-auto py-12 space-y-8">
      <h1 className="text-4xl font-bold">Items for Sale</h1>

      <div className="grid grid-cols-4 gap-8">
        {allItems.map((item) => (
          <div key={item.id} className="border p-8 rounded-xl">
            <Image
              src={getImageUrl(item.fileKey)}
              alt={item.name}
              width={200}
              height={200}
            />
            {item.name}
            starting price ${item.startingPrice / 100}
          </div>
        ))}
      </div>
    </main>
  );
}
