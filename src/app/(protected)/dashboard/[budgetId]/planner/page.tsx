"use client";

import BudgetDetails from "@/app/(protected)/dashboard/[budgetId]/planner/_components/budget-details";
import { Button } from "@/components/ui/button";
import { getAIGeneratedTasks } from "@/constants/ai-generated-tasks";
import { api } from "@/trpc/react";
import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";

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

	// Use useQuery hook to fetch the budget data
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
						<div key={section} className="overflow-hidden rounded-lg border">
							{/* Header */}
							<Button
								className="flex w-full items-center justify-between p-4 hover:bg-gray-700 focus:outline-none"
								onClick={() => toggleSection(section)}
							>
								<div>
									<h2 className="font-semibold text-lg">{section}</h2>
									<p className="text-gray-400 text-sm">Click to view tasks</p>
								</div>
								<div className="text-gray-400">
									{openSection === section ? "▲" : "▼"}
								</div>
							</Button>

							{/* Tasks */}
							{openSection === section && (
								<div className="space-y-2 p-4 ">
									{(tasks[section] ?? []).map((task, index) => (
										<div
											key={task}
											className="border-gray-600 border-b pb-2 text-gray-300 text-sm"
										>
											{task}
										</div>
									))}
								</div>
							)}
						</div>
					))
				)}
			</div>
		</main>
	);
};

export default BudgetPage;
