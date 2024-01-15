const express = require('express');
const sequelize = require('./config/connection');
const inquirer = require('inquirer');

const app = express();
// const PORT = process.env.PORT || 3001;

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// sequelize.sync().then(() => {
//   app.listen(PORT, () => console.log('Now listening'));
// });

const actions = {
  'View all departments': viewDepartments,
  'View all roles': viewRoles,
  'View all employees': viewEmployees,
  'Add a department': addDepartment,
  'Add a role': addRole,
  'Add an employee': addEmployee,
  'Update an employee role': updateEmployeeRole,
};

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

    switch (selectedAction) {
      case 'View all departments':
        viewDepartments();
        break;
      case 'View all roles':
        viewRoles();
        break;
      case 'View all employees':
        viewEmployees();
        break;
      case 'Add a department':
        addDepartment();
        break;
      case 'Add a role':
        addRole();
        break;
      case 'Add an employee':
        addEmployee();
        break;
      case 'Update an employee role':
        updateEmployeeRole();
        break;
      default:
        console.log('Invalid action selected');
    }
  });




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
    const results = await sequelize.query('SELECT title, id, department_id, role_salary FROM Roles');
    console.log(results);
  } catch (error) {
    console.error('Error fetching roles:', error);
  }
}

async function viewEmployees() {
  try {
    //await viewRoles(); // Wait for the previous query to complete
    const results = await sequelize.query('SELECT id, first_name, last_name, role_id, department_id, employee_salary, manager_id FROM Employees');
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
        name: 'role_salary',
        message: 'Enter the role salary:',
      },
      {
        type: 'input',
        name: 'department_id',
        message: 'Enter the department ID for the role:',
      },
    ]);

    // Check if the department_id exists in the Department table
    const departmentExists = await sequelize.query('SELECT id FROM Department WHERE id = ?', {
      replacements: [role.department_id],
    });

    if (departmentExists[0].length === 0) {
      console.error('Department with the specified ID does not exist.');
      return;
    }

    // Insert the role using Sequelize
    await sequelize.query('INSERT INTO Roles (title, role_salary, department_id) VALUES (?, ?, ?)', {
      replacements: [role.title, role.role_salary, role.department_id],
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
        name: 'role_name',
        message: 'Enter the employee\'s role id:',
      },
      {
        type: 'input',
        name: 'manager_name',
        message: 'Enter the employee\'s manager id:',
      },
    ]);

    // Check if the role_id exists in the Roles table
    const roleExists = await sequelize.query('SELECT id FROM Roles WHERE id = ?', {
      replacements: [employee.role_name],
    });

    if (roleExists[0].length === 0) {
      console.error('Role with the specified ID does not exist.');
      return;
    }

    // Check if the manager_id exists in the Employees table
    const managerExists = await sequelize.query('SELECT manager_id FROM Employees WHERE manager_id = ?', {
      replacements: [employee.manager_name],
    });

    if (managerExists[0].length === 0) {
      console.error('Manager with the specified ID does not exist.');
      return;
    }

    // Insert the employee using Sequelize
    const test = await sequelize.query('INSERT INTO Employees (first_name, last_name, role_id, manager_id) VALUES (:first_name, :last_name, :role_id, :manager_id)', {
      replacements: {
        first_name: employee.first_name,
        last_name: employee.last_name,
        role_id: employee.role_name,
        manager_id: employee.manager_name,
      }
    });
    
      console.log(test);
    

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

    await sequelize.query('UPDATE Employees SET role_id = ? WHERE id = ?', {
      replacements: [employeeUpdate.new_role_id, employeeUpdate.employee_id],
    });

    console.log('Employee role updated successfully!');
  } catch (error) {
    console.error('Error updating employee role:', error);
  }
}
