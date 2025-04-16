// client/src/components/TaskFilters.js
import React from 'react';

const categories = ['All', 'Work', 'Personal', 'Study', 'Health', 'Shopping', 'General'];
const priorities = ['All', 'High', 'Medium', 'Low'];

function TaskFilters({ filters, setFilters }) {
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  return (
    <div className="task-filters">
      <h3>Filter Tasks</h3>
      <div className="filters-row">
        <div className="filter-group">
          <label htmlFor="category-filter">Category:</label>
          <select
            id="category-filter"
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        
        <div className="filter-group">
          <label htmlFor="priority-filter">Priority:</label>
          <select
            id="priority-filter"
            name="priority"
            value={filters.priority}
            onChange={handleFilterChange}
          >
            {priorities.map(p => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>
        
        <div className="filter-group">
          <label htmlFor="sort-by">Sort By:</label>
          <select
            id="sort-by"
            name="sortBy"
            value={filters.sortBy}
            onChange={handleFilterChange}
          >
            <option value="createdAt">Date Created</option>
            <option value="priority">Priority</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default TaskFilters;