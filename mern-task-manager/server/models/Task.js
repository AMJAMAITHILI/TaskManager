// server/models/Task.js
const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  category: {
    type: String,
    default: 'General',
    enum: ['Work', 'Personal', 'Study', 'Health', 'Shopping', 'General']
  },
  priority: {
    type: String,
    default: 'Medium',
    enum: ['High', 'Medium', 'Low']
  },
  completed: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Task', TaskSchema);