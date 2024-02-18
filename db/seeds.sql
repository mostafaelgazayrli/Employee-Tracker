-- Insert departments
INSERT INTO departments (department_name) VALUES
    ('Engineering'),
    ('Sales'),
    ('Marketing');

-- Insert roles
INSERT INTO roles (title, salary, department_id) VALUES
    ('Software Engineer', 80000, 1),
    ('Sales Manager', 90000, 2),
    ('Marketing Coordinator', 60000, 3);

-- Insert employees
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES
    ('John', 'Doe', 1, NULL),
    ('Jane', 'Smith', 2, 1),
    ('Mike', 'Johnson', 3, 2);
