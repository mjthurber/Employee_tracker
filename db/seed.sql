USE employees_db;

INSERT INTO department (department_name) 
VALUES ('Human Resources'), ('Finance'), ('IT');

INSERT INTO roles (role_name, role_salary, department_id) 
VALUES ('Manager', 70000.00, 1), ('Accountant', 50000.00, 2), ('Developer', 60000.00, 3);

INSERT INTO employees (first_name, last_name, employee_salary, manager_id, roles_id, department_id, title) 
VALUES ('John', 'Doe', 65000.00, 1, 1, 1, 'Manager'), 
       ('Jane', 'Smith', 55000.00, NULL, 2, 2, 'Accountant'), 
       ('Bob', 'Johnson', 60000.00, NULL, 3, 3, 'Developer');