import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit';

export interface TaskID {
    id: string | null;
};

const initialState: TaskID = {
    id: null
};

export const editTasknameSlice = createSlice({
  name: 'editTaskname',
  initialState,
  reducers: {
    setEditTaskname: (state, action: PayloadAction<string | null>) => {
      state.id = action.payload;
    },
    resetEditTaskname: (state) => {
      state.id = null;
    },
  },
});

export const { setEditTaskname, resetEditTaskname } = editTasknameSlice.actions;

export default editTasknameSlice.reducer;