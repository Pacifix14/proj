"use client";

import BudgetDetails from "@/app/(protected)/dashboard/[budgetId]/planner/_components/budget-details";
import Dropdown from "@/app/(protected)/dashboard/[budgetId]/planner/_components/dropdown"; // Import your Dropdown component
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { parseAssistantReply } from "@/server/utils/parsed-assistant-reply";
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
	const sendToAssistantMutation = api.assistant.sendToAssistant.useMutation();

	useEffect(() => {
		if (budgetId && budgetQuery.data) {
			setIsLoading(true);

			sendToAssistantMutation.mutateAsync({ budgetData: budgetQuery.data });
			console.log();
			const fetchTasks = async () => {
				try {
					const assistantData = await sendToAssistantMutation.mutateAsync({
						budgetData: budgetQuery.data,
					});

					const replyText =
						assistantData.reply?.[0]?.type === "text"
							? assistantData.reply[0].text.value
							: "";
					console.log("🧠 Assistant raw reply text:\n", replyText);

					const parsedTasks = parseAssistantReply(replyText);
					console.log(parsedTasks);
					setTasks(parsedTasks);
				} catch (err) {
					console.error("Error while fetching tasks:", err);
				} finally {
					setIsLoading(false);
				}
			};

			void fetchTasks();
		}
	}, [budgetId, budgetQuery.data, sendToAssistantMutation.mutateAsync]);

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
						<Card key={section} className="gap-2">
							<CardHeader className="gap-0 px-2">
								<Button
									variant="ghost"
									className="h-full w-full justify-between text-left"
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
									{tasks[section]?.map((task) => (
										<div
											key={task}
											className="flex items-center justify-between border-b pb-2 text-gray-700 text-sm dark:text-gray-300"
										>
											<Dropdown
												label={task}
												options={tasks[section] ?? []}
												onChange={(value) => alert(`Task selected: ${value}`)}
											/>
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
