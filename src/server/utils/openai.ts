
import { OpenAI } from "openai";
import { env } from "@/env";

export const openai = new OpenAI({
  apiKey: env.NEXT_PUBLIC_OPENAI_API_KEY,
});

export const ASSISTANT_ID = env.OPENAI_ASSISTANT_ID;
