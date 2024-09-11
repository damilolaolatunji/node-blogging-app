import Fastify from "fastify";

import path from "node:path";
import * as url from "node:url";
import fastifyCompress from "@fastify/compress";
import fastifyCors from "@fastify/cors";
import fastifyFormbody from "@fastify/formbody";
import fastifyHelmet from "@fastify/helmet";
import fastifyStatic from "@fastify/static";
import fastifyView from "@fastify/view";
import fastifyGracefulShutdown from "fastify-graceful-shutdown";
import pug from "pug";
import logger from "./config/logger.js";
import routes from "./routes/routes.js";

const fastifyApp = Fastify({
	logger: logger,
});

await fastifyApp.register(fastifyCors);
await fastifyApp.register(fastifyHelmet);
await fastifyApp.register(fastifyFormbody);
await fastifyApp.register(fastifyCompress);
await fastifyApp.register(fastifyGracefulShutdown);
await fastifyApp.register(fastifyView, {
	engine: {
		pug,
	},
	root: path.join(import.meta.dirname, "views"),
	propertyName: "render",
	viewExt: "pug",
});
await fastifyApp.register(fastifyStatic, {
	root: path.join(import.meta.dirname, "public"),
	prefix: "/static/",
});
await fastifyApp.register(routes);

export default fastifyApp;
