import {
    Building,
    CalendarPlus,
    CalendarSync,
    Users,
    FolderTree,
  } from "lucide-react";
  
  import { type RouterOutputs } from "@/trpc/react";
  import truncateText from "@/lib/truncate-text";
  import { formatDate } from "@/lib/format-date";
  
  import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
  } from "@/components/ui/card";
  import {
    TooltipProvider,
    Tooltip,
    TooltipContent,
    TooltipTrigger,
  } from "@/components/ui/tooltip";
  
  type BudgetDetailsProps = {
    budget: RouterOutputs["v1"]["budget"]["getBudgetById"];
  };
  
  const BudgetDetails = ({ budget }: BudgetDetailsProps) => {
    if (!budget) {
      return <div>Budget not found.</div>;
    }
    
    // For debugging
    console.log("Budget object:", budget);
    console.log("Budget.budget type:", typeof budget.budget);
    
    // Format budget value safely with specific types
    const formatBudgetValue = (value: number | string ): string => {
      if (typeof value === 'number') {
        return `$${value.toFixed(2)}`;
      } else if (typeof value === 'string' && !isNaN(parseFloat(value))) {
        return `$${parseFloat(value).toFixed(2)}`;
      } else {
        return `${String(value)}`;
      }
    };
  
    return (
      <Card className="transition-shadow hover:shadow-lg">
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
  
  export default BudgetDetails;