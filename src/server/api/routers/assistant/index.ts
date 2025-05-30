import { createTRPCRouter } from "@/server/api/trpc";
// import getReplyFromAssistant from "./assistant-procedures/get-reply-from-assistant";
import  {sendToAssistant} from "./assistant-procedures/send-to-assistant"

const assistantRouter = createTRPCRouter({
	// getReplyFromAssistant,
	sendToAssistant
});

export default assistantRouter;
