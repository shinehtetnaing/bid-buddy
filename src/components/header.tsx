"use client";

import { auth } from "@/auth";
import {
  NotificationFeedPopover,
  NotificationIconButton,
} from "@knocklabs/react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { Button } from "./ui/button";

export function Header() {
  const [isVisible, setIsVisible] = useState(false);
  const notifButtonRef = useRef(null);
  const session = useSession();

  return (
    <div className="bg-gray-200 py-2">
      <div className="container flex justify-between items-center">
        <div className="flex items-center gap-8">
          <Link href="/" className="hover:underline flex items-center gap-1">
            <Image src="/logo.png" width="50" height="50" alt="Logo" />
            BidBuddy.com
          </Link>

          <div className="flex items-center gap-8">
            <Link href="/" className="hover:underline flex items-center gap-1">
              All Auctions
            </Link>
            <Link
              href="/items/create"
              className="hover:underline flex items-center gap-1"
            >
              Create Auction
            </Link>
            <Link
              href="/auctions"
              className="hover:underline flex items-center gap-1"
            >
              My Auctions
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div>
            <NotificationIconButton
              ref={notifButtonRef}
              onClick={(e) => setIsVisible(!isVisible)}
            />
            <NotificationFeedPopover
              buttonRef={notifButtonRef}
              isVisible={isVisible}
              onClose={() => setIsVisible(false)}
            />
          </div>
          <div>{session?.data?.user?.name}</div>
          <div>
            {session ? (
              <Button
                type="submit"
                onClick={() =>
                  signOut({
                    callbackUrl: "/",
                  })
                }
              >
                Sign Out
              </Button>
            ) : (
              <Button type="submit" onClick={() => signIn()}>
                Sign In
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
