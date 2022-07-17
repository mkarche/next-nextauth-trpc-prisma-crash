import { z } from "zod";
import createRouter from "../createRouter";
import getUsers from "../getUsers";
import getUserByEmail from "../getUserByEmail";
import createUser from "../createUser";

const UserType = z.object({
	name: z.string(),
	email: z.string(),
	password: z.string(),
});

const userRouter = createRouter()
	.query("all", {
		resolve: async () => await getUsers(),
	})
	.query("byEmail", {
		input: z.string(),
		resolve: async ({ input }) => await getUserByEmail(input),
	})
	.mutation("create", {
		input: UserType,
		resolve: async ({ input }) => {
			const result = await createUser(input);
			return result;
		},
	});

export default userRouter;
