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
            choices: ["Add departments", "Add roles", "Add employees", "View departments", "View roles", "View employees", "Update employee", "Delete department", "Delete role", "Delete employee"]
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

                case "Delete department":
                deleteDepartment()
                break;

                case "Delete role":
                deleteRole()
                break;

                case "Delete employee":
                deleteEmployee()
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
            prompts();
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

        


    ]).then(function(response){

        connection.query(`INSERT into role (title, salary) VALUES ("${response.roleTitle}", "${response.roleSalary}" )`, function(err, response){
            if (err) throw err;

            console.log("added");
            prompts()
        })

    })
};




function addEmployees(){


  var roleArr = [];
    connection.query("select * FROM role", function(err, result){
        if (err) throw err;
        
        for(var i = 0; i<result.length; i++){

             roleArr.push(result[i].title)
        }
       
    
       
    })
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

            type: "list",
            message: "What is the role of the employee you would like to add?",
            name: "role",
            choices: roleArr
            
        },



    ]).then(function(response){

        connection.query(`INSERT into employee (first_name, last_name, role) VALUES ("${response.firstName}", "${response.lastName}", "${response.role}" )`, function(err, response){
            if (err) throw err;

            console.log("added");
            prompts();
        })

    })
};


function viewDepartment(){

    connection.query("select * FROM department", function(err, result, fields){
        if (err) throw err;
        console.table(result);
        prompts()
    })
};


function viewRole(){

    connection.query("select * FROM role", function(err, result){
        if (err) throw err;
        console.table(result);
        prompts()
    })
};

function viewEmployee(){

    connection.query("select * FROM employee", function(err, result){
        if (err) throw err;
        console.table(result);
        prompts()
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

        connection.query(`UPDATE employee SET role = "${response.employeeRole}" WHERE first_name = "${response.employeeName}"` , function(err, res){
            if (err) throw err;
            console.log("updated");
            prompts();
        });
    });
};


function deleteDepartment(){

    inquirer.prompt([
        {
            type: "input",
            message: "What is the name of the department you would like to remove",
            name: "departmentName",
        }
    ]).then(function(response){

        connection.query(`DELETE FROM department WHERE name ="${response.departmentName}"`, function(err, res){
            if (err) throw err;
            console.log("{department_name: response.departmentName}");
            console.log({department_name: response.departmentName});
            console.log("deleted");
            connection.end();
        })
    })

}

function deleteRole(){

    inquirer.prompt([
        {
            type: "input",
            message: "What is the name of the role that you would like to remove",
            name: "roleName",
        }
    ]).then(function(response){

        connection.query(`DELETE FROM role WHERE title ="${response.roleName}"`, function(err, res){
            if (err) throw err;
            console.log("deleted");
            prompts();
        })
    })

};


function deleteEmployee(){

    inquirer.prompt([
        {
            type: "input",
            message: "What is the first name of the employee that you would like to remove",
            name: "employeeName",
        }
    ]).then(function(response){

        connection.query(`DELETE FROM employee WHERE first_name ="${response.employeeName}"`, function(err, res){
            if (err) throw err;
            console.log("deleted");
            prompts();
        });
    });

};