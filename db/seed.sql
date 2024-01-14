-- Seed data for the 'department' table
INSERT INTO department (department_name, id) VALUES
('HR', 1),
('IT', 2),
('Finance', 3);

-- Seed data for the 'roles' table
INSERT INTO roles (id, role_name, role_salary, department_id) VALUES
(1, 'HR Manager', 70000.00, 1),
(2, 'Software Engineer', 80000.00, 2),
(3, 'Accountant', 60000.00, 3);

-- Seed data for the 'employees' table
INSERT INTO employees (first_name, last_name, employee_salary, manager_name, role_name, department_id) VALUES
('John', 'Doe', 70000.00, 'Jane Smith', 'HR Manager', 1),
('Jane', 'Smith', 80000.00, 'Bob Johnson', 'Software Engineer', 2),
('Bob', 'Johnson', 60000.00, '', 'Accountant', 3);
