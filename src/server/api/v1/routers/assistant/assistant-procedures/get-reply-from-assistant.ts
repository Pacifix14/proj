// import { getReplyFromAssistantInputSchema } from "@/schemas/get-reply-from-assistant-input.schema";
// import { protectedProcedure } from "@/server/api/trpc";
// import { openai } from "@/server/utils/openai";
// import { getAssistant } from "@/server/utils/openai";

// import { v4 as uuidv4 } from "uuid";

// export const getPrivateReplyFromAssistant = protectedProcedure
//  .input(getReplyFromAssistantInputSchema)
//  .mutation(async function* ({ input, ctx }) {
//   const assistant = await getAssistant();

//   if (!assistant) {
//    throw new Error("Assistant not found");
//   }

//   if (!document) {
//    throw new Error("Document not found");
//   }

//   if (!document.chat.threadId) {
//    throw new Error("Thread ID not found");
//   }

//   try {
//    const document = await ctx.db.document.findUnique({
//     where: { id: input.documentId },
//     select: { chat: { select: { threadId: true } } },
//    });

//    const threadId = document?.chat?.threadId;
//    if (threadId) {
//     const runs = await openai.beta.threads.runs.list(threadId);

//     const activeStatuses = [
//      "in_progress",
//      "queued",
//      "requires_action",
//      "incomplete",
//     ];
//     const pendingRuns = runs.data.filter((run) =>
//      activeStatuses.includes(run.status),
//     );

//     let cancelledCount = 0;
//     for (const run of pendingRuns) {
//      try {
//       await openai.beta.threads.runs.cancel(threadId, run.id);
//       cancelledCount++;
//      } catch (cancelError) {
//       console.warn(`Failed to cancel run ${run.id}:`, cancelError);

//       if (cancelError instanceof Error) {
//        await logExternalApiError(cancelError, "OpenAI", {
//         runId: run.id,
//         threadId,
//         documentId: input.documentId,
//         userId: ctx.session.user.id,
//        });
//       }
//      }

//      if (cancelledCount > 0) {
//       console.log(`Successfully cancelled ${cancelledCount} runs`);
//      } else {
//       console.log("No runs to cancel");
//      }
//     }
//    }
//   } catch (error) {
//    console.error("Error cancelling runs:", error);

//    if (error instanceof Error) {
//     await logServerError(error, ctx.session.user.id, {
//      documentId: input.documentId,
//      endpoint: "sendPrivateMessage",
//     });
//    }
//   }

//   await openai.beta.threads.messages.create(document.chat.threadId, {
//    role: "user",
//    content: input.message.content,
//    attachments: document.chat?.attachments?.map((attachment) => ({
//     file_id: attachment.fileId,
//     tools: [
//      {
//       type: "file_search",
//      },
//     ],
//    })),
//   });

//   try {
//    const stream = await openai.beta.threads.runs.stream(
//     document.chat.threadId,
//     {
//      assistant_id: assistant.id,
//     },
//    );

//    for await (const chunk of stream) {
//     if (chunk.event === "thread.message.delta") {
//      if (chunk.data.delta.content?.[0]?.type === "text") {
//       yield chunk.data.delta.content[0]?.text?.value;
//      }
//     }
//    }

//    const messages = await openai.beta.threads.messages.list(
//     document.chat.threadId,
//    );
//    const lastMessage = messages.data[0];

//    let newAssistantMessage: Message | null = null;

//    if (lastMessage?.content[0]?.type === "text") {
//     newAssistantMessage = {
//      id: uuidv4(),
//      role: MessageRole.assistant,
//      content: lastMessage.content[0].text.value,
//      createdAt: new Date(),
//     };
//    }

//    const newMessages = [...document.chat.messages, newAssistantMessage];

//    const filteredMessages = newMessages.filter(
//     (message): message is Message => message !== null,
//    );

//    await ctx.db.chat.update({
//     where: { id: document.chat.id },
//     data: {
//      messages: filteredMessages,
//     },
//    });
//    const documentTitle = await ctx.db.document.findUnique({
//     where: { id: input.documentId },
//     select: { title: true },
//    });

//    if (!documentTitle) {
//     throw new Error("Document title not found");
//    }

//    await indexChatMessage(
//     input.documentId,
//     input.message.id,
//     input.message.content,
//     "user",
//     documentTitle.title,
//     input.message.user?.name ?? "",
//    );

//    await indexChatMessage(
//     input.documentId,
//     newAssistantMessage?.id ?? "",
//     newAssistantMessage?.content ?? "",
//     "assistant",
//     documentTitle.title,
//     "assistant",
//    );
//   } catch (error) {
//    console.error("Error in message streaming:", error);
//    if (error instanceof Error) {
//     await logServerError(error, ctx.session.user.id, {
//      documentId: input.documentId,
//      endpoint: "sendPrivateMessage",
//     });
//    }
//    throw error;
//   }
//  });