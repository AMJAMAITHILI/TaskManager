# MERN Stack Task Manager

A simple task management application built with the MERN stack (MongoDB, Express, React, Node.js) to demonstrate frontend and backend integration.

## Features

- Create new tasks with title and optional description
- View all tasks in a list
- Mark tasks as completed/uncompleted
- Delete tasks
- Responsive UI

## Project Structure

`
project-structure/
+-- client/             # React frontend
¦   +-- public/
¦   +-- src/
+-- server/             # Node.js backend
¦   +-- config/
¦   +-- controllers/
¦   +-- models/
¦   +-- routes/
+-- README.md
`

## Prerequisites

- Node.js and npm installed
- MongoDB installed locally or a MongoDB Atlas account

## Setup Instructions

### Backend Setup

1. Navigate to the server directory:
   `
   cd server
   `

2. Install dependencies:
   `
   npm install
   `

3. The .env file is already created with the following:
   `
   MONGO_URI=mongodb://localhost:27017/task-manager
   PORT=5000
   `
   Note: If you're using MongoDB Atlas, replace the MONGO_URI with your connection string.

4. Start the server:
   `
   npm run dev
   `
   The server will run on http://localhost:5000

### Frontend Setup

1. Navigate to the client directory:
   `
   cd client
   `

2. Install dependencies:
   `
   npm install
   `

3. Start the React development server:
   `
   npm start
   `
   The frontend will run on http://localhost:3000

## API Endpoints

- GET /api/tasks - Get all tasks
- GET /api/tasks/:id - Get a specific task
- POST /api/tasks - Create a new task
- PUT /api/tasks/:id - Update a task
- DELETE /api/tasks/:id - Delete a task

## Understanding the Application Flow

1. **Frontend-Backend Communication**:
   - The React frontend makes HTTP requests to the Node.js backend
   - The backend processes these requests, interacts with MongoDB, and returns responses

2. **Data Flow**:
   - User inputs data in the React UI
   - React component triggers an API call to the backend
   - Node.js backend processes the request
   - MongoDB stores or retrieves the data
   - Data flows back to the frontend for display

3. **Component Hierarchy**:
   - App (main component)
     - TaskForm (for creating tasks)
     - TaskList (displays all tasks)
       - TaskItem (individual task)

This project demonstrates the complete MERN stack workflow with clear separation between frontend and backend.
