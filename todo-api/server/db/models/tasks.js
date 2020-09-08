const mongoose = require('mongoose');

const { Schema } = mongoose;

const initSchema = new Schema({
  taskId: { type: String, required: true, unique: true },
  status: { type: String, required: true },
  text: { type: String, required: true },
  level: { type: Number },
  parentId: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('tasks', initSchema);
