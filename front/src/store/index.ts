import { configureStore } from '@reduxjs/toolkit';
import formReducer from '../components/FormTask/formSlice';
import editTasknameReducer from '../components/ListTask/editTasknameSlice';

export const store = configureStore({
  reducer: {
    taskList: formReducer,
    editTaskname: editTasknameReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;