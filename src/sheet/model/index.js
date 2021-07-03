import * as actions from "./action-types";
import grid from "./grid";
import { combineReducers } from "@reduxjs/toolkit";

// action creators
export const setFocus = (row, col) => ({
  type: actions.SET_FOCUS,
  payload: { row, col },
});
export const addRowAfter = (row) => ({
  type: actions.ADD_ROW_AFTER,
  payload: { row },
});
export const addColAfter = (col) => ({
  type: actions.ADD_COL_AFTER,
  payload: { col },
});
export default combineReducers({ grid });
// selectors
export const selectCell = (state, row, col) => state.rows[row].cols[col];
export const currentFocus = (state) => state.focus;
