# To-Do List Application

## Overview

This To-Do List application provides a backend API for managing tasks and categories. Users can create, view, update, mark as completed, and delete tasks. Tasks can be categorized, and overdue tasks can be identified.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Code Structure](#code-structure)
- [Installation](#installation)
- [Usage](#usage)

## Features

1. **Create Task**: Create a new task with a name, description, category, and due date.
   - **Route**: `POST /createTask`
   - **Explanation**: The `createTask` function receives a request with task details, checks if the associated category exists, creates one if not, and then creates the task.

2. **View All Tasks**: Retrieve a list of all tasks.
   - **Route**: `GET /getAllTasks`
   - **Explanation**: The `getAllTasks` function queries the database for all tasks and returns them as a JSON array.

3. **View Tasks by Category**: Get tasks associated with a specific category.
   - **Route**: `GET /getAllTasksByCategory/:categoryId`
   - **Explanation**: The `getAllTasksByCategory` function takes a category ID as a parameter, retrieves the category with its associated tasks, and returns them.

4. **View Task by ID**: Retrieve a single task by its unique ID.
   - **Route**: `GET /viewTaskById/:taskId`
   - **Explanation**: The `viewTaskById` function takes a task ID as a parameter, retrieves the task along with its associated category, and returns the details.

5. **Mark Task as Completed**: Set a task as completed.
   - **Route**: `PUT /markTaskCompleted/:taskId`
   - **Explanation**: The `markTaskCompleted` function checks if the task exists and is not already completed. If conditions are met, it updates the task status to completed.

6. **Update Task**: Modify task details such as name, description, category, and due date.
   - **Route**: `PUT /updateTask/:taskId`
   - **Explanation**: The `updateTask` function updates the specified task with the new details provided in the request body.

7. **Delete Task**: Remove a task, and if it's the last task in a category, delete the category.
   - **Route**: `DELETE /deleteTask/:taskId`
   - **Explanation**: The `deleteTask` function deletes the specified task, checks if it's the last task in its category, and deletes the category if needed.

8. **Show Overdue Tasks**: Retrieve tasks that are overdue and not completed.
   - **Route**: `GET /showOverdueTasks`
   - **Explanation**: The `showOverdueTasks` function queries the database for tasks with a due date earlier than the current date and that are not completed. It returns a list of overdue tasks.

## Tech Stack

- **Database**: MongoDB
- **Backend Framework**: Express.js
- **ORM**: Prisma

## Code Structure

The project follows a modular structure with separate controllers for each route:

- `task_create.js`: Create a new task.
- `task_delete.js`: Delete a task.
- `show_task.js`: Retrieve tasks based on various criteria.
- `mark_complete.js`: Mark a task as completed.
- `task_update.js`: Update task details.

## Schema Explanation

The application uses a MongoDB database with Prisma as the ORM. The schema consists of two models: `Task` and `Category`.

### Task Model

- **id**: Unique identifier for each task.
- **name**: Name of the task.
- **description**: Optional description of the task.
- **categoryId**: Reference to the category to which the task belongs.
- **dueDate**: Deadline for completing the task.
- **createdAt**: Timestamp for when the task was created.
- **isCompleted**: Flag indicating whether the task is completed.
- **updatedAt**: Timestamp for when the task was last updated.

### Category Model

- **id**: Unique identifier for each category.
- **name**: Name of the category.
- **tasks**: List of tasks associated with the category.

These two models work together to categorize tasks. When a new task is created, the application checks if the associated category exists. If not, a new category is created. This allows tasks to be organized under different categories for better task management.

## Installation

1. Clone the repository: `git clone <repository-url>`
2. Install dependencies: `npm install`

## Usage

1. Set up your MongoDB database and update the `DATABASE_URL` in the `.env` file.
2. Run the server: `npm start`
3. Access the API at `http://localhost:<port>`
