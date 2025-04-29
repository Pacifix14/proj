"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import BudgetDetails from "@/app/(protected)/dashboard/[budgetId]/planner/_components/budget-details";
import { getAIGeneratedTasks } from "@/app/(protected)/dashboard/[budgetId]/planner/_components/ai";
import { api } from "@/trpc/react";

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
  const budgetQuery = api.v1.budget.getBudgetById.useQuery(
    { id: budgetId },
    { enabled: !!budgetId }
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
            <div
              key={section}
              className="rounded-lg overflow-hidden border"
            >
              {/* Header */}
              <button
                className="flex justify-between items-center w-full p-4 focus:outline-none hover:bg-gray-700"
                onClick={() => toggleSection(section)}
              >
                <div>
                  <h2 className="text-lg font-semibold">{section}</h2>
                  <p className="text-sm text-gray-400">Click to view tasks</p>
                </div>
                <div className="text-gray-400">{openSection === section ? "▲" : "▼"}</div>
              </button>

              {/* Tasks */}
              {openSection === section && (
                <div className="p-4 space-y-2 ">
                  {(tasks[section] ?? []).map((task, index) => (
                    <div key={index} className="border-b border-gray-600 pb-2 text-sm text-gray-300">
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


