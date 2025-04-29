"use client";

import { useParams, usePathname } from "next/navigation";
import React, { Fragment } from "react";

import truncateText from "@/lib/truncate-text";
import { api } from "@/trpc/react";

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";

import ModeToggle from "@/app/_components/mode-toggle-button";

const Nav = () => {
	const pathname = usePathname();
	const params = useParams();
	const paths = pathname.split("/").filter(Boolean);

	const { data: budget } = api.budget.getBudgetInfoForNav.useQuery(
		{
			id: params.budgetId as string,
		},
		{ enabled: !!params.budgetId },
	);

	const breadcrumbItems = paths.map((path, index) => {
		const nonNavigablePaths: string[] = [];
		const isNavigable = !nonNavigablePaths.includes(path);

		const href = `/${paths.slice(0, index + 1).join("/")}`;
		let label = path.charAt(0).toUpperCase() + path.slice(1);

		if (path === params.budgetId) {
			if (!budget) {
				return {
					href,
					isLoading: true,
					isLast: index === paths.length - 1,
					isNavigable: false,
				};
			}
			label = budget.name;
		}

		return {
			href,
			label,
			isLoading: false,
			isLast: index === paths.length - 1,
			isNavigable,
		};
	});

	return (
		<header className="sticky top-0 z-50 h-12 w-full shrink-0 items-center gap-2 border-b bg-background/95 transition-[width,height] ease-linear backdrop:blur group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
			<div className="flex h-full items-center px-2 py-1">
				<SidebarTrigger className="-ml-1" />
				<Separator orientation="vertical" className="mr-2 ml-1 h-4" />
				<Breadcrumb>
					<BreadcrumbList>
						{breadcrumbItems.map((item) => (
							<Fragment key={item.href}>
								<BreadcrumbItem>
									{item.isLoading ? (
										<Skeleton className="h-8 w-24 rounded-2xl" />
									) : item.isLast || !item.isNavigable ? (
										<span className="font-bold text-foreground">
											{truncateText(item.label ?? "", 15)}
										</span>
									) : (
										<BreadcrumbLink href={item.href} className="font-bold">
											{truncateText(item.label ?? "", 15)}
										</BreadcrumbLink>
									)}
								</BreadcrumbItem>
								{!item.isLast && <BreadcrumbSeparator />}
							</Fragment>
						))}
					</BreadcrumbList>
				</Breadcrumb>
				<div className="ml-auto flex items-center gap-4">
					<ModeToggle />
				</div>
			</div>
		</header>
	);
};

export default Nav;
