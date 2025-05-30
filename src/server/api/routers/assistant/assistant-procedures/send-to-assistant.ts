import { protectedProcedure } from "@/server/api/trpc";
import { openai, ASSISTANT_ID } from "@/server/utils/openai";
import { z } from "zod";
import { CustomTRPCError } from "@/server/lib/logger";

// Function that interacts with OpenAI assistant
export const sendToAssistant = protectedProcedure
	.input(
		z.object({
			budgetData: z.any(), // This would be a complex budget data object
		})
	)
	.mutation(async ({ ctx, input }) => {
		try {
			// Create a thread with the assistant
			console.log("trying to create thread")
			const thread = await openai.beta.threads.create();

			// Send the budget data to the assistant as a message
			await openai.beta.threads.messages.create(thread.id, {
				role: "user",
				content: JSON.stringify(input.budgetData),
			});

			// Create a run with the assistant
			const run = await openai.beta.threads.runs.create(thread.id, {
				assistant_id: ASSISTANT_ID,
			});

			// Wait for the assistant run to complete
			let status = "in_progress";
			let attempts = 0;

			while (status === "in_progress" && attempts < 20) {
				await new Promise((res) => setTimeout(res, 3000)); // wait 10 second between attempts
				const runStatus = await openai.beta.threads.runs.retrieve(
					thread.id,
					run.id,
				);
				status = runStatus.status;
				attempts++;
			}

			if (status !== "completed") {
				throw new Error("Assistant run did not complete in time");
			}
			console.log("retrieving messages")
			// Retrieve all messages, including the assistant's reply
			const messages = await openai.beta.threads.messages.list(thread.id);

			// Find the assistant's latest reply
			const assistantReply = messages.data.find(
				(msg) => msg.role === "assistant",
			);

			console.log(assistantReply?.content);

			// Return the results of the conversation
			return {
				threadId: thread.id,
				messages: messages.data,
				reply: assistantReply?.content,
			};
		} catch (error) {
			console.error("Error sending data to assistant:", error);
			throw new CustomTRPCError({
				code: "INTERNAL_SERVER_ERROR",
				message: "Assistant interaction failed",
			});
		}
	});
