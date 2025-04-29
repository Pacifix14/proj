import "@/styles/globals.css";
import { HydrateClient } from "@/trpc/server";
import { TRPCReactProvider } from "@/trpc/react";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import { NuqsAdapter } from "nuqs/adapters/next/app";

export const metadata: Metadata = {
  title: "Budget Builder",
  description: "Event budget planning made easy",
  icons: [{ rel: "icon", url: "/budget-builder-logo.png" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={GeistSans.variable} suppressHydrationWarning>
      <body className="bg-background min-h-screen">
        <TRPCReactProvider>
          <HydrateClient>
            <NuqsAdapter>{children}</NuqsAdapter>
          </HydrateClient>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
