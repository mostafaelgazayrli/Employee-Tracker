const mysql = require('mysql2/promise');
const inquirer = require('inquirer');

// Function to establish database connection
async function connectToDatabase() {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'Mostafa@25',
      database: 'employee_db'
    });
    return connection;
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error;
  }
}

// Function to display options menu
async function displayMenu(connection) {
  console.log('Welcome to the Employee Management System!');
  while (true) {
    try {
      const { choice } = await inquirer.prompt({
        type: 'list',
        name: 'choice',
        message: 'What would you like to do?',
        choices: [
          'View all departments',
          'View all roles',
          'View all employees',
          'Add a department',
          'Add a role',
          'Add an employee',
          'Update an employee role',
          'Exit'
        ]
      });

      switch (choice) {
        case 'View all departments':
          await viewAllDepartments(connection);
          break;
        case 'View all roles':
          await viewAllRoles(connection);
          break;
        case 'View all employees':
          await viewAllEmployees(connection);
          break;
        case 'Add a department':
          await addDepartment(connection);
          break;
        case 'Add a role':
          await addRole(connection);
          break;
        case 'Add an employee':
          await addEmployee(connection);
          break;
        case 'Update an employee role':
          await updateEmployeeRole(connection);
          break;
        case 'Exit':
          console.log('Exiting application...');
          process.exit();
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
}

// Function to view all departments
async function viewAllDepartments(connection) {
  try {
    const [rows] = await connection.execute('SELECT * FROM departments');
    console.table(rows);
  } catch (error) {
    console.error('Error viewing departments:', error);
  }
}

// Function to view all roles
async function viewAllRoles(connection) {
  try {
    const [rows] = await connection.execute('SELECT * FROM roles');
    console.table(rows);
  } catch (error) {
    console.error('Error viewing roles:', error);
  }
}

// Function to view all employees
async function viewAllEmployees(connection) {
  try {
    const [rows] = await connection.execute('SELECT * FROM employees');
    console.table(rows);
  } catch (error) {
    console.error('Error viewing employees:', error);
  }
}

// Function to add a department
async function addDepartment(connection) {
  try {
    const { departmentName } = await inquirer.prompt({
      type: 'input',
      name: 'departmentName',
      message: 'Enter the name of the department:'
    });

    await connection.execute('INSERT INTO departments (department_name) VALUES (?)', [departmentName]);
    console.log('Department added successfully!');
  } catch (error) {
    console.error('Error adding department:', error);
  }
}

// Function to add a role
async function addRole(connection) {
  try {
    const { roleName, roleSalary, departmentId } = await inquirer.prompt([
      {
        type: 'input',
        name: 'roleName',
        message: 'Enter the name of the role:'
      },
      {
        type: 'number',
        name: 'roleSalary',
        message: 'Enter the salary for this role:'
      },
      {
        type: 'number',
        name: 'departmentId',
        message: 'Enter the department ID for this role:'
      }
    ]);

    await connection.execute(
      'INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)',
      [roleName, roleSalary, departmentId]
    );
    console.log('Role added successfully!');
  } catch (error) {
    console.error('Error adding role:', error);
  }
}

// Function to add an employee
async function addEmployee(connection) {
  try {
    // Prompt user for employee details
    const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
      {
        type: 'input',
        name: 'firstName',
        message: 'Enter the first name of the employee:'
      },
      {
        type: 'input',
        name: 'lastName',
        message: 'Enter the last name of the employee:'
      },
      {
        type: 'number',
        name: 'roleId',
        message: 'Enter the role ID for this employee:'
      },
      {
        type: 'number',
        name: 'managerId',
        message: 'Enter the manager ID for this employee (leave empty if none):',
        default: null, // Set default value to null
        validate: (value) => {
          if (isNaN(value) || value === '') {
            return true; // Allow empty input or NaN
          }
          return 'Please enter a valid manager ID or leave it empty.';
        }
      }
    ]);

    // Convert empty string or NaN to null
    const actualManagerId = isNaN(managerId) ? null : managerId;

    // Insert the new employee into the database
    await connection.execute(
      'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)',
      [firstName, lastName, roleId, actualManagerId]
    );
    console.log('Employee added successfully!');
  } catch (error) {
    console.error('Error adding employee:', error);
  }
}

// Function to update an employee's role
async function updateEmployeeRole(connection) {
  try {
    // Prompt user for employee and new role details
    const { employeeId, roleId } = await inquirer.prompt([
      {
        type: 'number',
        name: 'employeeId',
        message: 'Enter the ID of the employee whose role you want to update:'
      },
      {
        type: 'number',
        name: 'roleId',
        message: 'Enter the new role ID for this employee:'
      }
    ]);

    // Update the employee's role in the database
    await connection.execute(
      'UPDATE employees SET role_id = ? WHERE employee_id = ?',
      [roleId, employeeId]
    );
    console.log('Employee role updated successfully!');
  } catch (error) {
    console.error('Error updating employee role:', error);
  }
}

// Start the application
async function main() {
  try {
    const connection = await connectToDatabase();
    await displayMenu(connection);
    connection.end(); // Close connection when done
  } catch (error) {
    console.error('Error:', error);
  }
}

main();



