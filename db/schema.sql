DROP DATABASE IF EXISTS employeetracker;

CREATE DATABASE employeetracker;

USE employeetracker;

CREATE TABLE employee(
    employeeId INT NOT NULL AUTO_INCREMENT, 
    firstName VARCHAR(50),
    lastName VARCHAR(50),
    roleId INT,
    managerId INT,
    PRIMARY KEY (employeeId)

)

-- CREATE TABLE department(
    -- Human Resources
    -- Billing
    -- IT department
-- )

-- CREATE TABLE roles(
-- Manager 
-- Assistant Manager 
-- Shift Leader
-- )