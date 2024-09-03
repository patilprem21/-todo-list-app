const router = require('express').Router();
const Task = require('../models/task.model');

// Get all tasks (including deleted ones)
router.route('/').get((req, res) => {
  Task.find()
    .then(tasks => res.json(tasks))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Add a new task
router.route('/add').post((req, res) => {
  const newTask = new Task({
    title: req.body.title,
    versions: [{
      title: req.body.title,
      completed: false,
      editedAt: new Date()
    }]
  });

  newTask.save()
    .then(() => res.json('Task added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Edit a task
router.route('/edit/:id').post((req, res) => {
  Task.findById(req.params.id)
    .then(task => {
      task.title = req.body.title;
      task.completed = req.body.completed;
      task.versions.push({
        title: req.body.title,
        completed: req.body.completed,
        editedAt: new Date()
      });

      task.save()
        .then(() => res.json('Task updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

// Soft delete a task
router.route('/delete/:id').post((req, res) => {
  Task.findById(req.params.id)
    .then(task => {
      task.isDeleted = true;
      task.versions.push({
        title: task.title,
        completed: task.completed,
        editedAt: new Date(),
        isDeleted: true
      });

      task.save()
        .then(() => res.json('Task deleted!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;