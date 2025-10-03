// src/routes/employeeRoutes.ts

import express from "express";
import controller from "../controller/employeeController.ts";

const router = express.Router();

// Crud routes for Employee:

// GET /api/employees - Get all employees
router.get("/", controller.getAllEmployees);

// POST /api/employees - Create a new employee
router.post("/", controller.createEmployee);

// PATCH /api/employees/:id - Update an existing employee
router.patch("/:id", controller.updateEmployee);

// DELETE /api/employees/:id - Delete an employee
router.delete("/:id", controller.deleteEmployee);

export default router;
