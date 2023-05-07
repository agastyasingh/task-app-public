import React, { useEffect } from "react";
import "./TaskSummary.scss";
import { AiFillDollarCircle } from "react-icons/ai";
import { BsCart4, BsCartX } from "react-icons/bs";
import { BiCategory } from "react-icons/bi";
import InfoBox from "../../infoBox/InfoBox";
import { useDispatch, useSelector } from "react-redux";
import {
  CALC_CATEGORY,
  CALC_TIMELEFT,
  CALC_TOTAL_TASKS,
  selectCategory,
  selectTimeLeft,
  selectTotalTaskValue,
} from "../../../redux/features/task/taskSlice";

// Icons
const earningIcon = <AiFillDollarCircle size={40} color="#fff" />;
const taskIcon = <BsCart4 size={40} color="#fff" />;
const categoryIcon = <BiCategory size={40} color="#fff" />;
const timeLeftIcon = <BsCartX size={40} color="#fff" />;

// Format Amount
export const formatNumbers = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const TaskSummary = ({ tasks }) => {
  const dispatch = useDispatch();
  const totalTaskValue = useSelector(selectTotalTaskValue);
  const timeLeft = useSelector(selectTimeLeft);
  const category = useSelector(selectCategory);

  useEffect(() => {
    dispatch(CALC_TOTAL_TASKS(tasks));
    dispatch(CALC_TIMELEFT(tasks));
    dispatch(CALC_CATEGORY(tasks));
  }, [dispatch, tasks]);

  return (
    <div className="task-summary">
      <h3 className="--mt">Task Stats</h3>
      <div className="info-summary">
        <InfoBox
          icon={taskIcon}
          title={"Total Tasks"}
          count={tasks.length}
          bgColor="card1"
        />
        <InfoBox
          icon={earningIcon}
          title={"Total Task Value"}
          count={`$${formatNumbers(totalTaskValue.toFixed(2))}  `}
          bgColor="card2"
        />
        <InfoBox
          icon={timeLeftIcon}
          title={"Time Left"}
          count={timeLeft}
          bgColor="card3"
        />
        <InfoBox
          icon={categoryIcon}
          title={"All Categories"}
          count={category.length}
          bgColor="card4"
        />
      </div>
    </div>
  );
};

export default TaskSummary;