/* eslint-disable prettier/prettier */

import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    status : false,
    userType: null
   
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userType = action.payload.userType;

            
        },
        logout:(state,action)=>{
            state.status=false;
            state.userType=null;
            
            
        }
        
     }
})

export const {login,logout} = authSlice.actions;

export default authSlice.reducer;