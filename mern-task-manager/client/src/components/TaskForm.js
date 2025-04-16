// client/src/components/TaskForm.js
import React, { useState } from 'react';

const categories = ['Work', 'Personal', 'Study', 'Health', 'Shopping', 'General'];
const priorities = ['High', 'Medium', 'Low'];

function TaskForm({ addTask }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('General');
  const [priority, setPriority] = useState('Medium');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title.trim()) return;
    
    // Create new task object
    const newTask = {
      title,
      description,
      category,
      priority,
      completed: false
    };
    
    // Call the addTask function passed from parent
    addTask(newTask);
    
    // Reset form
    setTitle('');
    setDescription('');
    setCategory('General');
    setPriority('Medium');
  };

  return (
    <div className="task-form">
      <h2>Add New Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
            required
          />
        </div>
        
        <div className="form-control">
          <label htmlFor="description">Description (optional)</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter task description"
          />
        </div>
        
        <div className="form-row">
          <div className="form-control">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          
          <div className="form-control">
            <label htmlFor="priority">Priority</label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              {priorities.map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>
        </div>
        
        <button type="submit" className="btn">Add Task</button>
      </form>
    </div>
  );
}

export default TaskForm;