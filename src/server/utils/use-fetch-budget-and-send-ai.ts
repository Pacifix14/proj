"use client";

import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";

export const useFetchBudgetAndSendAI = () => {
  const router = useRouter();
  const getBudgetById = api.budget.getBudgetById.useQuery;

  const sendToAI = async (budget: any) => {
    const response = await fetch("/api/ai-handler", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ budget }),
    });

    if (!response.ok) throw new Error("Failed to send budget to AI");

    const data = await response.json();
    return data;
  };

  const handleFetchSendAndRedirect = async (id: string) => {
    try {
      const budgetQuery = getBudgetById({ id });
      const { data: budget } = await budgetQuery.refetch();

      if (!budget) throw new Error("Budget not found");

      await sendToAI(budget);

      router.push(`/dashboard/${id}/planner`);
    } catch (error) {
      console.error("Error:", error);
      // Optionally show a toast or message here
    }
  };

  return { handleFetchSendAndRedirect };
};
