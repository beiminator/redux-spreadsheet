import * as actions from "./action-types";
export const NO_RANGE = { row1: -1, col1: -1, row2: -1, col2: -1 };
export default function range(state = NO_RANGE, action) {
  const { type, payload } = action;
  switch (type) {
    case actions.REMOVE_COL_BEFORE:
      return {
        ...state,
        col1: state.col1 - 1,
        col2: state.col2 - 1,
      };
    case actions.REMOVE_ROW_BEFORE:
      return {
        ...state,
        row1: state.row1 - 1,
        row2: state.row2 - 1,
      };
    case actions.ADD_COL_BEFORE:
      return {
        ...state,
        col1: state.col1 + 1,
        col2: state.col2 + 1,
      };
    case actions.ADD_ROW_BEFORE:
      return {
        ...state,
        row1: state.row1 + 1,
        row2: state.row2 + 1,
      };
    case actions.SELECT_CELL:
    case actions.SELECT_RANGE:
      return {
        row1: payload.row1,
        col1: payload.col1,
        row2: payload.row2,
        col2: payload.col2,
      };
    case actions.UNSELECT_RANGE:
      return NO_RANGE;
    default:
      return state;
  }
}
