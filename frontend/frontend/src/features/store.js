import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './DataSlice';

const store = configureStore({
   reducer: {
      username: dataReducer,
   },
});

export default store;
