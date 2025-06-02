import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { FieldType } from './index';
import { getRandomInt } from '../../utils/getRandomInt';

export const asyncPushTasklist = createAsyncThunk(
  'tasklist/asyncPushTasklist',
  async (data: FieldType) => {
    const sleep = (ms: number) => {
      return new Promise(resolve => setTimeout(resolve, ms));
    };
    await sleep(getRandomInt(10,20) * 1000);
    return data;
  }
);

const initialState: FieldType[] = [
  {
    id: '1',
    taskname: 'задача номер 1',
    description: 'New York No. 1 Lake Park',
    priority: 'low',
    date: '2025-05-28',
  },
  {
    id: '2',
    taskname: 'задача номер 2',
    description: 'London No. 1 Lake Park',
    priority: 'middle',
    date: '2025-05-27',
  },
  {
    id: '3',
    taskname: 'задача номер 3',
    description: 'Sydney No. 1 Lake Park',
    priority: 'high',
    date: '2025-05-29',
  },
];

interface UpdateTask {
  id: string;
  data: FieldType;
};

export const formSlice = createSlice({
  name: 'tasklist',
  initialState,
  reducers: {
    pushTaskList: (state, action: PayloadAction<FieldType>) => {
      state.push(action.payload);
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      const filter = state.filter((item) => item.id !== action.payload);
      return state = filter;
    },
    updateTask: (state, action: PayloadAction<UpdateTask>) => {
      const filter = state.map((item) => {
        if (item.id === action.payload.id) {
          return action.payload.data;
        }
        return item;
      });
      return state = filter;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(asyncPushTasklist.fulfilled, (state, action: PayloadAction<FieldType>) => {
      state.push(action.payload);
    })
  },
});

export const { pushTaskList, deleteTask, updateTask } = formSlice.actions;

export default formSlice.reducer;