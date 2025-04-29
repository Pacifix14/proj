import { env } from "@/env";
import { OpenAI } from "openai";

export const openai = new OpenAI({
	apiKey: env.NEXT_PUBLIC_OPENAI_API_KEY,
});

export const getAssistant = async () => {
	try {
		const assistant = await openai.beta.assistants.retrieve(
			env.OPENAI_ASSISTANT_ID,
		);
		return assistant;
	} catch (error) {
		console.error("Failed to retrieve assistant, creating new one:", error);
	}
};
