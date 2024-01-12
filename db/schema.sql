DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;
USE employees_db;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  department_name VARCHAR(100) NOT NULL
);

CREATE TABLE roles (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  role_name VARCHAR(100) NOT NULL,
  role_salary DECIMAL(10,2) NOT NULL,
  department_id INT,
  INDEX idx_role_name (role_name), -- Add an index on role_name
  FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE SET NULL
);

CREATE TABLE employees (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  employee_salary DECIMAL(10,2) NOT NULL,
  manager_name VARCHAR(30),
  role_name VARCHAR(100),
  department_id INT,
  FOREIGN KEY (role_name) REFERENCES roles(role_name) ON DELETE SET NULL,
  FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE SET NULL
);
