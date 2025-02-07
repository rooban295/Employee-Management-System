import { configureStore } from "@reduxjs/toolkit";
import  searchReducer from "../slices/Search";


const store=configureStore({
    reducer:{
        search:searchReducer
    }
})


export default store;