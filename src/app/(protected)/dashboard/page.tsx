import { Suspense } from "react";

import { api } from "@/trpc/server";

import BudgetList from "@/app/(protected)/dashboard/_components/budget-list"; // Updated to BudgetList

import {
  searchBudgetParamsCache,
  type SearchParams,
} from "@/lib/search-params"; // Adjusted for budgets

import Loading from "@/app/(protected)/dashboard/loading";

type DashboardPageProps = {
  searchParams: Promise<SearchParams>;
};

const DashboardPage = async ({ searchParams }: DashboardPageProps) => {
  // Parse the search parameters for budgets
  const search = await searchBudgetParamsCache.parse(searchParams);

  // Call the TRPC query to get budgets
  const getBudgetsPromise = api.v1.budget.getBudgets({
    ...search,
  });

  return (
    <main>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            View Budgets
          </p>
        </div>
      </div>
      <Suspense fallback={<Loading />}>
        <BudgetList promise={getBudgetsPromise} /> 
      </Suspense>
    </main>
  );
};

export default DashboardPage;

