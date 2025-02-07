import {createSlice} from "@reduxjs/toolkit";


const initialState={
    searchKeyword:''
}


export const searchSlice =createSlice({
    name:'search',
    initialState,
    reducers:{
        setSearch:(state,action)=>{
            state.searchKeyword=action.payload;
        }
    }
})

export const {setSearch}= searchSlice.actions;
export default searchSlice.reducer;