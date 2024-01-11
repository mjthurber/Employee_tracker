schemaDROP DATABASE IF EXISTS Employees_db;
CREATE DATABASE Employees_db;

USE Employees_db;

CREATE TABLE Department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  Department_name VARCHAR(100) NOT NULL
);

-- Create Role table
CREATE TABLE Role (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    department_id INT,
    review TEXT NOT NULL,
    FOREIGN KEY (department_id)
    REFERENCES Department(id)
    ON DELETE SET NULL
);

-- Create Employee table
CREATE TABLE Employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    department_id INT,
    FOREIGN KEY (role_id)
    REFERENCES Role(id)
    ON DELETE SET NULL,
    FOREIGN KEY (department_id)
    REFERENCES Department(id)
    ON DELETE SET NULL
);
