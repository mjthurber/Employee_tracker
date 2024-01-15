# Employee Management System
This is a simple Employee Management System implemented in Node.js using Sequelize as the ORM (Object-Relational Mapping) library and Inquirer for command-line user interaction.

# Setup
Install dependencies:

npm install
Configure your database connection in ./config/connection.js.

# Run the application:

node index.js

# Usage
The system allows you to perform the following actions:

View all departments.
View all roles.
View all employees.
Add a department.
Add a role.
Add an employee.
Update an employee's role.

# Code Overview
index.js: Entry point of the application, prompts the user for actions and invokes corresponding functions.
./config/connection.js: Configuration for Sequelize database connection.
./models: Contains Sequelize models for Department, Roles, and Employees.

# Functions:
viewDepartments(): Fetches and displays all departments.
viewRoles(): Fetches and displays all roles.
viewEmployees(): Fetches and displays all employees.
addDepartment(): Adds a new department.
addRole(): Adds a new role.
addEmployee(): Adds a new employee.
updateEmployeeRole(): Updates an employee's role.

# Notes
Make sure to configure your database connection properly in ./config/connection.js.
Ensure that Sequelize models (./models) are defined correctly based on your database schema.
Feel free to extend and customize the system according to your specific needs.
