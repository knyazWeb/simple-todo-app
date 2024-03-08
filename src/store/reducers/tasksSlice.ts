import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITask } from "../types/store.types";
import { RootState } from "../store";

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [] as ITask[],
  },
  reducers: {
    addTask: (state, action: PayloadAction<ITask>) => {
      state.tasks.push(action.payload);
      
    },
    removeTask: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    }, 
  },
});

export default tasksSlice.reducer;

export const { addTask, removeTask } = tasksSlice.actions

export const selectTasks = (state: RootState) => state.tasks;
