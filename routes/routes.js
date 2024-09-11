import {
	createPost,
	deletePost,
	getPosts,
	renderPost,
	renderPostForm,
	updatePost,
} from "../controllers/post.controller.js";
import errorHandler from "../middleware/error.js";
import postSchema from "../schemas/post.schema.js";

export default async function fastifyRoutes(fastify) {
	fastify.get("/", getPosts);

	fastify.register(
		async (instance) => {
			instance.get("/new", renderPostForm);
			instance.post(
				"/new",
				{
					schema: {
						body: postSchema,
					},
				},
				createPost,
			);

			instance.get("/:id", renderPost);
			instance.get("/:id/edit", renderPostForm);
			instance.post(
				"/:id/edit",
				{
					schema: {
						body: postSchema,
					},
				},
				updatePost,
			);
			instance.get("/:id/delete", deletePost);
		},
		{ prefix: "/post" },
	);

	fastify.setErrorHandler(errorHandler);
}
