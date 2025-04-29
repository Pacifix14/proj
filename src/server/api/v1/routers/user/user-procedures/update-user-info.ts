import { publicProcedure } from "@/server/api/trpc";
import { z } from "zod";

const updateUserInfo = publicProcedure
  .input(
    z.object({
      jobTitle: z.string(),
      phone: z.string(),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    if (!ctx.session?.user.jobTitle || !ctx.session?.user.phone) {
      await ctx.db.user.update({
        where: { id: ctx.session?.user.id },
        data: { jobTitle: input.jobTitle, phone: input.phone },
      });
    }
    return {
      success: true,
    };
  });

export default updateUserInfo;
