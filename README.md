# Employee Management System

Welcome to the Employee Management System! This application allows you to manage departments, roles, and employees in your organization through a command-line interface.

- View all departments, roles, and employees
- Add a new department, role, or employee
- Update an employee's role
- Simple and intuitive command-line interface

## Installation

1. **Clone this repository to your local machine:**

   ```bash
   git clone <repository-url>
   ```

2. **Navigate to the project directory:**

   ```bash
   cd Employee-Management-System
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Set up your MySQL database:**
   - Create a MySQL database and execute the `schema.sql` file to create the necessary tables.
   - Optionally, you can populate the database with seed data by executing the `seeds.sql` file.

5. **Update database configuration:**
   - Open the `server.js` file and replace the database connection settings with your MySQL database credentials.

## Usage

1. **Start the application:**

   ```bash
   node server.js
   ```

2. **Follow the on-screen prompts to perform various operations such as viewing departments, adding roles, updating employee roles, etc.**

## Technologies Used

- Node.js
- MySQL
- Inquirer.js

## Contributing

Contributions are welcome! Please feel free to fork this repository and submit pull requests to suggest improvements or add new features.

## License

This project is licensed under the [MIT License](LICENSE).
