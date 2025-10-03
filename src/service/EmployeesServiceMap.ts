// src/service/EmployeesServiceMap.ts

import { Employee } from "../model/Employee";
import EmployeesService from "./EmployeesService";
import { v4 as uuidv4 } from "uuid";

/**
 * Error thrown when trying to add an employee that already exists.
 * @extends Error
 * @example
 * throw new AlreadyExistsError("123");
 * // Throws an error with message "Employee with id 123 already exists"
 */
export class AlreadyExistsError extends Error {
	constructor(id: string) {
		super(`Employee with id ${id} already exists`);
		Object.setPrototypeOf(this, AlreadyExistsError.prototype);
	}
}

/**
 * Error thrown when an employee is not found.
 * @extends Error
 * @example
 * throw new NotFoundError("123");
 * // Throws an error with message "Employee with id 123 not found"
 */
export class NotFoundError extends Error {
	constructor(id: string) {
		super(`Employee with id ${id} not found`);
		Object.setPrototypeOf(this, NotFoundError.prototype);
	}
}

/**
 * In-memory implementation of EmployeesService using a Map.
 * Provides methods to add, get, update, and delete employees.
 * @implements EmployeesService
 */
export default class EmployeesServiceMap implements EmployeesService {
	private _employees: Map<string, Employee> = new Map();

	/**
	 * Adds a new employee to the in-memory store.
	 * @param empl - Employee object to be added
	 * @returns The added employee object
	 */
	addEmployee(empl: Employee): Employee {
		const id: string = empl.id ?? uuidv4();
		if (this._employees.has(id)) {
			throw new AlreadyExistsError(id);
		}
		empl.id = id;
		this._employees.set(id, empl);
		return empl;
	}

	/**
	 * Retrieves all employees, optionally filtered by department.
	 * @param department - Optional department to filter employees
	 * @returns Array of Employee objects
	 */
	getAll(department?: string): Employee[] {
		let allEmployees: Employee[] = Array.from(this._employees.values());
		if (department) {
			allEmployees = allEmployees.filter(
				(empl) => empl.department === department
			);
		}
		return allEmployees;
	}

	/**
	 * Updates an existing employee's details.
	 * @param id - ID of the employee to be updated
	 * @param empl - Partial Employee object with updated fields
	 * @returns The updated Employee object
	 */
	updateEmployee(id: string, empl: Partial<Employee>): Employee {
		const existingEmployee = this._employees.get(id);
		if (!existingEmployee) {
			throw new NotFoundError(id);
		}
		Object.assign(existingEmployee, empl);
		return existingEmployee;
	}

	/**
	 * Deletes an employee by ID.
	 * @param id - ID of the employee to be deleted
	 * @returns The deleted Employee object
	 */
	deleteEmployee(id: string): Employee {
		const existingEmployee = this._employees.get(id);
		if (!existingEmployee) {
			throw new NotFoundError(id);
		}
		this._employees.delete(id);
		return existingEmployee;
	}
}
