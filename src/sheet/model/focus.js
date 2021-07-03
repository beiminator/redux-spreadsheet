import * as actions from "./action-types";
export default function focus(state = { row: 0, col: 0 }, action) {
  const { type, payload } = action;
  switch (type) {
    case actions.SET_FOCUS:
    case actions.REMOVE_FOCUS:
      return { row: payload.row, col: payload.col };
    default:
      return state;
  }
}
