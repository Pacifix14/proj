"use client";

import BudgetDetails from "@/app/(protected)/dashboard/[budgetId]/planner/_components/budget-details";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getAIGeneratedTasks } from "@/constants/ai-generated-tasks";
import { api } from "@/trpc/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const sections = [
	"Event Details",
	"Event Assets",
	"Event Venue",
	"Designs",
	"Event Operations",
	"Event Logistics",
	"Human Capital",
	"Payment",
	"Post-Event Deliverables",
];

const BudgetPage = () => {
	const params = useParams();
	const budgetId = params.budgetId as string;

	const [tasks, setTasks] = useState<Record<string, string[]>>({});
	const [openSection, setOpenSection] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	const budgetQuery = api.budget.getBudgetById.useQuery(
		{ id: budgetId },
		{ enabled: !!budgetId },
	);

	useEffect(() => {
		if (budgetId) {
			const fetchTasks = async () => {
				setIsLoading(true);
				const tasksData: Record<string, string[]> = {};
				for (const section of sections) {
					const sectionTasks = await getAIGeneratedTasks(section);
					tasksData[section] = sectionTasks;
				}
				setTasks(tasksData);
				setIsLoading(false);
			};

			void fetchTasks();
		}
	}, [budgetId]);

	const toggleSection = (section: string) => {
		setOpenSection((prev) => (prev === section ? null : section));
	};

	return (
		<main className="space-y-12 p-6">
			{budgetQuery.isLoading ? (
				<div>Loading budget details...</div>
			) : budgetQuery.error ? (
				<div>Error loading budget: {budgetQuery.error.message}</div>
			) : budgetQuery.data ? (
				<BudgetDetails budget={budgetQuery.data} />
			) : (
				<div>No budget data found</div>
			)}

			<div className="space-y-4">
				{isLoading ? (
					<div>Loading tasks...</div>
				) : (
					sections.map((section) => (
						<Card key={section}>
							<CardHeader>
								<Button
									variant="ghost"
									className="w-full justify-between text-left"
									onClick={() => toggleSection(section)}
								>
									<div>
										<h2 className="font-semibold text-lg">{section}</h2>
										<p className="text-muted-foreground text-sm">
											Click to view tasks
										</p>
									</div>
									<span className="text-muted-foreground">
										{openSection === section ? "▲" : "▼"}
									</span>
								</Button>
							</CardHeader>

							{openSection === section && (
								<CardContent className="space-y-3">
									{(tasks[section] ?? []).map((task) => (
										<div
											key={task}
											className="flex items-center justify-between border-b pb-2 text-gray-700 text-sm dark:text-gray-300"
										>
											<span>{task}</span>
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button variant="ghost" size="sm">
														⋯
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent align="end">
													<DropdownMenuItem
														onSelect={() => alert(`Edit "${task}"`)}
													>
														Edit
													</DropdownMenuItem>
													<DropdownMenuItem
														onSelect={() => alert(`Mark "${task}" done`)}
													>
														Mark as Done
													</DropdownMenuItem>
												</DropdownMenuContent>
											</DropdownMenu>
										</div>
									))}
								</CardContent>
							)}
						</Card>
					))
				)}
			</div>
		</main>
	);
};

export default BudgetPage;
