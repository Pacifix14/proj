import type { Attachment } from "@prisma/client";
import { z } from "zod";

export type AttachmentInput = Pick<Attachment, "name" | "key">;

export const budgetFormSchema = z.object({
  attachments: z
    .array(
      z.union([
        z.custom<Attachment & { signedUrl: string }>(),
        z.instanceof(File),
        z.custom<AttachmentInput>(),
      ]),
    )
    .optional(),
});

export type BudgetFormData = z.infer<typeof budgetFormSchema>;

export const budgetDetailsSchema = z.object({
  name: z.string().min(1),
  date: z.date(),
  startTime: z.date(),
  endTime: z.date(),
  pax: z.number(),
  venue: z.string().min(1),
  budget: z.number().min(0),
});

export type BudgetDetailsFormData = z.infer<typeof budgetDetailsSchema>;
