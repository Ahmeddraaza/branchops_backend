/* eslint-disable prettier/prettier */

import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    status : false,
    userType: null,
    userid:null
   
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userType = action.payload.userType;
            state.userid=action.payload.user_id;

            
        },
        logout:(state,action)=>{
            state.status=false;
            state.userType=null;
            
            
        }
        
     }
})

export const {login,logout} = authSlice.actions;

export default authSlice.reducer;