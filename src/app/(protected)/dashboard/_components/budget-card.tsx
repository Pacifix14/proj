"use client";
import { useRouter } from "next/navigation";
import {
  Building,
  CalendarPlus,
  CalendarSync,
  Users,
  FolderTree,
} from "lucide-react";

// import { useFetchBudgetAndSendAI } from "@/utils/use-fetch-budget-and-send-ai";


import { type RouterOutputs } from "@/trpc/react";

import truncateText from "@/lib/truncate-text";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { formatDate } from "@/lib/format-date";

type BudgetOutput =
  RouterOutputs["v1"]["budget"]["getBudgets"]["budgets"][number];

type BudgetCardProps = {
  budget: BudgetOutput;
};


const BudgetCard = ({ budget }: BudgetCardProps) => {
  const router = useRouter();

  const onCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    router.push(`/dashboard/${budget.id}/planner`);
  };

  return (
    <Card
      key={budget.id}
      className="cursor-pointer transition-shadow hover:shadow-lg"
      onClick={onCardClick}
    >
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  <span>{truncateText(budget.name, 20)}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{budget.name}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center space-x-2 text-sm">
          <FolderTree className="h-4 w-4" />
          <span>{truncateText(budget.venue, 20)}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <Users className="h-4 w-4" />
          <span>{budget.pax} Pax</span>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <CalendarSync className="h-4 w-4" />
          <span>{formatDate(budget.date)}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <span>Budget: ${budget.budget.toFixed(2)}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <span>Status: {budget.status}</span>
        </div>
      </CardContent>
      <CardFooter className="text-muted-foreground flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <CalendarPlus className="h-4 w-4" />

            <span>Created: {formatDate(new Date(budget.createdAt))}</span>
        </div>
        <p>by {budget.createdBy.name}</p>
    </CardFooter>

    </Card>
  );
};

export default BudgetCard;
