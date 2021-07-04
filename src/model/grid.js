import { combineReducers } from "@reduxjs/toolkit";
import rowMarkers from "./row-markers";
import colMarkers from "./col-markers";
import focus from "./focus";
import rows from "./rows";
import range from "./range";

export default combineReducers({ focus, rows, rowMarkers, colMarkers, range });
