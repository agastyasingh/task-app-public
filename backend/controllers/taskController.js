const asyncHandler = require("express-async-handler");
const Task = require("../models/taskModel");
const { fileSizeFormatter } = require("../utils/fileUpload");
const cloudinary = require("cloudinary").v2;

// Create Task
const createTask = asyncHandler(async (req, res) => {
  const { name, status, category, due_date, priority, description } = req.body;

  //   Validation
  if (!name || !category || !due_date || !priority || !status || !description) {
    res.status(400);
    throw new Error("Please provide all details");
  }

  // Handle Image upload
  let fileData = {};
  if (req.file) {
    // Save image to cloudinary
    let uploadedFile;
    try {
      uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        folder: "Task App",
        resource_type: "image",
      });
    } catch (error) {
      res.status(500);
      throw new Error("Image could not be uploaded");
    }

    fileData = {
      fileName: req.file.originalname,
      filePath: uploadedFile.secure_url,
      fileType: req.file.mimetype,
      fileSize: fileSizeFormatter(req.file.size, 2),
    };
  }

  // Create Task
  const task = await Task.create({
    user: req.user.id,
    name,
    status,
    category,
    due_date,
    priority,
    description,
    image: fileData,
  });

  res.status(201).json(task);
});

// Get all Tasks
const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ user: req.user.id }).sort("-createdAt");
  res.status(200).json(tasks);
});

// Get single task
const getTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  // if task doesnt exist
  if (!task) {
    res.status(404);
    throw new Error("task not found");
  }
  // Match task to its user
  if (task.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  res.status(200).json(task);
});

// Delete Task
const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  // if task doesnt exist
  if (!task) {
    res.status(404);
    throw new Error("task not found");
  }
  // Match task to its user
  if (task.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  await task.remove();
  res.status(200).json({ message: "Task deleted." });
});

// Update Task
const updateTask = asyncHandler(async (req, res) => {
  const { name, category, due_date, priority, status, description } = req.body;
  const { id } = req.params;

  const task = await Task.findById(id);

  // if task doesnt exist
  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }
  // Match task to its user
  if (task.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  // Handle Image upload
  let fileData = {};
  if (req.file) {
    // Save image to cloudinary
    let uploadedFile;
    try {
      uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        folder: "Task App",
        resource_type: "image",
      });
    } catch (error) {
      res.status(500);
      throw new Error("Image could not be uploaded");
    }

    fileData = {
      fileName: req.file.originalname,
      filePath: uploadedFile.secure_url,
      fileType: req.file.mimetype,
      fileSize: fileSizeFormatter(req.file.size, 2),
    };
  }

  // Update Task
  const updatedTask = await Task.findByIdAndUpdate(
    { _id: id },
    {
      name,
      category,
      due_date,
      priority,
      description,
      status,
      image: Object.keys(fileData).length === 0 ? task?.image : fileData,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json(updatedTask);
});

module.exports = {
  createTask,
  getTasks,
  getTask,
  deleteTask,
  updateTask,
};