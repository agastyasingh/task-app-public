import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredTasks: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    FILTER_TASKS(state, action) {
      const { tasks, search } = action.payload;
      const tempTasks = tasks.filter(
        (task) =>
          task.name.toLowerCase().includes(search.toLowerCase()) ||
          task.category.toLowerCase().includes(search.toLowerCase())
      );

      state.filteredTasks = tempTasks;
    },
  },
});

export const { FILTER_TASKS } = filterSlice.actions;

export const selectFilteredTasks = (state) => state.filter.filteredTasks;

export default filterSlice.reducer;