import { Button } from "@/components/ui/button";
import { db } from "@/db/database";
import { items } from "@/db/schema";
import { convertToDollar } from "@/lib/currency";
import { getImageUrl } from "@/lib/files";
import { formatDistance } from "date-fns";
import { eq } from "drizzle-orm";
import Image from "next/image";
import Link from "next/link";

function formatTimestamp(timestamp: Date) {
  return formatDistance(timestamp, new Date(), { addSuffix: true });
}

export default async function ItemPage({
  params: { itemId },
}: {
  params: { itemId: string };
}) {
  const item = await db.query.items.findFirst({
    where: eq(items.id, parseInt(itemId)),
  });

  if (!item)
    return (
      <div className="space-y-8 flex items-center flex-col mt-12">
        <Image src="/package.svg" alt="Package" width={200} height={200} />
        <h1 className="text-xl font-bold">Item not found</h1>
        <p className="text-center">
          The item you are trying to view is invalid.
          <br /> Please go back and search for a different auction item.
        </p>

        <Button asChild>
          <Link href="/">View Auction</Link>
        </Button>
      </div>
    );

  const bids = [
    {
      id: 1,
      amount: 100,
      username: "Alice",
      timestamp: new Date(),
    },
    {
      id: 2,
      amount: 200,
      username: "Bob",
      timestamp: new Date(),
    },
    {
      id: 3,
      amount: 300,
      username: "Charlie",
      timestamp: new Date(),
    },
  ];
  //   const bids = [];

  const hasBids = bids.length > 0;

  return (
    <main className="flex container mx-auto gap-8">
      <div className="flex flex-col gap-8">
        <h1 className="text-4xl font-bold">
          <span className="font-normal">Auction for</span> {item.name}
        </h1>
        <Image
          src={getImageUrl(item.fileKey)}
          alt={item.name}
          width={300}
          height={300}
          className="rounded-xl"
        />
        <div className="text-xl space-y-4">
          <div>
            Starting Price of{" "}
            <span className="font-bold">
              ${convertToDollar(item.startingPrice)}
            </span>
          </div>
          <div>
            Bid Interval{" "}
            <span className="font-bold">
              ${convertToDollar(item.bidInterval)}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-6 flex-1">
        <h2 className="text-2xl font-bold">Current Bids</h2>

        {hasBids ? (
          <ul className="space-y-4">
            {bids.map((bid) => (
              <li key={bid.id} className="bg-gray-100 rounded-xl p-8">
                <div className="flex gap-4">
                  <div>
                    <span className="font-bold">${bid.amount}</span> by{" "}
                    <span className="font-bold">{bid.username}</span>
                  </div>
                  <div className="">{formatTimestamp(bid.timestamp)}</div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-center gap-8 bg-gray-100 rounded-xl p-12">
            <Image src="/package.svg" alt="Package" width={200} height={200} />
            <h2 className="text-2xl font-bold">No bids yet</h2>
            <Button>Place a Bid</Button>
          </div>
        )}
      </div>
    </main>
  );
}
