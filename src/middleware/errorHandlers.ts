// src/middleware/errorHandlers.ts

import { Request, Response, NextFunction } from "express";
import {
	AlreadyExistsError,
	NotFoundError,
} from "../service/EmployeesServiceMap.ts";

/**
 * Middleware to handle NotFoundError exceptions.
 * If a NotFoundError is thrown in any route,
 * this middleware will catch it and respond with a 404 status code.
 * @param err - error object
 * @param req - request object
 * @param res - response object
 * @param next - next middleware function
 * @returns void
 * @example
 * app.use(notFoundHandler);
 */
export function notFoundHandler(
	err: any,
	req: Request,
	res: Response,
	next: NextFunction
) {
	if (err instanceof NotFoundError) {
		res.status(404).json({ error: err.message || "Not Found" });
		return;
	} else {
		next(err);
	}
}

/**
 * Middleware to handle AlreadyExistsError exceptions.
 * If an AlreadyExistsError is thrown in any route,
 * this middleware will catch it and respond with a 409 status code.
 * @param err - error object
 * @param req - request object
 * @param res - response object
 * @param next - next middleware function
 * @returns void
 * @example
 * app.use(alreadyExistsHandler);
 */
export function alreadyExistsHandler(
	err: any,
	req: Request,
	res: Response,
	next: NextFunction
) {
	if (err instanceof AlreadyExistsError) {
		res.status(409).json({
			error: err.message || "Resource already exists",
		});
	} else {
		next(err);
	}
}

/** Middleware to handle generic errors.
 * If any other error is thrown in any route,
 * this middleware will catch it and respond with a 500 status code.
 * @param err - error object
 * @param req - request object
 * @param res - response object
 * @param next - next middleware function
 * @returns void
 * @example
 * app.use(errorHandler);
 */
export function errorHandler(
	err: any,
	req: Request,
	res: Response,
	next: NextFunction
) {
	console.error(err);
	res.status(500).json({ error: err.message || "Internal Server Error" });
}
