import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import taskForm from "../../components/task/taskForm/TaskForm";
import {
  createTask,
  selectIsLoading,
} from "../../redux/features/task/taskSlice";

const initialState = {
  name: "",
  category: "",
  due_date: "",
  priority: "",
};

const AddTask = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [task, setTask] = useState(initialState);
  const [taskImage, setTaskImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState("");

  const isLoading = useSelector(selectIsLoading);

  const { name, category, priority, due_date } = task;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleImageChange = (e) => {
    setTaskImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const generateSTATUS = (category) => {
    const letter = category.slice(0, 3).toUpperCase();
    const number = Date.now();
    const status = letter + "-" + number;
    return status;
  };

  const saveTask = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("status", generateSTATUS(category));
    formData.append("category", category);
    formData.append("due_date", Number(due_date));
    formData.append("priority", priority);
    formData.append("description", description);
    formData.append("image", taskImage);

    console.log(...formData);

    await dispatch(createTask(formData));

    navigate("/dashboard");
  };

  return (
    <div>
      {isLoading && <Loader />}
      <h3 className="--mt">Add New Task</h3>
      <taskForm
        task={task}
        taskImage={taskImage}
        imagePreview={imagePreview}
        description={description}
        setDescription={setDescription}
        handleInputChange={handleInputChange}
        handleImageChange={handleImageChange}
        saveTask={saveTask}
      />
    </div>
  );
};

export default AddTask;