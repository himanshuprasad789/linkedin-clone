import { createSlice } from "@reduxjs/toolkit";
const initialState={
    user :null
}
const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
       // increment decrement reset
    //    increment(state){
    //     state.value++;
    //    },
    //    decrement(state){
    //        state.value--;
    //    },
    //    reset(state){
    //        state.value=0;
    //    },
    //    incrementbyAmount(state, action){
    //        state.value+=action.payload;
    //    }
          login(state,action){
              state.user=action.payload;
          },
          logout(state){
              state.user=null;
          }
    }
})
export const selectUser=(state)=>state.user.user;
export const {login,logout} =userSlice.actions;
export default userSlice.reducer;