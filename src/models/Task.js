const mongoose = require('mongoose');
require('../middleware/auth')

//Schema to map to a MongoDB collection defining a task within a collection
const taskSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
  },
  listid: {
    type: mongoose.ObjectId,
    required: true,
  }
})

taskSchema.virtual('taskId').get(function() {
  return this._id;
});

const Task = mongoose.model("Task", taskSchema);


module.exports = Task;
