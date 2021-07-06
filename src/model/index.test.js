import rootReducer, {
  addRowAfter,
  setFocus,
  addColAfter,
  getFocus,
  removeFocus,
  initData,
  setValue,
  markCellAsSelected,
  markRangeAsNotSelected,
  markRangeAsSelected,
  addColBefore,
  addRowBefore,
} from ".";
import { NO_FOCUS } from "./focus";
import { NO_RANGE } from "./range";

describe("Spreadsheet App", () => {
  it("should init the grid", () => {
    const beforeState = undefined;
    const numbreOfRows = 3;
    const numberOfColumns = 5;
    const action = initData(numbreOfRows, numberOfColumns);
    const state = rootReducer(beforeState, action);

    expect(state.grid.rows.length).toBe(numbreOfRows);
    expect(state.grid.rows[0].cols.length).toBe(numberOfColumns);
  });

  it("should add a column with no columns", () => {
    // given
    const rows = 1;
    const cols = 0;
    const prepare = initData(rows, cols);
    const beforeState = rootReducer(undefined, prepare);
    const action = addColAfter(0);
    const expectedCols = 1;
    // when
    const state = rootReducer(beforeState, action);
    // then
    expect(state.grid.rows[0].cols.length).toBe(expectedCols);
  });
  it("should add a row with no rows", () => {
    // given
    const rows = 0;
    const cols = 0;
    const prepare = initData(rows, cols);
    const beforeState = rootReducer(undefined, prepare);
    const action = addRowAfter(0);
    const afterState = {
      grid: {
        focus: { row: 0, col: 0 },
        rows: [
          {
            cols: [],
          },
        ],
      },
    };
    // when
    const state = rootReducer(beforeState, action);
    // then
    expect(state.grid.rows[0].cols.length).toBe(
      afterState.grid.rows[0].cols.length
    );
  });
  it("should add a column after first", () => {
    // given
    const rows = 3;
    const cols = 2;
    const prepare = initData(rows, cols);
    const beforeState = rootReducer(undefined, prepare);
    const action = addColAfter(0);
    const expectedCols = 3;

    // when
    const state = rootReducer(beforeState, action);
    // then
    expect(state.grid.rows[0].cols.length).toBe(expectedCols);
    expect(state.grid.rows[0].cols[0]).toBe(beforeState.grid.rows[0].cols[0]);
    expect(state.grid.rows[0].cols[2]).toBe(beforeState.grid.rows[0].cols[1]);
    expect(state.grid.rows[1].cols.length).toBe(expectedCols);
    expect(state.grid.rows[2].cols.length).toBe(expectedCols);
    expect(state.grid.colMarkers.length).toBe(expectedCols);
    expect(state.grid.colMarkers[0]).toBe(beforeState.grid.colMarkers[0]);
    expect(state.grid.colMarkers[2]).toBe(beforeState.grid.colMarkers[1]);
  });
  it("should add a column before first", () => {
    // given
    const rows = 3;
    const cols = 2;
    const prepare = initData(rows, cols);
    const beforeState = rootReducer(undefined, prepare);
    const action = addColBefore(0);
    const expectedCols = 3;

    // when
    const state = rootReducer(beforeState, action);
    // then
    expect(state.grid.rows[0].cols.length).toBe(expectedCols);
    expect(state.grid.rows[0].cols[1]).toBe(beforeState.grid.rows[0].cols[0]);
    expect(state.grid.rows[0].cols[2]).toBe(beforeState.grid.rows[0].cols[1]);
    expect(state.grid.rows[1].cols.length).toBe(expectedCols);
    expect(state.grid.rows[2].cols.length).toBe(expectedCols);
    expect(state.grid.colMarkers.length).toBe(expectedCols);
    expect(state.grid.colMarkers[1]).toBe(beforeState.grid.colMarkers[0]);
    expect(state.grid.colMarkers[2]).toBe(beforeState.grid.colMarkers[1]);
  });
  it("should add a row after 1st", () => {
    // given
    const rows = 2;
    const cols = 2;
    const prepare = initData(rows, cols);
    const beforeState = rootReducer(undefined, prepare);
    const action = addRowAfter(0);
    const expectedRows = 3;

    // when
    // console.log(JSON.stringify(beforeState.grid.rows));
    const state = rootReducer(beforeState, action);
    // console.log(JSON.stringify(state.grid.rows));
    // then
    expect(state.grid.rows.length).toBe(expectedRows);
    expect(state.grid.rows[0]).toEqual(beforeState.grid.rows[0]);
    expect(state.grid.rows[2]).toEqual(beforeState.grid.rows[1]);
    expect(state.grid.rowMarkers.length).toBe(expectedRows);
    expect(state.grid.rowMarkers[0]).toBe(beforeState.grid.rowMarkers[0]);
    expect(state.grid.rowMarkers[2]).toBe(beforeState.grid.rowMarkers[1]);
  });
  it("should add a row before 1st", () => {
    // given
    const rows = 2;
    const cols = 2;
    const prepare = initData(rows, cols);
    const beforeState1 = rootReducer(undefined, prepare);
    const row1 = 0;
    const col1 = 0;
    const row2 = 0;
    const col2 = 1;
    const selectCell = markRangeAsSelected(row1, col1, row2, col2);
    const beforeState = rootReducer(beforeState1, selectCell);
    const expectedRange = { row1: 1, col1: 0, row2: 1, col2: 1 };
    const expectedRows = 3;
    const action = addRowBefore(0);

    // when

    // console.log(JSON.stringify(beforeState.grid.rows));
    const state = rootReducer(beforeState, action);
    // console.log(JSON.stringify(state.grid.rows));

    // then
    expect(state.grid.range).toEqual(expectedRange);
    expect(state.grid.rows.length).toBe(expectedRows);
    expect(state.grid.rows[1]).toBe(beforeState.grid.rows[0]);
    expect(state.grid.rows[2]).toBe(beforeState.grid.rows[1]);
    expect(state.grid.rowMarkers.length).toBe(expectedRows);
    expect(state.grid.rowMarkers[1]).toBe(beforeState.grid.rowMarkers[0]);
    expect(state.grid.rowMarkers[2]).toBe(beforeState.grid.rowMarkers[1]);
  });
  it("should remove focus from a cell", () => {
    // given
    const rows = 2;
    const cols = 2;
    const prepare = initData(rows, cols);
    const beforeState1 = rootReducer(undefined, prepare);
    const focusOn = setFocus(1, 1);
    const beforeState = rootReducer(beforeState1, focusOn);

    const focusOff = removeFocus(
      getFocus(beforeState).row,
      getFocus(beforeState).col
    );

    // when
    const state = rootReducer(beforeState, focusOff);

    // then
    expect(state.grid.focus).toEqual(NO_FOCUS);
    expect(state.grid.rows[1].cols[1].focus).toBe(false);
  });
  it("should set focus on a cell", () => {
    // given
    const rows = 2;
    const cols = 2;
    const prepare = initData(rows, cols);
    const beforeState = rootReducer(undefined, prepare);
    const focusOn = setFocus(1, 1);
    const focusOff = removeFocus(
      getFocus(beforeState).row,
      getFocus(beforeState).col
    );
    const expectedNewFocus = { row: 1, col: 1 };
    // when
    const state1 = rootReducer(beforeState, focusOff);
    const state = rootReducer(state1, focusOn);

    // then
    expect(state.grid.focus).toEqual(expectedNewFocus);
    expect(state.grid.rows[0].cols[0].focus).toBe(false);
    expect(state.grid.rows[1].cols[1].focus).toBe(true);
  });

  it("should set the value of a cell", () => {
    const prepare = initData(2, 2);
    const beforeState = rootReducer(undefined, prepare);

    const row = 0;
    const col = 1;
    const value = "Ciao Ale!";
    const action = setValue(row, col, value);
    const state = rootReducer(beforeState, action);

    expect(state.grid.rows[row].cols[col].value).toBe(value);
  });

  it("should select a cell", () => {
    const prepare = initData(2, 2);
    const beforeState = rootReducer(undefined, prepare);

    const row = 0;
    const col = 1;
    const expectedRange = { row1: 0, col1: 1, row2: 0, col2: 1 };

    const action = markCellAsSelected(row, col);
    const state = rootReducer(beforeState, action);

    expect(state.grid.rows[row].cols[col].selected).toBe(true);
    expect(state.grid.rowMarkers[row].selected).toBe(true);
    expect(state.grid.colMarkers[col].selected).toBe(true);
    expect(state.grid.range).toEqual(expectedRange);
  });
  it("should unselect a selected cell", () => {
    const prepare = initData(2, 2);
    const beforeState1 = rootReducer(undefined, prepare);
    const row = 0;
    const col = 1;
    const selectCell = markCellAsSelected(row, col);
    const beforeState = rootReducer(beforeState1, selectCell);

    const action = markRangeAsNotSelected(row, col, row, col);
    const state = rootReducer(beforeState, action);

    expect(state.grid.rows[row].cols[col].selected).toBe(false);
    expect(state.grid.rowMarkers[row].selected).toBe(false);
    expect(state.grid.colMarkers[col].selected).toBe(false);
    expect(state.grid.range).toEqual(NO_RANGE);
  });
});
