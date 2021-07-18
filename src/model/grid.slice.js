import * as utils from "../lib/utils";
import { createSlice } from "@reduxjs/toolkit";
import { maxCols, maxRows } from "./selectors";

export const NO_FOCUS = { row: -1, col: -1 };
export const NO_RANGE = { row1: -1, col1: -1, row2: -1, col2: -1 };
const initialState = {
  rows: [],
  range: NO_RANGE,
  focus: NO_FOCUS,
  colMarkers: [],
  rowMarkers: [],
};
const defCol = {
  value: "",
  focus: false,
  selected: false,
};
const defRow = {
  cols: [],
};
const defColMarker = {
  width: 100,
  selected: false,
};
const defRowMarker = {
  height: 50,
  selected: false,
};
const newCol = () => {
  return { ...defCol, id: utils.genCellId() };
};
const newRow = (state) => ({
  ...defRow,
  cols: Array.apply(null, { length: maxCols(state) }).map(() => newCol()),
});
function setCellFocus(state, payload, focus) {
  if (payload.row >= 0 && payload.col >= 0) {
    // console.log("setCellFocus, payload", payload);
    const row = state.rows.find((rowItem, row) => row === payload.row);
    // console.log("setCellFocus, row", row);
    row.cols.find((colItem, col) => col === payload.col).focus = focus;
  }
}
function setRangeSelected(state, payload, selected) {
  if (
    payload.row1 >= 0 &&
    payload.col1 >= 0 &&
    payload.row2 >= 0 &&
    payload.col2 >= 0
  ) {
    state.rows
      .filter((rowItem, row) => row >= payload.row1 && row <= payload.row2)
      .forEach((rowItem) => {
        rowItem.cols
          .filter((colItem, col) => col >= payload.col1 && col <= payload.col2)
          .forEach((colItem) => (colItem.selected = selected));
      });
    state.rowMarkers
      .filter((rowItem, row) => row >= payload.row1 && row <= payload.row2)
      .forEach((rowItem) => (rowItem.selected = selected));
    state.colMarkers
      .filter((colItem, col) => col >= payload.col1 && col <= payload.col2)
      .forEach((colItem) => (colItem.selected = selected));
  }
}
const calculateNewSelectedRange = (state) => {
  const newRange = { ...NO_RANGE };

  state.rows.forEach((rowItem, row) => {
    rowItem.cols.forEach((colItem, col) => {
      if (colItem.selected) {
        if (newRange.row1 === -1) {
          newRange.row1 = row;
          newRange.row2 = row;
        } else if (newRange.row2 > -1) {
          newRange.row2 = row;
        }
        if (newRange.col1 === -1) {
          newRange.col1 = col;
          newRange.col2 = col;
        } else if (newRange.col2 > -1) {
          newRange.col2 = col;
        }
      }
    });
  });

  if (JSON.stringify(newRange) === JSON.stringify(NO_RANGE)) {
    setRangeSelected(state, state.range, false);
  }
  state.range = newRange;
};
const gridSlice = createSlice({
  name: "grid",
  initialState: initialState,
  reducers: {
    initGrid(state, { payload }) {
      return {
        ...initialState,
        rows: Array.apply(null, { length: payload.rows }).map(() => ({
          ...defRow,
          cols: Array.apply(null, { length: payload.cols }).map(() => newCol()),
        })),
        rowMarkers: Array.apply(null, { length: payload.rows }).map(
          () => defRowMarker
        ),
        colMarkers: Array.apply(null, { length: payload.cols }).map(
          () => defColMarker
        ),
      };
    },
    removeColBefore(state, { payload }) {
      state.rows.forEach((rowItem) => {
        if (payload.col > 0) rowItem.cols.splice(payload.col - 1, 1);
      });
      if (payload.col > 0) {
        state.colMarkers.splice(payload.col - 1, 1);
        calculateNewSelectedRange(state);
      }
    },
    removeRowBefore(state, { payload }) {
      if (payload.row > 0) {
        state.rows.splice(payload.row - 1, 1);
        state.rowMarkers.splice(payload.row - 1, 1);
        calculateNewSelectedRange(state);
      }
    },
    removeCurrentCol(state, { payload }) {
      if (maxCols(state) > 1) {
        state.rows.forEach((rowItem) => {
          rowItem.cols.splice(payload.col, 1);
        });
        state.colMarkers.splice(payload.col, 1);
        calculateNewSelectedRange(state);
      }
    },
    removeCurrentRow(state, { payload }) {
      if (maxRows(state) > 1) {
        state.rows.splice(payload.row, 1);
        state.rowMarkers.splice(payload.row, 1);
        calculateNewSelectedRange(state);
      }
    },
    removeColAfter(state, { payload }) {
      state.rows.forEach((rowItem) => {
        if (payload.col < maxCols(state) - 1)
          rowItem.cols.splice(payload.col + 1, 1);
      });
      if (payload.col < maxCols(state) - 1) {
        state.colMarkers.splice(payload.col + 1, 1);
      }
      calculateNewSelectedRange(state);
    },
    removeRowAfter(state, { payload }) {
      if (payload.row < maxRows(state) - 1) {
        state.rows.splice(payload.row + 1, 1);
        state.rowMarkers.splice(payload.row + 1, 1);
      }
      calculateNewSelectedRange(state);
    },
    addColBefore(state, { payload }) {
      state.rows.forEach((rowItem) => {
        rowItem.cols.splice(payload.col > 0 ? payload.col : 0, 0, newCol());
      });
      state.colMarkers.splice(
        payload.col > 0 ? payload.col : 0,
        0,
        defColMarker
      );
      calculateNewSelectedRange(state);
    },
    addRowBefore(state, { payload }) {
      state.rows.splice(payload.row > 0 ? payload.row : 0, 0, newRow(state));
      state.rowMarkers.splice(
        payload.row > 0 ? payload.row : 0,
        0,
        defRowMarker
      );
      calculateNewSelectedRange(state);
    },
    addColAfter(state, { payload }) {
      state.rows.forEach((rowItem) => {
        rowItem.cols.splice(
          payload.col >= 0 ? payload.col + 1 : 0,
          0,
          newCol()
        );
      });
      state.colMarkers.splice(
        payload.col >= 0 ? payload.col + 1 : 0,
        0,
        defColMarker
      );
      calculateNewSelectedRange(state);
    },
    addRowAfter(state, { payload }) {
      state.rows.splice(
        payload.row >= 0 ? payload.row + 1 : 0,
        0,
        newRow(state)
      );
      state.rowMarkers.splice(
        payload.row >= 0 ? payload.row + 1 : 0,
        0,
        defRowMarker
      );
      calculateNewSelectedRange(state);
    },
    setFocus(state, { payload }) {
      setCellFocus(state, payload, true);
      state.focus = { row: payload.row, col: payload.col };
    },
    removeFocus(state, { payload }) {
      setCellFocus(state, payload, false);
      state.focus = NO_FOCUS;
    },
    markCellAsSelected(state, { payload }) {
      const newRange = {
        row1: payload.row,
        row2: payload.row,
        col1: payload.col,
        col2: payload.col,
      };
      setRangeSelected(state, newRange, true);

      state.range = newRange;
    },
    markRangeAsSelected(state, { payload }) {
      setRangeSelected(state, payload, true);
      state.range = payload;
    },
    markRangeAsNotSelected(state, { payload }) {
      setRangeSelected(state, payload, false);
      state.range = NO_RANGE;
    },
    setValue(state, { payload }) {
      const row = state.rows.find((rowItem, row) => row === payload.row);
      row.cols.find((colItem, col) => col === payload.col).value =
        payload.value;
    },
  },
  extraReducers: {},
});

export const {
  initGrid,
  removeColAfter,
  removeCurrentCol,
  removeColBefore,
  removeRowAfter,
  removeCurrentRow,
  removeRowBefore,
  addColBefore,
  addColAfter,
  addRowBefore,
  addRowAfter,
  setFocus,
  removeFocus,
  markCellAsSelected,
  markRangeAsSelected,
  markRangeAsNotSelected,
  setValue,
} = gridSlice.actions;

export default gridSlice.reducer;
