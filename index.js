const express = require('express');
const sequelize = require('./config/connection');
const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');

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

function viewDepartments() {
  const sql = 'SELECT * FROM Department'
  sequelize.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
       return;
    }
    res.json({
      message: 'success',
      data: rows
    });
  });

  };

function viewRoles() {
  const sql = 'SELECT * FROM Role'
  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
       return;
    }
    res.json({
      message: 'success',
      data: rows
    });
  });
  // Logic to view all roles
}

function viewEmployees() {
  const sql = 'SELECT * FROM Employee'
  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
       return;
    }
    res.json({
      message: 'success',
      data: rows
    });
  });
  // Logic to view all employees
}

function addDepartment() {
  // Logic to add a department
}

function addRole() {
  // Logic to add a role
}

function addEmployee() {
  // Logic to add an employee
}

function updateEmployeeRole() {
  // Logic to update an employee role
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

  // in case the query doesn't work
