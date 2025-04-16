import React from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks, deleteTask, toggleComplete }) {
  if (tasks.length === 0) {
    return <p className="no-tasks">No tasks found. Add a task to get started!</p>;
  }

  return (
    <div className="task-list">
      <h2>Your Tasks</h2>
      {tasks.map(task => (
        <TaskItem
          key={task._id}
          task={task}
          deleteTask={deleteTask}
          toggleComplete={toggleComplete}
        />
      ))}
    </div>
  );
}

export default TaskList;
