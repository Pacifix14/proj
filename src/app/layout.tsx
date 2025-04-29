import "@/styles/globals.css";
import { TRPCReactProvider } from "@/trpc/react";
import { HydrateClient } from "@/trpc/server";
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
			<body className="min-h-screen bg-background">
				<TRPCReactProvider>
					<HydrateClient>
						<NuqsAdapter>{children}</NuqsAdapter>
					</HydrateClient>
				</TRPCReactProvider>
			</body>
		</html>
	);
}
