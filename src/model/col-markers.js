import * as actions from "./action-types";
const defColMarker = {
  width: 100,
  selected: false,
};
export default function colMarkers(state = [], action) {
  const { type, payload } = action;
  switch (type) {
    case actions.ADD_COL_AFTER:
      return [
        ...state.slice(0, payload.col),
        defColMarker,
        ...state.slice(payload.col),
      ];
    case actions.SELECT_CELL:
    case actions.UNSELECT_CELL:
      return [
        ...state.slice(0, payload.col),
        { ...state[payload.col], selected: payload.selected },
        ...state.slice(payload.col + 1),
      ];
    case actions.INIT_GRID:
      return Array.apply(null, { length: payload.cols }).map(
        () => defColMarker
      );
    default:
      return state;
  }
}
