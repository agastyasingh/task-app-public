import React, { useEffect, useState } from "react";
import { SpinnerImg } from "../../loader/Loader";
import "./taskList.scss";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";
import Search from "../../search/Search";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_TASKS,
  selectFilteredTasks,
} from "../../../redux/features/task/filterSlice";
import ReactPaginate from "react-paginate";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import {
  deleteTask,
  getTasks,
} from "../../../redux/features/task/taskSlice";
import { Link } from "react-router-dom";

const TaskList = ({ tasks, isLoading }) => {
  const [search, setSearch] = useState("");
  const filteredTasks = useSelector(selectFilteredTasks);

  const dispatch = useDispatch();

  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };

  const delTask = async (id) => {
    console.log(id);
    await dispatch(deleteTask(id));
    await dispatch(getTasks());
  };

  const confirmDelete = (id) => {
    confirmAlert({
      title: "Delete Task",
      message: "Are you sure you want to delete this task.",
      buttons: [
        {
          label: "Delete",
          onClick: () => delTask(id),
        },
        {
          label: "Cancel",
          // onClick: () => alert('Click No')
        },
      ],
    });
  };

  //   Begin Pagination
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;

    setCurrentItems(filteredTasks.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredTasks.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filteredTasks]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredTasks.length;
    setItemOffset(newOffset);
  };
  //   End Pagination

  useEffect(() => {
    dispatch(FILTER_TASKS({ tasks, search }));
  }, [tasks, search, dispatch]);

  return (
    <div className="task-list">
      <hr />
      <div className="table">
        <div className="--flex-between --flex-dir-column">
          <span>
            <h3>Tasks List</h3>
          </span>
          <span>
            <Search
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </span>
        </div>

        {isLoading && <SpinnerImg />}

        <div className="table">
          {!isLoading && tasks.length === 0 ? (
            <p>-- No task found, please add a task...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Priority</th>
                  <th>Due Date</th>
                  <th>Value</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {currentItems.map((task, index) => {
                  const { _id, name, category, priority, due_date } = task;
                  return (
                    <tr key={_id}>
                      <td>{index + 1}</td>
                      <td>{shortenText(name, 16)}</td>
                      <td>{category}</td>
                      <td>
                        {"$"}
                        {priority}
                      </td>
                      <td>{due_date}</td>
                      <td>
                        {"$"}
                        {priority} { due_date}
                      </td>
                      <td className="icons">
                        <span>
                          <Link to={`/task-detail/${_id}`}>
                            <AiOutlineEye size={25} color={"purple"} />
                          </Link>
                        </span>
                        <span>
                          <Link to={`/edit-task/${_id}`}>
                            <FaEdit size={20} color={"green"} />
                          </Link>
                        </span>
                        <span>
                          <FaTrashAlt
                            size={20}
                            color={"red"}
                            onClick={() => confirmDelete(_id)}
                          />
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
        <ReactPaginate
          breakLabel="..."
          nextLabel="Next"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="Prev"
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          pageLinkClassName="page-num"
          previousLinkClassName="page-num"
          nextLinkClassName="page-num"
          activeLinkClassName="activePage"
        />
      </div>
    </div>
  );
};

export default TaskList;