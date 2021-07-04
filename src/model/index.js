import * as actions from "./action-types";
import grid from "./grid";
import { combineReducers } from "@reduxjs/toolkit";
import { NO_FOCUS } from "./focus";

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
export const initData = (rows, cols) => ({
  type: actions.INIT_GRID,
  payload: { rows, cols },
});
export const setValue = (row, col, value) => ({
  type: actions.SET_VALUE,
  payload: { row, col, value },
});
export default combineReducers({ grid });
// selectors
export const selectRows = (state) => state.grid.rows;
export const selectCell = (state, { row, col }) =>
  state.grid.rows[row].cols[col];
export const cellDimensions = (state, { row, col }) => ({
  height: state.grid.rowMarkers[row].height,
  width: state.grid.colMarkers[col].width,
});
export const rowHeights = (state) =>
  state.grid.rowMarkers.map((marker) => marker.height);
export const currentFocus = (state) => state.grid.focus;
export const maxCols = (state) =>
  typeof state.grid.colMarkers !== "undefined" &&
  state.grid.colMarkers.length > 0
    ? state.grid.colMarkers.length
    : 0;
export const thereIsFocus = (state) =>
  state.grid.focus.row > NO_FOCUS.row && state.grid.focus.col > NO_FOCUS.col;
