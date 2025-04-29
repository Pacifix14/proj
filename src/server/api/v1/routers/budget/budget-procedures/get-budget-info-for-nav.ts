import { protectedProcedure } from "@/server/api/trpc";
import { CustomTRPCError } from "@/server/lib/logger";
import { z } from "zod";

const getBudgetInfoForNav = protectedProcedure
  .input(
    z.object({
      id: z.string(),
    }),
  )
  .query(async ({ ctx, input }) => {
    const { id } = input;
    const budget = await ctx.db.budget.findUnique({
      where: {
        id,
      },
      select: {
        name: true,
      },
    });
    if (!budget) {
      throw new CustomTRPCError({
        code: "NOT_FOUND",
        message: "Budget not found",
      });
    }
    return { name: budget.name };
  });

export default getBudgetInfoForNav;
