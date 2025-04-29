"use client";

import { useCallback, use } from "react";

import type { RouterOutputs } from "@/trpc/react";
import { useBudgetSearchParams } from "@/hooks/use-search-params";

import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import BudgetCard from "@/app/(protected)/dashboard/_components/budget-card"; // Assuming you have a BudgetCard component
type BudgetsOutput = RouterOutputs["v1"]["budget"]["getBudgets"]; // Adjusted path to 'budget'

type BudgetListProps = {
  promise: Promise<BudgetsOutput>;
};

const BudgetList = ({ promise }: BudgetListProps) => {
  const { budgets, pageCount } = use(promise);

  const { search, page, setSearch, setPage } = useBudgetSearchParams(); // Custom hook for budget search

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
    },
    [setSearch],
  );

  return (
    <div className="flex min-h-[calc(100vh-220px)] flex-col">
      <div className="flex-1 space-y-6">
        <div className="flex items-center space-x-4">
          <Input
            placeholder="Search budgets..."
            value={search}
            onChange={handleSearchChange}
            className="max-w-sm"
          />
        </div>

        {budgets.length === 0 ? (
          <div className="text-muted-foreground text-center">
            No budgets found
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {budgets.map((budget) => (
              <BudgetCard key={budget.id} budget={budget} />
            ))}
          </div>
        )}
      </div>

      {pageCount > 1 && (
        <div className="mt-6">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setPage(Math.max(1, page - 1))}
                  className={page === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
              {Array.from({ length: pageCount }, (_, i) => i + 1).map(
                (pageNumber) => (
                  <PaginationItem key={pageNumber}>
                    <PaginationLink
                      onClick={() => setPage(pageNumber)}
                      isActive={page === pageNumber}
                    >
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                ),
              )}
              <PaginationItem>
                <PaginationNext
                  onClick={() => setPage(Math.min(pageCount, page + 1))}
                  className={
                    page === pageCount ? "pointer-events-none opacity-50" : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default BudgetList;

