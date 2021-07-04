import * as actions from "./action-types";
export const NO_FOCUS = { row: -1, col: -1 };
export default function focus(state = NO_FOCUS, action) {
  const { type, payload } = action;
  switch (type) {
    case actions.SET_FOCUS:
      return { row: payload.row, col: payload.col };
    case actions.REMOVE_FOCUS:
      return NO_FOCUS;
    default:
      return state;
  }
}
