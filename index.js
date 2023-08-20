import inquirer from 'inquirer';
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'Salwa@2021',
    database: 'emp_track_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

inquirer
    // Prompt for selection of action
    .prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'appOpp',
            choices: ['View all Departments', 'View all Roles', 'View all Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role']
        },
    ])
    .then(async (answers) => {
        const action = answers.appOpp;
        switch (action) {
            case 'View all Departments':
                // Handle the view all departments action
                pool.execute('SELECT name FROM `department`')
                    .then(([rows]) => { console.log(rows) })
                    .then(() => pool.end())
                    .catch((error) => {
                        console.error('Error occurred while retrieving departments', error);
                    });
                break;

            case 'View all Roles':
                // Handle the view all roles action
                pool.execute('SELECT title FROM `role`')
                    .then(([rows]) => { console.log(rows) })
                    .then(() => pool.end())
                    .catch((error) => {
                        console.error('Error occurred while retrieving role', error);
                    });
                break;

            case 'View all Employees':
                // Handle the view all employees action
                pool.execute('SELECT first_name, last_name FROM `employee`')
                    .then(([rows]) => { console.log(rows) })
                    .then(() => pool.end())
                    .catch((error) => {
                        console.error('Error occurred while retrieving employee', error);
                    });
                break;

            case 'Add a Department':
                // Handle the add a department action
                inquirer
                    .prompt([
                        {
                            type: 'input',
                            message: 'What is the new Department called?',
                            name: 'depName'
                        },
                        {
                            type: 'input',
                            message: 'What is the new Department id?',
                            name: 'depID'
                        },
                    ])
                    .then(async (answers) => {
                        let depName = answers.depName
                        let depID = parseInt(answers.depID, 10)
                        pool.execute('INSERT INTO department (id, name) VALUES (?, ?)', [depID, depName])
                            .then(() => { console.log('New department added!') })
                            .then(() => pool.end())
                            .catch((error) => {
                                console.error('Error occurred while adding Department', error);
                            });
                    })
                break;

            case 'Add a Role':
                // Handle the add a role action
                inquirer
                    .prompt([
                        {
                            type: 'input',
                            message: 'What is the new Role called?',
                            name: 'roleName'
                        },
                        {
                            type: 'input',
                            message: `What is the new Role's salary?`,
                            name: 'roleSal'
                        },
                    ])
                    .then(async (answers) => {
                        let roleName = answers.roleName
                        let roleSal = answers.roleSal
                        pool.execute('INSERT INTO role (title, salary) VALUES (?, ?)', [roleName, roleSal])
                            .then(() => { console.log('New role added!') })
                            .then(() => pool.end())
                            .catch((error) => {
                                console.error('Error occurred while adding Role', error);
                            });
                    })
                break;

            case 'Add an Employee':
                // Handle the add an employee action
                inquirer
                    .prompt([
                        {
                            type: 'input',
                            message: `What is the new Employee's first name?`,
                            name: 'empFName'
                        },
                        {
                            type: 'input',
                            message: `What is the new Employee's last name?`,
                            name: 'empLName'
                        },
                    ])
                    .then(async (answers) => {
                        let empFName = answers.empFName
                        let empLName = answers.empLName
                        pool.execute('INSERT INTO employee (first_name, last_name) VALUES (?, ?)', [empFName, empLName])
                            .then(() => { console.log('New employee added!') })
                            .then(() => pool.end())
                            .catch((error) => {
                                console.error('Error occurred while adding employee', error);
                            });
                    })
                break;

            case 'Update an Employee Role':
                // Handle the update an employee role action
                pool.execute('SELECT id, first_name, last_name FROM employee')
                    .then(([rows]) => {
                        console.log(rows);
                    })
                    .then(async () => {
                        let answers = await inquirer.prompt([
                            {
                                type: 'input',
                                message: 'What is the ID of the employee to change?',
                                name: 'empID'
                            },
                            {
                                type: 'input',
                                message: 'What is the new role ID?',
                                name: 'newRole'
                            }
                        ]);

                        let empID = parseInt(answers.empID, 10);
                        let newRole = parseInt(answers.newRole, 10);

                        let employeeData = await pool.execute('SELECT id, first_name, last_name, role_id FROM employee WHERE id = ?;', [empID]);

                        await pool.execute('UPDATE employee SET role_id = ? WHERE id = ?;', [newRole, empID]);
                        console.log(employeeData[0]);
                    })
                    .then(() => {
                        console.log('Role updated!');
                        pool.end();
                    })
                    .catch((error) => {
                        console.error('Error occurred while updating role', error);
                    });
                break;

            default:
                console.log('Invalid action selected.');
                break;
        }
    })
    .catch((error) => {
        console.error('An error occurred:', error);
    });


