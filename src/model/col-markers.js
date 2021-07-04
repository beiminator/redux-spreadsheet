import * as actions from "./action-types";
const defColMarker = {
  width: 50,
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
    case actions.INIT_GRID:
      return Array.apply(null, { length: payload.cols }).map(
        () => defColMarker
      );
    default:
      return state;
  }
}
