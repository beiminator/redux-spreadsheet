import { combineReducers } from "@reduxjs/toolkit";
import focus from "./focus";
import rows from "./rows";

export default combineReducers({ focus, rows });

export const selectCell = (state, row, col) => state.rows[row].cols[col];
export const currentFocus = (state) => state.focus;
