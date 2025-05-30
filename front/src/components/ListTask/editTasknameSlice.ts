import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit';

export interface Taskname {
    taskname: string | null;
};

const initialState: Taskname = {
    taskname: null
};

export const editTasknameSlice = createSlice({
  name: 'editTaskname',
  initialState,
  reducers: {
    setEditTaskname: (state, action: PayloadAction<string | null>) => {
      state.taskname = action.payload;
    },
    resetEditTaskname: (state) => {
      state.taskname = null;
    },
  },
});

export const { setEditTaskname, resetEditTaskname } = editTasknameSlice.actions;

export default editTasknameSlice.reducer;