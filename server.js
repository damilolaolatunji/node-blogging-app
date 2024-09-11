import app from "./app.js";
import env from "./config/env.js";
import logger from "./config/logger.js";

function exit() {
	if (app.server) {
		app.server.close(() => {
			logger.info("Server closed");
			process.exit(1);
		});
	} else {
		process.exit(1);
	}
}

function handleError(error) {
	logger.fatal(error);
	exit();
}

try {
	const address = await app.listen({ port: env.port });

	process.on("SIGTERM", () => {
		logger.info("SIGTERM received. Executing shutdown sequence");
		exit();
	});

	process.on("uncaughtException", handleError);
	process.on("unhandledRejection", handleError);
} catch (err) {
	logger.fatal(err);
	exit();
}
