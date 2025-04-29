import { Suspense } from "react";

import { api } from "@/trpc/server";

import BudgetList from "@/app/(protected)/dashboard/_components/budget-list";

import {
	type SearchParams,
	searchBudgetParamsCache,
} from "@/lib/search-params";

import Loading from "@/app/(protected)/dashboard/loading";

type DashboardPageProps = {
	searchParams: Promise<SearchParams>;
};

const DashboardPage = async ({ searchParams }: DashboardPageProps) => {
	const search = await searchBudgetParamsCache.parse(searchParams);

	const getBudgetsPromise = api.budget.getBudgets({
		...search,
	});

	return (
		<main>
			<div className="mb-8 flex items-center justify-between">
				<div>
					<h1 className="font-bold text-4xl">Dashboard</h1>
					<p className="mt-2 text-muted-foreground">View Budgets</p>
				</div>
			</div>
			<Suspense fallback={<Loading />}>
				<BudgetList promise={getBudgetsPromise} />
			</Suspense>
		</main>
	);
};

export default DashboardPage;
