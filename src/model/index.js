import * as actions from "./action-types";
import grid from "./grid";
import { combineReducers } from "@reduxjs/toolkit";

// action creators
export const setFocus = (row, col) => ({
  type: actions.SET_FOCUS,
  payload: { row, col, focus: true },
});
export const removeFocus = (row, col) => ({
  type: actions.REMOVE_FOCUS,
  payload: { row, col, focus: false },
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
export const selectRows = (state) => state.grid.rows;
export const selectCell = (state, row, col) => state.grid.rows[row].cols[col];
export const currentFocus = (state) => state.grid.focus;
