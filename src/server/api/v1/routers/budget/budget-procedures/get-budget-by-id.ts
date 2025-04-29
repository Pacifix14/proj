import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { CustomTRPCError } from "@/server/lib/logger";

// Procedure to get a budget by its ID
const getBudgetById = protectedProcedure
  .input(
    z.object({
      id: z.string(),  // The input is a string ID for the budget
    })
  )
  .query(async ({ ctx, input }) => {
    const { id } = input;

    // Fetch the budget from the database by its ID
    const budget = await ctx.db.budget.findUnique({
      where: {
        id,  // Searching by budget ID
      },
      include: {
        createdBy: true,  // Include the creator information of the budget
        project: true,
        budgetItems: true,  // Include related project info
        _count: {
          select: {
            budgetItems: true,  // Count budget items (or adjust as per your data structure)
          },
        },
      },
    });

    // If no budget is found, throw an error
    if (!budget) {
      throw new CustomTRPCError({
        code: "NOT_FOUND",
        message: "Budget not found",
      });
    }
    return budget;
  });

export default getBudgetById;
