// TODO: Include packages needed for this application
const inquirer = require("inquirer");
const fs = require('fs');
const axios = require("util");
const generate = require('./utils/generateMarkdown');

// TODO: Create an array of questions for user input
const questions = [
    {
        type: "input",
        name: "title",
        message: "What is the name of your project title?",
    },
    
    {
        type: "input",
        name: "description",
        message: "Please enter a description of your project."
    },
    {
        type: "input",
        name: "installation",
        message: "What are the installation instruction for this project. write NONE if no instructions"
    },
    {
        type: "input",
        name: "usage",
        message: "How would you like your application to be used?"
    },
    {
        type: "input",
        name: "Contribution",
        message: "Who contributed on this project?"
    },
    {
        type: "input",
        message: "please select a license?",
        
        choices: [
            "",
            "mit",

        ],
        namen: "license",

    },
    {
        type: "input",
        name: "test",
        message: "Please provide the project tests instructions?"
    },
    {
        type: "input",
        name: "username",
        message: "What is your GitHub user name?"
    },
    {
        type: "input",
        name: "repo",
        message: "What is your repo link?"
    },
    {
        type: "input",
        message: "what is your email address",
        name: "email"
    },
 
];


inquirer
    .prompt(questions)
    .then(function(data){
        const queryUrl = `https://api.github.com/users/${data.username}`;

        axios.get(queryUrl).then(function(res) {
            
            const githubInfo = {
                githubImage: res.data.avatar_url,
                email: res.data.email,
                profile: res.data.html_url,
                name: res.data.name
            };
           
            
          fs.writeFile("README.md", generate(data, githubInfo), function(err) {
            if (err) {
              throw err;

              
            };
    
            
          });
          console.log("New README file created with success!");
          
        });
        

});

function init() {

}

init();

