const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taskSchema = new Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
  isDeleted: { type: Boolean, default: false },
  versions: [{
    title: String,
    completed: Boolean,
    editedAt: Date
  }]
}, {
  timestamps: true,
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;