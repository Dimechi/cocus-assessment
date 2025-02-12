Introduction
This README provides detailed instructions for setting up and using the Playwright test framework for automated end-to-end testing of web applications. 
This framework supports multiple browsers, logging using winston, and adopts page object model.

Installation
Prerequisites 
Node.js (v14.x or later recommended)
npm (Node Package Manager) 
An editor or IDE of your choice (e.g., Visual Studio Code)

Framework Setup and Installation 
Install Node.js from Node.js official website. 
Clone this Repository and Install Dependencies
Run the following command in the root directory of your project to install necessary dependencies:
npm install Dependencies

Test Execution 
Run Tests Execute the tests using the following command:

##npx playwright test

To run tests from a specific file: 

##npx playwright test path/to/testfile.spec.js

Viewing Reports
Generate Html Report Run tests with the --reporter=html flag: 
npx playwright test --reporter=html 

View HTML Report Open the generated HTML report located in the playwright-report directory.

