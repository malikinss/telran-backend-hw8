// src/server/app.ts

import express from "express";
import morgan from "morgan";
import employeeRoutes from "../route/employeeRoutes.ts";
import {
	notFoundHandler,
	alreadyExistsHandler,
	errorHandler,
} from "../middleware/errorHandlers.ts";

/** Starts the Express server on the specified port.
 * @param {number} port - The port number to start the server on.
 * @returns {void}
 * @example
 * startServer(3000);
 * // Server is running on http://localhost:3000
 */
export function startServer(port: number) {
	// Load environment variables
	const morganFormat = process.env.MORGAN_FORMAT || "tiny";

	// Default to logging requests with status code >= 400
	const skipCodeThreshold = process.env.SKIP_CODE_THRESHOLD
		? parseInt(process.env.SKIP_CODE_THRESHOLD)
		: 400;

	// Initialize Express app
	const app = express();
	app.use(express.json());

	// Setup morgan for logging
	app.use(
		morgan(morganFormat, {
			skip: (req, res) => res.statusCode < skipCodeThreshold,
		})
	);

	// Define routes
	app.use("/api/employees", employeeRoutes);

	// Error handling middleware
	app.use(notFoundHandler);
	app.use(alreadyExistsHandler);
	app.use(errorHandler);

	// Start the server
	app.listen(port, () => {
		console.log(`Server is running on http://localhost:${port}`);
	});
}
