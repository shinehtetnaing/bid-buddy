import { auth } from "@/auth";
import { SignIn } from "@/components/sign-in";
import { SignOut } from "@/components/sign-out";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/db/database";
import { items } from "@/db/schema";
import { revalidatePath } from "next/cache";

export default async function Home() {
  const session = await auth();

  const allItems = await db.query.items.findMany();

  return (
    <main className="container mx-auto py-12 space-y-8">
      <h1 className="text-4xl font-bold">Post an Item to sell</h1>

      <form
        className="flex flex-col border p-8 rounded-xl space-y-4 max-w-lg"
        action={async (formData: FormData) => {
          "use server";
          await db.insert(items).values({
            name: formData.get("name") as string,
            userId: session?.user?.id!,
          });
          revalidatePath("/");
        }}
      >
        <Input
          className="max-w-lg"
          type="text"
          name="name"
          id="name"
          placeholder="Name your item"
        />
        <Button className="self-end" type="submit">
          Post Item
        </Button>
      </form>

      <h2 className="text-2xl font-bold">Items for Sale</h2>

      <div className="grid grid-cols-4 gap-8">
        {allItems.map((item) => (
          <div key={item.id} className="border p-8 rounded-xl">
            {item.name}
          </div>
        ))}
      </div>
    </main>
  );
}
