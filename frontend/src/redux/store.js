import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/features/auth/authSlice";
import taskReducer from "../redux/features/task/taskSlice";
import filterReducer from "../redux/features/task/filterSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    task: taskReducer,
    filter: filterReducer,
  },
});