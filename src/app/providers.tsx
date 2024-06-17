"use client";

import { env } from "@/env";
import { KnockFeedProvider, KnockProvider } from "@knocklabs/react";
// Required CSS import, unless you're overriding the styling
import "@knocklabs/react/dist/index.css";
import { useSession } from "next-auth/react";
import { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  const session = useSession();

  // if (!session?.data?.user?.id) {
  //   return <div>{children}</div>;
  // }

  return (
    <KnockProvider
      apiKey={env.NEXT_PUBLIC_KNOCK_PUBLIC_API_KEY}
      userId={session?.data?.user?.id ?? ""}
    >
      {/* Optionally, use the KnockFeedProvider to connect an in-app feed */}
      <KnockFeedProvider feedId={env.NEXT_PUBLIC_KNOCK_FEED_ID}>
        {children}
      </KnockFeedProvider>
    </KnockProvider>
  );
}
