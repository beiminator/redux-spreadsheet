import NO_FOCUS from "./grid.slice";

// selectors
export const selectRows = (state) => state.rows;
export const selectCell = (state, { row, col }) => state.rows[row].cols[col];
export const cellDimensions = (state, { row, col }) => ({
  height: state.rowMarkers[row].height,
  width: state.colMarkers[col].width,
});
export const rowHeights = (state) =>
  state.rowMarkers.map((marker) => marker.height);
export const selectRowMarker = (state, { row }) => state.rowMarkers[row];
export const selectColMarker = (state, { col }) => state.colMarkers[col];
export const getFocus = (state) => state.focus;
export const getRange = (state) => state.range;
export const maxRows = (state) => state.rowMarkers.length;
export const maxCols = (state) => state.colMarkers.length;
export const thereIsFocus = (state) =>
  state.focus.row > NO_FOCUS.row && state.focus.col > NO_FOCUS.col;
