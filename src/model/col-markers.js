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
    case actions.SELECT_RANGE:
    case actions.UNSELECT_RANGE:
      return state.map((item, col) =>
        payload.col1 <= col && col <= payload.col2
          ? { ...item, selected: payload.selected }
          : item
      );
    case actions.INIT_GRID:
      return Array.apply(null, { length: payload.cols }).map(
        () => defColMarker
      );
    default:
      return state;
  }
}
