import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const assistantId = process.env.OPENAI_ASSISTANT_ID;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const { budget } = req.body;

    if (!budget) {
      return res.status(400).json({ error: "Missing budget in request body" });
    }

    // 1. Create a thread
    const thread = await openai.beta.threads.create();

    // 2. Add a message to the thread
    await openai.beta.threads.messages.create(thread.id, {
      role: "user",
      content: `Here's a budget object:\n\n${JSON.stringify(budget, null, 2)}`,
    });

    // 3. Run the assistant
    const run = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: assistantId!,
    });

    // 4. Poll the run until it completes
    let runStatus = run;
    while (runStatus.status !== "completed" && runStatus.status !== "failed") {
      await new Promise((r) => setTimeout(r, 1000));
      runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
    }

    if (runStatus.status === "failed") {
      return res.status(500).json({ error: "AI run failed" });
    }

    // 5. Retrieve the assistant's response
    const messages = await openai.beta.threads.messages.list(thread.id);

    const assistantMessage = messages.data.find((msg) => msg.role === "assistant");

    let aiText = "No response from AI";

    if (assistantMessage?.content && Array.isArray(assistantMessage.content)) {
      for (const block of assistantMessage.content) {
        if (block.type === "text") {
          aiText = block.text.value;
          break;
        }
      }
    }

    res.status(200).json({ message: aiText });
  } catch (err: any) {
    console.error("AI handler error:", err);
    res.status(500).json({ error: err.message });
  }
}
