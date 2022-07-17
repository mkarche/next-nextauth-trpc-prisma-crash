import { type } from "os";
import { z } from "zod";
import createRouter from "../createRouter";
import postRouter from "./post";
import userRouter from "./user";

export const appRouter = createRouter()
	.query("hello", {
		input: z
			.object({
				text: z.string().nullish(),
			})
			.nullish(),
		resolve: ({ input }) => {
			return {
				greeting: `Hello ${input?.text ?? "world!"}`,
			};
		},
	})
	.merge("posts.", postRouter) //precede the post Routes with "posts."
	.merge("users.", userRouter); //precede the main Routes with "main."

export type AppRouter = typeof appRouter;
