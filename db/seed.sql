INSERT INTO Department (Department_name) VALUES
('Human Resources'),
('Marketing'),
('Finance');

-- Inserting data into Role table
INSERT INTO Role (department_id, review) VALUES
(1, 'HR Specialist'),
(2, 'Marketing Manager'),
(3, 'Financial Analyst'),
(1, 'HR Assistant');

-- Inserting data into Employee table
INSERT INTO Employee (first_name, last_name, role_id, department_id) VALUES
('John', 'Doe', 1, 1),
('Alice', 'Smith', 2, 2),
('David', 'Johnson', 3, 3),
('Emma', 'Williams', 4, 1);