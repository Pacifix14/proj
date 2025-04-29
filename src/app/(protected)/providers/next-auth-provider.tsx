"use client";

import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ComponentProps } from "react";

const NextAuthThemeProvider = ({
	children,
	session,
	...props
}: ComponentProps<typeof NextThemesProvider> & {
	session: Session;
}) => {
	return (
		<NextThemesProvider {...props}>
			<SessionProvider session={session}>{children}</SessionProvider>
		</NextThemesProvider>
	);
};

export default NextAuthThemeProvider;
