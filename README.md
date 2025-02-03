Deployment links
Frontend:https://phase-4-frontend-eta.vercel.app/
Backend:https://phase-4-project-c37g.onrender.com/

Project Overview
A user will be able to:
1. Create a lab, a test and a price
2. View all labs and tests with their repestive prices
3. Delete and update a lab
4. View tests for a specific lab
Labaratory Managament App The Lab Management System provides functionalities for creating, updating, and deleting labs and tests, as well as searching for them based on various criteria.

The application utilizes Object-Relational Mapping (ORM) techniques to interact with a SQLite database, ensuring data persistence and integrity.

Features 1.Manage labs: Create, update, delete, and search for labs by name, section, or ID.

2.Manage tests: Create, update, delete, and search for tests by name or ID.

3.One-to-many relationship: a one to many relationship between the models where a lab can have many tests and a tests is specific to a given lab A user will be able to:.

5.Input validation: Ensure data integrity by validating user input for lab and test creation/update.

Lists the the available labs and tests

Assign tests to a specific lab and view the tests to a specific lab

Usage Ensure the database is initialized and populated with sample data: python3 debug.py

The app has both frontend and backend deployed and interacts well. A user can create, update and delet tests. A user can create las and prices for each tests in various labs.