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
export const addRowBefore = (row) => ({
  type: actions.ADD_ROW_BEFORE,
  payload: { row },
});
export const addColBefore = (col) => ({
  type: actions.ADD_COL_BEFORE,
  payload: { col },
});
export const removeRowAfter = (row) => ({
  type: actions.REMOVE_ROW_AFTER,
  payload: { row },
});
export const removeColAfter = (col) => ({
  type: actions.REMOVE_COL_AFTER,
  payload: { col },
});
export const removeRowBefore = (row) => ({
  type: actions.REMOVE_ROW_BEFORE,
  payload: { row },
});
export const removeColBefore = (col) => ({
  type: actions.REMOVE_COL_BEFORE,
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
export const markCellAsSelected = (row, col) => ({
  type: actions.SELECT_CELL,
  payload: { row1: row, col1: col, row2: row, col2: col, selected: true },
});
export const markRangeAsSelected = (row1, col1, row2, col2) => ({
  type: actions.SELECT_CELL,
  payload: { row1, col1, row2, col2, selected: true },
});
export const markRangeAsNotSelected = (row1, col1, row2, col2) => ({
  type: actions.UNSELECT_RANGE,
  payload: { row1, col1, row2, col2, selected: false },
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
export const selectRowMarker = (state, { row }) => state.grid.rowMarkers[row];
export const selectColMarker = (state, { col }) => state.grid.colMarkers[col];
export const getFocus = (state) => state.grid.focus;
export const getRange = (state) => state.grid.range;
export const maxCols = (state) =>
  typeof state.grid.colMarkers !== "undefined" &&
  state.grid.colMarkers.length > 0
    ? state.grid.colMarkers.length
    : 0;
export const maxRows = (state) =>
  typeof state.grid.rowMarkers !== "undefined" &&
  state.grid.rowMarkers.length > 0
    ? state.grid.rowMarkers.length
    : 0;
export const thereIsFocus = (state) =>
  state.grid.focus.row > NO_FOCUS.row && state.grid.focus.col > NO_FOCUS.col;
