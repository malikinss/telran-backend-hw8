// src/controller/employeeController.ts

import { Request, Response, NextFunction } from "express";
import EmployeesServiceMap from "../service/EmployeesServiceMap.ts";
import { Employee } from "../model/Employee.ts";

/** Controller class to handle employee-related HTTP requests.
 * Uses EmployeesServiceMap for business logic and data management.
 * Provides methods to get, create, update, and delete employees.
 * @example
 * const employeeController = new EmployeeController();
 * app.get("/api/employees", employeeController.getAllEmployees);
 * // Binds routes to controller methods
 */
class EmployeeController {
	private employeesService: EmployeesServiceMap;

	constructor() {
		this.employeesService = new EmployeesServiceMap();

		// Bind methods to the instance to ensure 'this' context
		this.getAllEmployees = this.getAllEmployees.bind(this);
		this.createEmployee = this.createEmployee.bind(this);
		this.updateEmployee = this.updateEmployee.bind(this);
		this.deleteEmployee = this.deleteEmployee.bind(this);
	}

	/**
	 * Get all employees, optionally filtered by department
	 * @param req
	 * @param res
	 * @param next
	 * @returns void
	 * @example
	 * GET /api/employees?department=Sales
	 * // Returns all employees in the Sales department
	 */
	getAllEmployees(req: Request, res: Response, next: NextFunction) {
		try {
			// Get the department query parameter if it exists
			const department =
				typeof req.query.department === "string"
					? req.query.department
					: undefined;

			const employees: Employee[] =
				this.employeesService.getAll(department);
			res.json(employees);
		} catch (err) {
			next(err);
		}
	}

	/**
	 * Create a new employee
	 * @param req
	 * @param res
	 * @param next
	 * @returns void
	 * @example
	 * POST /api/employees
	 * // Creates a new employee with the provided data
	 */
	createEmployee(req: Request, res: Response, next: NextFunction) {
		try {
			const newEmployee: Employee = req.body as Employee;
			const addedEmployee: Employee =
				this.employeesService.addEmployee(newEmployee);
			res.status(201).json(addedEmployee);
		} catch (err) {
			next(err);
		}
	}

	/**
	 * Update an existing employee by ID
	 * @param req
	 * @param res
	 * @param next
	 * @returns void
	 * @example
	 * PUT /api/employees/:id
	 * // Updates the employee with the specified ID
	 */
	updateEmployee(req: Request, res: Response, next: NextFunction) {
		try {
			const id: string = req.params.id;
			const updatedData: Partial<Employee> =
				req.body as Partial<Employee>;
			const updatedEmployee: Employee | null =
				this.employeesService.updateEmployee(id, updatedData);
			res.json(updatedEmployee);
		} catch (err) {
			next(err);
		}
	}

	/**
	 * Delete an employee by ID
	 * @param req
	 * @param res
	 * @param next
	 * @returns void
	 * @example
	 * DELETE /api/employees/:id
	 * // Deletes the employee with the specified ID
	 */
	deleteEmployee(req: Request, res: Response, next: NextFunction) {
		try {
			const id: string = req.params.id;
			const deletedEmployee: Employee | null =
				this.employeesService.deleteEmployee(id);
			res.json(deletedEmployee);
		} catch (err) {
			next(err);
		}
	}
}

// Export a singleton instance of the controller
const controller = new EmployeeController();
export default controller;
