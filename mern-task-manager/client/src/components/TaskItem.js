// client/src/components/TaskItem.js
import React from 'react';

function TaskItem({ task, deleteTask, toggleComplete }) {
  const { _id, title, description, category, priority, completed, createdAt } = task;
  
  // Format date
  const formattedDate = new Date(createdAt).toLocaleDateString();
  
  // Define priority colors
  const priorityColors = {
    High: '#ff4d4f',
    Medium: '#faad14',
    Low: '#52c41a'
  };
  
  return (
    <div className={`task-item ${completed ? 'completed' : ''}`}>
      <div className="task-content">
        <h3>{title}</h3>
        {description && <p className="description">{description}</p>}
        <div className="task-meta">
          <span className="category-badge">{category}</span>
          <span 
            className="priority-badge"
            style={{ backgroundColor: priorityColors[priority] }}
          >
            {priority}
          </span>
          <span className="date">Created: {formattedDate}</span>
        </div>
      </div>
      
      <div className="task-actions">
        <input
          type="checkbox"
          checked={completed}
          onChange={() => toggleComplete(_id, completed)}
          className="checkbox"
        />
        <button 
          onClick={() => deleteTask(_id)}
          className="delete-btn"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskItem;