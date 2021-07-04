import * as actions from "./action-types";
export const NO_RANGE = [];
export default function range(state = NO_RANGE, action) {
  const { type, payload } = action;
  switch (type) {
    case actions.SELECT_CELL:
      return [
        { row: payload.row, col: payload.col },
        { row: payload.row, col: payload.col },
      ];
    case actions.UNSELECT_CELL:
      return NO_RANGE;
    default:
      return state;
  }
}
