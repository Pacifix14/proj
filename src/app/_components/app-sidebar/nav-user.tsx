"use client";

import { ChevronsUpDown, Link, LogOut } from "lucide-react";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { memo, useCallback, useMemo } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";

import ModeToggle from "@/app/_components/app-sidebar/mode-toggle-button";

const NavUser = () => {
	const { isMobile } = useSidebar();
	const { data: session } = useSession();

	const handleSignOut = useCallback(() => {
		void signOut({ redirectTo: "/" });
	}, []);
	const userInfo = useMemo(() => {
		return {
			name: session?.user.name,
			email: session?.user.email,
			image: session?.user.image,
		};
	}, [session?.user]);

	if (!session) return null;

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size="lg"
							className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						>
							<Avatar className="h-8 w-8 rounded-lg">
								<AvatarImage
									src={userInfo.image ?? ""}
									alt={userInfo.name ?? ""}
								/>
								<AvatarFallback className="rounded-lg">CN</AvatarFallback>
							</Avatar>
							<div className="grid flex-1 text-left text-sm leading-tight">
								<span className="truncate font-semibold">{userInfo.name}</span>
								<span className="truncate text-xs">{userInfo.email}</span>
							</div>
							<ChevronsUpDown className="ml-auto size-4" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
						side={isMobile ? "bottom" : "right"}
						align="end"
						sideOffset={4}
					>
						<DropdownMenuLabel className="p-0 font-normal">
							<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
								<Avatar className="h-8 w-8 rounded-lg">
									<AvatarImage
										src={userInfo.image ?? ""}
										alt={userInfo.name ?? ""}
									/>
									<AvatarFallback className="rounded-lg">CN</AvatarFallback>
								</Avatar>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-semibold">
										{userInfo.name}
									</span>
									<span className="truncate text-xs">{userInfo.email}</span>
								</div>
							</div>
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem asChild>
								<ModeToggle />
							</DropdownMenuItem>
							<DropdownMenuItem asChild>
								<Link href="/settings">Settings</Link>
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuItem onClick={handleSignOut}>
							<LogOut />
							Log out
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
};

export default memo(NavUser);
