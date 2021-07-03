import { combineReducers } from "@reduxjs/toolkit";
import focus from "./focus";
import rows from "./rows";

export default combineReducers({ focus, rows });
