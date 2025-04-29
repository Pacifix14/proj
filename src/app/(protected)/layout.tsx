import { auth } from "@/server/auth";
import { redirect } from "next/navigation";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import NextAuthThemeProvider from "@/app/(protected)/providers/next-auth-provider";
import AppSidebar from "@/app/_components/app-sidebar";
import Nav from "@/app/_components/nav";

export default async function ProtectedLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await auth();

	if (!session) {
		return redirect("/");
	}

	return (
		<NextAuthThemeProvider
			session={session}
			attribute="class"
			defaultTheme="light"
			enableSystem
			disableTransitionOnChange
		>
			<SidebarProvider>
				<AppSidebar />
				<SidebarInset className="contain-inline-size">
					<Nav />
					<div className="mx-auto flex w-full flex-1 flex-col p-6">
						{children}
					</div>
				</SidebarInset>
			</SidebarProvider>
		</NextAuthThemeProvider>
	);
}
