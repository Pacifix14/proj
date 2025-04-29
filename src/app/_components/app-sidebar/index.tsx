"use client";

import NavHeader from "@/app/_components/app-sidebar/nav-header";
import NavUser from "@/app/_components/app-sidebar/nav-user";
import { Separator } from "@/components/ui/separator";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail,
} from "@/components/ui/sidebar";
import { useState } from "react";

type AppSidebarProps = React.ComponentProps<typeof Sidebar>;

const AppSidebar = ({ ...props }: AppSidebarProps) => {
	const [isOpen, setIsOpen] = useState(true);

	const toggleSidebar = () => setIsOpen((prevState) => !prevState);

	return (
		<Sidebar {...props} className={isOpen ? "sidebar-open" : "sidebar-closed"}>
			<SidebarHeader>
				<NavHeader />
			</SidebarHeader>
			<SidebarContent />
			<SidebarFooter>
				<Separator />
				<NavUser />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
};

export default AppSidebar;
