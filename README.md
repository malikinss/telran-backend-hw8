# telran-backend-hw8

```
HW# 8 Initial code of Employees Back-End
Write "express" WEB Service for processing CRUD requests from React application that may be found here https://github.com/java-60TelRan/employees
Should contain the following
Appropriate routes (see TODO in src/controller/index.ts stub file)
Required middlware functions for JSON parsing, morgan logging, errors handling, dotenv configuration
Service interface (see src/service/EmployeesService) for CRUD functionality matching React application
Service implementation using Map<string, Employee> as inner not persistent storage (see src/service/EmployeesServiceMap and src/model/Employee.ts)
Assumptions
Normal flow from the validation aspect (Assumed the valid data), but processing of not existing employee objects should have an implementation including single errors handling
No security (Authentication, Authorization, Accounting)
Testing is done by using Postman only with valid JSON objects for adding and updating
```
