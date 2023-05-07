import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import TaskForm from "../../components/task/taskForm/TaskForm";
import {
  getTask,
  getTasks,
  selectIsLoading,
  selectTask,
  updateTask,
} from "../../redux/features/task/taskSlice";

const EditTask = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoading);

  const taskEdit = useSelector(selectTask);

  const [task, setTask] = useState(taskEdit);
  const [taskImage, setTaskImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState("");

  useEffect(() => {
    dispatch(getTask(id));
  }, [dispatch, id]);

  useEffect(() => {
    setTask(taskEdit);

    setImagePreview(
      taskEdit && taskEdit.image ? `${taskEdit.image.filePath}` : null
    );

    setDescription(
      taskEdit && taskEdit.description ? taskEdit.description : ""
    );
  }, [taskEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleImageChange = (e) => {
    setTaskImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const saveTask = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", task?.name);

    formData.append("category", task?.category);
    formData.append("due_date", task?.due_date);
    formData.append("priority", task?.priority);
    formData.append("description", description);
    if (taskImage) {
      formData.append("image", taskImage);
    }

    console.log(...formData);

    await dispatch(updateTask({ id, formData }));
    await dispatch(getTasks());
    navigate("/dashboard");
  };

  return (
    <div>
      {isLoading && <Loader />}
      <h3 className="--mt">Edit Task</h3>
      <TaskForm
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

export default EditTask;