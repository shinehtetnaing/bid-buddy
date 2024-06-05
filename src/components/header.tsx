import Image from "next/image";
import { SignOut } from "./sign-out";
import { SignIn } from "./sign-in";
import { auth } from "@/auth";
import Link from "next/link";

export async function Header() {
  const session = await auth();

  return (
    <div className="bg-gray-200 py-2">
      <div className="container flex justify-between items-center">
        <div className="flex items-center gap-8">
          <Link href="/" className="hover:underline flex items-center gap-1">
            <Image src="/logo.png" width="50" height="50" alt="Logo" />
            BidBuddy.com
          </Link>

          <div>
            <Link
              href="/items/create"
              className="hover:underline flex items-center gap-1"
            >
              Auction an Item
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div>{session?.user?.name}</div>
          <div>{session ? <SignOut /> : <SignIn />}</div>
        </div>
      </div>
    </div>
  );
}
