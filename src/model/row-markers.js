import * as actions from "./action-types";
const defRowMarker = {
  height: 50,
  selected: false,
};
export default function rowMarkers(state = [], action) {
  const { type, payload } = action;
  switch (type) {
    case actions.ADD_ROW_AFTER:
      return [
        ...state.slice(0, payload.row),
        defRowMarker,
        ...state.slice(payload.row),
      ];
    case actions.SELECT_CELL:
    case actions.SELECT_RANGE:
    case actions.UNSELECT_RANGE:
      return state.map((item, row) =>
        payload.row1 <= row && row <= payload.row2
          ? { ...item, selected: payload.selected }
          : item
      );
    case actions.INIT_GRID:
      return Array.apply(null, { length: payload.rows }).map(
        () => defRowMarker
      );
    default:
      return state;
  }
}
