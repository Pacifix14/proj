import { env } from "@/env";
import { TRPCError } from "@trpc/server";
import pino, { type Logger } from "pino";

export const logger: Logger =
	env.NODE_ENV === "production"
		? pino({ level: "warn" })
		: pino({
				transport: {
					target: "pino-pretty",
					options: {
						colorize: true,
					},
				},
				level: "debug",
			});

type TRPCErrorOptions = {
	code: TRPCError["code"];
	message: string;
	cause?: unknown;
};

// Extended error class
export class CustomTRPCError extends TRPCError {
	constructor({ code, message, cause }: TRPCErrorOptions) {
		super({ code, message, cause });

		// Log the error when created
		logger.error({
			msg: message,
			code,
			...(cause
				? { cause: typeof cause === "object" ? cause : { value: cause } }
				: { cause: cause }),
		});
	}
}
