import { createTRPCRouter } from "@/server/api/trpc";
import getBudgets from "./budget-procedures/get-all-budget-info";
import getBudgetById from "./budget-procedures/get-budget-by-id";
import getBudgetInfoForNav from "./budget-procedures/get-budget-info-for-nav"
const budgetRouter = createTRPCRouter({
  getBudgets,
  getBudgetById,
  getBudgetInfoForNav,
});

export default budgetRouter;
