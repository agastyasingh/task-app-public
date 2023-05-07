import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useRedirectLoggedOutUser from "../../../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../../redux/features/auth/authSlice";
import { getTask } from "../../../redux/features/task/taskSlice";
import Card from "../../card/Card";
import { SpinnerImg } from "../../loader/Loader";
import "./TaskDetail.scss";
import DOMPurify from "dompurify";

const TaskDetail = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const { id } = useParams();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { task, isLoading, isError, message } = useSelector(
    (state) => state.task
  );

  const timeStatus = (due_date) => {
    if (due_date > 0) {
      return <span className="--color-success">Still time left</span>;
    }
    return <span className="--color-danger">Out Of Time</span>;
  };

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getTask(id));
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);

  return (
    <div className="task-detail">
      <h3 className="--mt">Task Detail</h3>
      <Card cardClass="card">
        {isLoading && <SpinnerImg />}
        {task && (
          <div className="detail">
            <Card cardClass="group">
              {task?.image ? (
                <img
                  src={task.image.filePath}
                  alt={task.image.fileName}
                />
              ) : (
                <p>No image set for this task</p>
              )}
            </Card>
            <h4>Time left: {timeStatus(task.due_date)}</h4>
            <hr />
            <h4>
              <span className="badge">Name: </span> &nbsp; {task.name}
            </h4>
            <p>
              <b>&rarr; Status : </b> {task.status}
            </p>
            <p>
              <b>&rarr; Category : </b> {task.category}
            </p>
            <p>
              <b>&rarr; Priority : </b> {"$"}
              {task.priority}
            </p>
            <p>
              <b>&rarr; Time left : </b> {task.due_date}
            </p>
            

            <hr />
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(task.description),
              }}
            ></div>
            <hr />
            <code className="--color-dark">
              Created on: {task.createdAt.toLocaleString("en-US")}
            </code>
            <br />
            <code className="--color-dark">
              Last Updated: {task.updatedAt.toLocaleString("en-US")}
            </code>
          </div>
        )}
      </Card>
    </div>
  );
};

export default TaskDetail;