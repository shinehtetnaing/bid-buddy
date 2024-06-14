import { Item } from "@/db/schema";
import { getImageUrl } from "@/lib/files";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { convertToDollar } from "@/lib/currency";

export function ItemCard({ item }: { item: Item }) {
  return (
    <div key={item.id} className="border p-8 rounded-xl space-y-2">
      <Image
        src={getImageUrl(item.fileKey)}
        alt={item.name}
        width={200}
        height={200}
      />
      <h2 className="text-xl font-bold">{item.name}</h2>
      <p className="text-lg">
        starting price ${convertToDollar(item.startingPrice)}
      </p>

      <Button asChild>
        <Link href={`/items/${item.id}`}>Place Bid</Link>
      </Button>
    </div>
  );
}
