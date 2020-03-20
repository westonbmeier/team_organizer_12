DROP DATABASE IF EXISTS company_db;
CREATE database company_db;

USE company_db;

CREATE TABLE departments (
  id INT NOT NULL AUTO_INCREMENT,
  dept_name VARCHAR(30),
  PRIMARY KEY(id)
);

CREATE TABLE roles (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INT,
  PRIMARY KEY(id)
);

CREATE TABLE employees (
id INT NOT NULL AUTO_INCREMENT,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INT,
manager_id INT DEFAULT NULL,
PRIMARY KEY(id)
);

INSERT INTO departments (id, dept_name)
VALUES ('1', 'Game Testing'), ('2', 'Market Research'), ('3', 'Distribution');

INSERT INTO roles (id, title, salary, department_id)
VALUES ('1', 'Lead Tester', '150.000', '2'), ('2', 'Research Lead', '175.000', '1'),('3', 'Distribution Manager', '90.000', '3');

INSERT INTO employees (id, first_name, Last_name, role_id, manager_id)
VALUES ('1', 'Gil', 'Faizon', '2', '3'), ('2', 'George', 'St. Geigland', '5', '6'), ('3', 'Andrew', 'Glowberman', '8', '9');