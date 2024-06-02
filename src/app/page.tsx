import { db } from "@/db/database";
import { bids as bidsSchema } from "@/db/schema";

export default async function Home() {
  const bids = await db.query.bids.findMany();

  return (
    <main className="container mx-auto py-12">
      <form
        action={async (formData: FormData) => {
          "use server";
          // const bid = formData.get("bid") as string;
          await db.insert(bidsSchema).values({});
        }}
      >
        <input type="text" name="bid" id="bid" placeholder="Bid" />
        <button type="submit">Place Bid</button>
      </form>

      {bids.map((bid) => (
        <div key={bid.id}>{bid.id}</div>
      ))}
    </main>
  );
}
