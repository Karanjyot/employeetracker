var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "bootcamp123!",
    database: "employee_trackerDB"

});


connection.connect(err =>{

    if (err) throw err; 

    console.log("connected");

    prompts();
});



function prompts (){

    inquirer.prompt([

        {
            type: "list",
            message: "What would you like to do?",
            name: "question",
            choices: ["Add departments", "Add roles", "Add employees", "View departments", "View roles", "View employees", "Update employee", "Update roles"]
        }
    ]).then(function(data){

        switch(data.question) {
            case "Add departments":
                addDepartment()
                break;

                case "Add roles":
                addRoles()
                break;

                case "Add employees":
                addEmployees()
                break;

                case "View departments":
                viewDepartment()
                break;

                case "View roles":
                viewRole()
                break;

                case "View employees":
                viewEmployee()
                break;

                case "Update employee":
                updateEmployeeRole()
                break;

                case "Update roles":
                console.log("1")
                break;
        }

     
    })
};




function addDepartment(){

    inquirer.prompt([
        {
            type: "input",
            message: "What is the name of the department you would like to add?",
            name: "department",
            
        }

    ]).then(function(response){

        connection.query(`INSERT into department (name) VALUES ("${response.department}")`, function(err, response){
            if (err) throw err;

            console.log("added");
            connection.end()
        })

    })
};


function addRoles(){

    inquirer.prompt([
        {
            type: "input",
            message: "What is the title of the role you would like to add?",
            name: "roleTitle",
            
        },

        {
            type: "input",
            message: "What is the salary of the role you would like to add?",
            name: "roleSalary",
            
        },

        
        {
            type: "input",
            message: "What is the department id of the role you would like to add?",
            name: "departmentId",
            
        }


    ]).then(function(response){

        connection.query(`INSERT into role (title, salary, department_id) VALUES ("${response.roleTitle}", "${response.roleSalary}", "${response.departmentId}" )`, function(err, response){
            if (err) throw err;

            console.log("added");
            connection.end()
        })

    })
};



function addEmployees(){

    inquirer.prompt([
        {
            type: "input",
            message: "What is the first name of the employee you would like to add?",
            name: "firstName",
            
        },

        {
            type: "input",
            message: "What is the last name of the employee you would like to add?",
            name: "lastName",
            
        },

        
        {
            type: "input",
            message: "What is the role of the employee you would like to add?",
            name: "roleId",
            
        },

        {
            type: "input",
            message: "What is the manager id of the employee you would like to add?",
            name: "managerId",
            
        }


    ]).then(function(response){

        connection.query(`INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("${response.firstName}", "${response.lastName}", "${response.roleId}", "${response.managerId}" )`, function(err, response){
            if (err) throw err;

            console.log("added");
            connection.end()
        })

    })
};


function viewDepartment(){

    connection.query("select * FROM department", function(err, result, fields){
        if (err) throw err;
        console.table(result);
        connection.end()
    })
};


function viewRole(){

    connection.query("select * FROM role", function(err, result){
        if (err) throw err;
        console.table(result);
        connection.end()
    })
};

function viewEmployee(){

    connection.query("select * FROM employee", function(err, result){
        if (err) throw err;
        console.table(result);
        connection.end()
    })
};

function updateEmployeeRole(){
    inquirer.prompt([
        {
            type: "input",
            message: "What is the name of the employee?",
            name: "employeeName",
        },
        {
            type: "input",
            message: "What is the new role of the employee?",
            name: "employeeRole",
        }
    ]).then(function(response){

        connection.query(`UPDATE employee SET role_id = "${response.employeeRole}" WHERE first_name = "${response.employeeName}"` , function(err, res){
            if (err) throw err;
            console.log("updated");
            connection.end();
        });
    });
};