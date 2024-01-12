const express = require('express');
const sequelize = require('./config/connection');
const inquirer = require('inquirer');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

sequelize.sync().then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});


const actions = {
  'View all departments': viewDepartments,
  'View all roles': viewRoles,
  'View all employees': viewEmployees,
  'Add a department': addDepartment,
  'Add a role': addRole,
  'Add an employee': addEmployee,
  'Update an employee role': updateEmployeeRole,
};

async function viewDepartments() {
  try {
    const results = await sequelize.query('SELECT department_name FROM Department');
    console.log(results);
  } catch (error) {
    console.error('Error fetching departments:', error);
  }
}

async function viewRoles() {
  try {
    await viewDepartments(); // Wait for the previous query to complete
    const results = await sequelize.query('SELECT role_name, id, department_id, role_salary FROM Roles');
    console.log(results);
  } catch (error) {
    console.error('Error fetching roles:', error);
  }
}

async function viewEmployees() {
  try {
    await viewRoles(); // Wait for the previous query to complete
    const results = await sequelize.query('SELECT id, first_name, last_name, role_name, department_id, employee_salary, manager_name FROM Employees');
    console.log(results);
  } catch (error) {
    console.error('Error fetching employees:', error);
  }
}

async function addDepartment() {
  try {
    const department = await inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Enter the department name:',
      },
    ]);

    await sequelize.query('INSERT INTO Department (department_name) VALUES (?)', {
      replacements: [department.name],
    });

    console.log('Department added successfully!');
  } catch (error) {
    console.error('Error adding department:', error);
  }
}

async function addRole() {
  try {
    const role = await inquirer.prompt([
      {
        type: 'input',
        name: 'title',
        message: 'Enter the role title:',
      },
      {
        type: 'input',
        name: 'salary',
        message: 'Enter the role salary:',
      },
      {
        type: 'input',
        name: 'department_id',
        message: 'Enter the department ID for the role:',
      },
    ]);

    await sequelize.query('INSERT INTO Roles (title, salary, department_id) VALUES (?, ?, ?)', {
      replacements: [role.title, role.salary, role.department_id],
    });

    console.log('Role added successfully!');
  } catch (error) {
    console.error('Error adding role:', error);
  }
}

async function addEmployee() {
  try {
    const employee = await inquirer.prompt([
      {
        type: 'input',
        name: 'first_name',
        message: 'Enter the employee\'s first name:',
      },
      {
        type: 'input',
        name: 'last_name',
        message: 'Enter the employee\'s last name:',
      },
      {
        type: 'input',
        name: 'role_id',
        message: 'Enter the employee\'s role ID:',
      },
      {
        type: 'input',
        name: 'manager_id',
        message: 'Enter the employee\'s manager ID:',
      },
    ]);

    await sequelize.query('INSERT INTO Employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', {
      replacements: [employee.first_name, employee.last_name, employee.role_id, employee.manager_id],
    });

    console.log('Employee added successfully!');
  } catch (error) {
    console.error('Error adding employee:', error);
  }
}

async function updateEmployeeRole() {
  try {
    const employeeUpdate = await inquirer.prompt([
      {
        type: 'input',
        name: 'employee_id',
        message: 'Enter the employee ID you want to update:',
      },
      {
        type: 'input',
        name: 'new_role_id',
        message: 'Enter the new role ID for the employee:',
      },
    ]);

    await sequelize.query('UPDATE Employee SET role_id = ? WHERE id = ?', {
      replacements: [employeeUpdate.new_role_id, employeeUpdate.employee_id],
    });

    console.log('Employee role updated successfully!');
  } catch (error) {
    console.error('Error updating employee role:', error);
  }
}

inquirer
  .prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: Object.keys(actions),
    },
  ])
  .then((answers) => {
    const selectedAction = answers.action;
    actions[selectedAction]();
  });
