"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createItem, createUploadUrl } from "./actions";

export default async function CreatePage() {
  return (
    <main className="container mx-auto py-12 space-y-8">
      <h1 className="text-4xl font-bold">Post an Item</h1>

      <form
        className="flex flex-col border p-8 rounded-xl space-y-4 max-w-lg"
        // action={createItem}
        onSubmit={async (e) => {
          e.preventDefault();
          const form = e.currentTarget as HTMLFormElement;
          const formData = new FormData(form);
          const file = formData.get("file") as File;

          const uploadUrl = await createUploadUrl(file.name, file.type);

          await fetch(uploadUrl, {
            method: "PUT",
            body: file,
            headers: { "Content-Type": file.type },
          });

          await createItem({
            name: formData.get("name") as string,
            startingPrice: Math.floor(
              parseInt(formData.get("startingPrice") as string) * 100
            ),
            fileName: file.name,
          });
        }}
      >
        <Input
          type="text"
          className="max-w-lg"
          name="name"
          placeholder="Name your item"
          required
        />
        <Input
          type="number"
          className="max-w-lg"
          name="startingPrice"
          step="0.01"
          placeholder="What to start your auction at"
          required
        />
        <Input type="file" name="file" />
        <Button className="self-end" type="submit">
          Post Item
        </Button>
      </form>
    </main>
  );
}
