import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TaskList from "../../components/task/taskList/TaskList";
import TaskSummary from "../../components/task/taskSummary/TaskSummary";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";
import { getTasks } from "../../redux/features/task/taskSlice";

const Dashboard = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { tasks, isLoading, isError, message } = useSelector(
    (state) => state.task
  );

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getTasks());
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);

  return (
    <div>
      <TaskSummary tasks={tasks} />
      <TaskList tasks={tasks} isLoading={isLoading} />
    </div>
  );
};

export default Dashboard;