import { publicProcedure } from "@/server/api/trpc";
import { UserRole } from "@prisma/client";
import { tryCatch } from "@/server/lib/try-catch";
import { CustomTRPCError } from "@/server/lib/logger";

const getAdminEmails = publicProcedure.query(async ({ ctx }) => {
  const { data, error } = await tryCatch(
    ctx.db.user.findMany({
      where: {
        role: UserRole.ADMIN,
      },
      select: {
        email: true,
      },
    }),
  );

  if (error) {
    throw new CustomTRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to get admin emails",
      cause: error,
    });
  }

  return data;
});

export default getAdminEmails;
