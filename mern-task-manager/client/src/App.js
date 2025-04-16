import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskFilters from './components/TaskFilters';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    category: 'All',
    priority: 'All',
    sortBy: 'createdAt'
  });

  // Base URL for API
  const API_URL = 'http://localhost:5000/api/tasks';
  
  // Fetch all tasks
  const fetchTasks = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(API_URL);
      setTasks(response.data);
      setError(null);
    } catch (err) {
      setError('Error fetching tasks');
      console.error('Error fetching tasks:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Add a task
  const addTask = async (task) => {
    try {
      const response = await axios.post(API_URL, task);
      setTasks([response.data, ...tasks]);
    } catch (err) {
      setError('Error adding task');
      console.error('Error adding task:', err);
    }
  };

  // Delete a task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (err) {
      setError('Error deleting task');
      console.error('Error deleting task:', err);
    }
  };

  // Toggle task completion
  const toggleComplete = async (id, completed) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, { completed: !completed });
      setTasks(tasks.map(task => 
        task._id === id ? response.data : task
      ));
    } catch (err) {
      setError('Error updating task');
      console.error('Error updating task:', err);
    }
  };

  // Apply filters and sorting
  useEffect(() => {
    let result = [...tasks];
    
    // Apply category filter
    if (filters.category !== 'All') {
      result = result.filter(task => task.category === filters.category);
    }
    
    // Apply priority filter
    if (filters.priority !== 'All') {
      result = result.filter(task => task.priority === filters.priority);
    }
    
    // Apply sorting
    if (filters.sortBy === 'priority') {
      const priorityOrder = { 'High': 1, 'Medium': 2, 'Low': 3 };
      result.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    } else if (filters.sortBy === 'createdAt') {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    
    setFilteredTasks(result);
  }, [tasks, filters]);

  // Load tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="app">
      <header>
        <h1>Task Manager</h1>
        <p>DBMS ASSIGNMENT-2 _ MONGODB APPLICATION</p>
      </header>
      
      <TaskForm addTask={addTask} />
      
      {error && <div className="error">{error}</div>}
      
      <TaskFilters filters={filters} setFilters={setFilters} />
      
      {isLoading ? (
        <div className="loading">Loading tasks...</div>
      ) : (
        <TaskList 
          tasks={filteredTasks} 
          deleteTask={deleteTask} 
          toggleComplete={toggleComplete} 
        />
      )}
    </div>
  );
}

export default App;