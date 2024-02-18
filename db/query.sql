-- View all departments
SELECT department_id, department_name FROM departments;

-- View all roles with department information
SELECT r.role_id, r.title AS job_title, r.salary, d.department_name 
FROM roles r
INNER JOIN departments d ON r.department_id = d.department_id;

-- View all employees with relevant details and manager names
SELECT 
    e.employee_id, 
    e.first_name, 
    e.last_name, 
    r.title AS job_title, 
    d.department_name, 
    r.salary, 
    CONCAT(m.first_name, ' ', m.last_name) AS manager_name
FROM employees e
INNER JOIN roles r ON e.role_id = r.role_id
INNER JOIN departments d ON r.department_id = d.department_id
LEFT JOIN employees m ON e.manager_id = m.employee_id;

-- Add a department
INSERT INTO departments (department_name) VALUES ('New Department Name');

-- Add a role
INSERT INTO roles (title, salary, department_id) VALUES ('New Role Title', 50000, 1);


-- Add an employee
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('John', 'Doe', 1, NULL);


-- Update an employee role
UPDATE employees SET role_id = 2 WHERE employee_id = 1;
