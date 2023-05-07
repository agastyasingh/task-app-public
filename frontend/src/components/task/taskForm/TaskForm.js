import React from "react";
import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
import Card from "../../card/Card";

import "./TaskForm.scss";

const TaskForm = ({
  task,
  taskImage,
  imagePreview,
  description,
  setDescription,
  handleInputChange,
  handleImageChange,
  saveTask,
}) => {
  return (
    <div className="add-task">
      <Card cardClass={"card"}>
        <form onSubmit={saveTask}>
          <Card cardClass={"group"}>
            <label>Task Image</label>
            <code className="--color-dark">
              Supported Formats: jpg, jpeg, png
            </code>
            <input
              type="file"
              name="image"
              onChange={(e) => handleImageChange(e)}
            />

            {imagePreview != null ? (
              <div className="image-preview">
                <img src={imagePreview} alt="task" />
              </div>
            ) : (
              <p>No image set for this task.</p>
            )}
          </Card>
          <label>Task Name:</label>
          <input
            type="text"
            placeholder="Task name"
            name="name"
            value={task?.name}
            onChange={handleInputChange}
          />

          <label>Task Category:</label>
          <input
            type="text"
            placeholder="Task Category"
            name="category"
            value={task?.category}
            onChange={handleInputChange}
          />

          <label>Task Priority:</label>
          <input
            type="text"
            placeholder="Task Priority"
            name="priority"
            value={task?.priority}
            onChange={handleInputChange}
          />

          <label>Task Due Date:</label>
          <input
            type="text"
            placeholder="Task Due Date"
            name="due_date"
            value={task?.due_date}
            onChange={handleInputChange}
          />

          <label>Task Description:</label>
          <ReactQuill
            theme="snow"
            value={description}
            onChange={setDescription}
            modules={TaskForm.modules}
            formats={TaskForm.formats}
          />

          <div className="--my">
            <button type="submit" className="--btn --btn-primary">
              Save Task
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

TaskForm.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["clean"],
  ],
};
TaskForm.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "color",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "video",
  "image",
  "code-block",
  "align",
];

export default TaskForm;