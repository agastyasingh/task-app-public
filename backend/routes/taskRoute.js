const express = require("express");
const router = express.Router();
const protect = require("../middleWare/authMiddleware");
const {
  createTask,
  getTasks,
  getTask,
  deleteTask,
  updateTask,
} = require("../controllers/taskController");
const { upload } = require("../utils/fileUpload");

router.post("/", protect, upload.single("image"), createTask);
router.patch("/:id", protect, upload.single("image"), updateTask);
router.get("/", protect, getTasks);
router.get("/:id", protect, getTask);
router.delete("/:id", protect, deleteTask);

module.exports = router;