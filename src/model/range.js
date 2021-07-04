import * as actions from "./action-types";
export const NO_RANGE = { row1: -1, col1: -1, row2: -1, col2: -1 };
export default function range(state = NO_RANGE, action) {
  const { type, payload } = action;
  switch (type) {
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
