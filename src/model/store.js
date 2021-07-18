import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./grid.slice";

const store = configureStore({ reducer: rootReducer });
export default store;
