/*prettier-ignore*/
import { createSlice } from '@reduxjs/toolkit';
/*prettier-ignore*/
const DataSlice = createSlice({
   name: 'username',
   initialState: 0,
   reducers: {
    setuser: (state, action) => action.payload
   },
});

export const { setuser } = DataSlice.actions;
export default DataSlice.reducer;
