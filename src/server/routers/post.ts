import createRouter from "../createRouter";

const postRouter = createRouter().query("list", {
	resolve: () => {
		return { posts: "list of posts" };
	},
});

export default postRouter;
