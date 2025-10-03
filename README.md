# Homework 8: Employees Back-End

## Task Definition

HW# 8 Initial code of Employees Back-End.  
Write **Express** web service for processing CRUD requests from React application that may be found here:  
👉 https://github.com/java-60TelRan/employees

The service must include:

-   Appropriate routes (**see TODO in `src/controller/index.ts` stub file**)
-   Middleware functions:
    -   `express.json()` for JSON parsing
    -   `morgan` for logging
    -   Error handling middleware (`notFoundHandler`, `alreadyExistsHandler`, `errorHandler`)
    -   `dotenv` configuration
-   Service interface (`src/service/EmployeesService.ts`) for CRUD functionality
-   Service implementation using `Map<string, Employee>` as in-memory (non-persistent) storage (`src/service/EmployeesServiceMap.ts`)
-   Employee model definition (`src/model/Employee.ts`)

### Assumptions

-   Normal flow assumed (valid data from React).
-   Handling of not-existing employees is required.
-   No security (Authentication/Authorization/Accounting).
-   Testing is performed with **Postman** only.

---

## Description 📝

This project is a simple **backend for managing employees** using Express and TypeScript.  
It supports CRUD operations, in-memory data storage, error handling, and integrates with a React front-end app.

---

## Purpose 🎯

-   Practice **Express + TypeScript** project setup
-   Learn how to build a **modular backend architecture** with routes, controllers, services
-   Implement **middleware for logging and error handling**
-   Understand **in-memory data storage** via `Map`

---

## Features ✨

-   ✅ Create, Read, Update, Delete employees
-   ✅ Filter employees by department
-   ✅ Error handling with proper status codes (`404`, `409`, `500`)
-   ✅ JSON request/response API
-   ✅ Integration with React app

---

## How It Works 🔍

1. The app loads configuration from `.env` (port, morgan format, logging rules).
2. Middleware stack is applied:
    - `express.json()` → parses JSON
    - `morgan` → logs requests with customizable format
3. Routes under `/api/employees` are defined:
    - `GET /api/employees` → list all employees (optionally filtered by department)
    - `POST /api/employees` → add new employee
    - `PATCH /api/employees/:id` → update employee
    - `DELETE /api/employees/:id` → remove employee
4. Errors are caught and mapped to status codes:
    - `NotFoundError` → **404**
    - `AlreadyExistsError` → **409**
    - Other errors → **500**

---

## Output 📜

### Example: GET `/api/employees`

```json
[
	{
		"id": "1a2b3c",
		"fullName": "John Doe",
		"avatar": "https://example.com/avatar.jpg",
		"department": "Engineering",
		"birthDate": "1990-01-01",
		"salary": 60000
	}
]
```

### Example: POST `/api/employees`

```json
{
	"id": "new-uuid",
	"fullName": "Jane Smith",
	"avatar": "https://example.com/jane.jpg",
	"department": "HR",
	"birthDate": "1992-05-12",
	"salary": 55000
}
```

### Example: Error (employee not found)

```json
{
	"error": "Employee with id 123 not found"
}
```

---

## Usage 📦

```bash
git clone [repo-url]
cd employees-backend
npm install
npm run dev     # run with nodemon + ts-node/esm
```

Server starts at:
👉 `http://localhost:3000`

---

## Usage Examples 🚀

```bash
# Get all employees
curl http://localhost:3000/api/employees

# Get employees filtered by department
curl http://localhost:3000/api/employees?department=HR

# Add new employee
curl -X POST http://localhost:3000/api/employees \
  -H "Content-Type: application/json" \
  -d '{"fullName":"Alice Brown","avatar":"url","department":"Finance","birthDate":"1995-07-20","salary":48000}'

# Update employee
curl -X PATCH http://localhost:3000/api/employees/123 \
  -H "Content-Type: application/json" \
  -d '{"salary": 70000}'

# Delete employee
curl -X DELETE http://localhost:3000/api/employees/123
```

---

## Project Structure 🗂

```
src/
 ├─ index.ts                  # Entry point, loads dotenv, starts server
 ├─ server/
 │   └─ app.ts                # Express app setup (middlewares, routes, error handlers)
 ├─ routes/
 │   └─ employeeRoutes.ts     # Employee CRUD routes
 ├─ controller/
 │   └─ employeeController.ts # Controller for request handling
 ├─ service/
 │   ├─ EmployeesService.ts   # Service interface
 │   └─ EmployeesServiceMap.ts# In-memory implementation (Map)
 ├─ model/
 │   └─ Employee.ts           # Employee interface
 └─ middleware/
     └─ errorHandlers.ts      # Error handling middleware
```

---

## License 📄

MIT

---

## Conclusion 🧮

This project demonstrates:

-   Express + TypeScript integration
-   Middleware usage (logging, JSON parsing, error handling)
-   Clean layered architecture (**routes → controller → service → model**)
-   In-memory CRUD operations with error handling
-   Backend setup ready to connect with React frontend

---

Made with ❤️ and `TypeScript` by **Sam-Shepsl Malikin**
