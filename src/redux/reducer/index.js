// reducers.js
import { combineReducers } from '@reduxjs/toolkit';
import fetchApiReducer from '../slice/fetchingAPISlice'

const rootReducer = combineReducers({
    JsonData : fetchApiReducer,

});

export default rootReducer;
