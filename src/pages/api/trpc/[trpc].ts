import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { z } from "zod";
import { appRouter } from "../../../server/routers/_app";

// const createRouter = () => {
// 	return trpc.router();
// };

// const appRouter = createRouter().query("hello", {
// 	input: z.object({
// 		text: z.string().nullish(),
// 	}),
// 	resolve: ({ input }) => {
// 		return {
// 			greeting: `Hello ${input?.text ?? "world!"}`,
// 		};
// 	},
// });

export default trpcNext.createNextApiHandler({
	router: appRouter,
	createContext: () => null,
});
