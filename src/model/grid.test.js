import {
  initGrid,
  removeColAfter,
  removeColBefore,
  removeRowAfter,
  removeRowBefore,
  addColAfter,
  addColBefore,
  addRowAfter,
  addRowBefore,
  setFocus,
  removeFocus,
  NO_FOCUS,
  markRangeAsSelected,
  markRangeAsNotSelected,
  NO_RANGE,
  setValue,
  removeCurrentRow,
  removeCurrentCol,
} from "./grid.slice";
import reducer from "./grid.slice";
import { getFocus, getRange, selectCell } from "./selectors";

describe("Grid Tests", () => {
  it("should init the grid", () => {
    const beforeState = undefined;
    const numberOfRows = 3;
    const numberOfColumns = 5;
    const action = initGrid({ rows: numberOfRows, cols: numberOfColumns });
    const state = reducer(beforeState, action);

    expect(state.rows.length).toBe(numberOfRows);
    expect(state.rows[0].cols.length).toBe(numberOfColumns);
  });
  it("should remove a column before", () => {
    const fromZero = undefined;
    const numberOfRows = 3;
    const numberOfColumns = 3;
    const initAction = initGrid({ rows: numberOfRows, cols: numberOfColumns });
    const initState = reducer(fromZero, initAction);
    const expectedRows = 3;
    const expectedCols = 2;

    const action = removeColBefore({ col: 0 });
    const state = reducer(initState, action);
    expect(state).toEqual(initState);

    const action1 = removeColBefore({ col: 1 });
    const state1 = reducer(state, action1);

    expect(state1.rows.length).toBe(expectedRows);
    expect(state1.rowMarkers.length).toBe(expectedRows);
    expect(state1.colMarkers.length).toBe(expectedCols);
    expect(state1.rows[0].cols[0]).toBe(state.rows[0].cols[1]);
    expect(state1.rows[0].cols[1]).toBe(state.rows[0].cols[2]);
    expect(state1.rows[0].cols.length).toBe(expectedCols);
    expect(state1.rows[1].cols.length).toBe(expectedCols);
    expect(state1.rows[2].cols.length).toBe(expectedCols);
  });
  it("should remove a row before", () => {
    const fromZero = undefined;
    const numberOfRows = 3;
    const numberOfColumns = 3;
    const initAction = initGrid({ rows: numberOfRows, cols: numberOfColumns });
    const initState = reducer(fromZero, initAction);
    const expectedRows = 2;
    const expectedCols = 3;

    const action = removeRowBefore({ row: 0 });
    const state = reducer(initState, action);
    expect(state).toEqual(initState);

    const action1 = removeRowBefore({ row: 1 });
    const state1 = reducer(state, action1);

    expect(state1.rowMarkers.length).toBe(expectedRows);
    expect(state1.colMarkers.length).toBe(expectedCols);
    expect(state1.rows[0]).toBe(state.rows[1]);
    expect(state1.rows[1]).toBe(state.rows[2]);
    expect(state1.rows.length).toBe(expectedRows);
    expect(state1.rows[0].cols.length).toBe(expectedCols);
    expect(state1.rows[1].cols.length).toBe(expectedCols);
  });
  it("should remove the current column", () => {
    const fromZero = undefined;
    const numberOfRows = 3;
    const numberOfColumns = 3;
    const initAction = initGrid({ rows: numberOfRows, cols: numberOfColumns });
    const initState = reducer(fromZero, initAction);
    const expectedRows = 3;
    const expectedCols = 2;

    const action = removeCurrentCol({ col: 0 });
    const state = reducer(initState, action);

    expect(state.rows.length).toBe(expectedRows);
    expect(state.rowMarkers.length).toBe(expectedRows);
    expect(state.colMarkers.length).toBe(expectedCols);
    expect(state.rows[0].cols[0]).toBe(initState.rows[0].cols[1]);
    expect(state.rows[0].cols[1]).toBe(initState.rows[0].cols[2]);
    expect(state.rows[0].cols.length).toBe(expectedCols);
    expect(state.rows[1].cols.length).toBe(expectedCols);
    expect(state.rows[2].cols.length).toBe(expectedCols);
  });
  it("should remove the current row", () => {
    const fromZero = undefined;
    const numberOfRows = 3;
    const numberOfColumns = 3;
    const initAction = initGrid({ rows: numberOfRows, cols: numberOfColumns });
    const initState = reducer(fromZero, initAction);
    const expectedRows = 2;
    const expectedCols = 3;

    const action = removeCurrentRow({ row: 0 });
    const state = reducer(initState, action);

    expect(state.rowMarkers.length).toBe(expectedRows);
    expect(state.colMarkers.length).toBe(expectedCols);
    expect(state.rows[0]).toBe(initState.rows[1]);
    expect(state.rows[1]).toBe(initState.rows[2]);
    expect(state.rows.length).toBe(expectedRows);
    expect(state.rows[0].cols.length).toBe(expectedCols);
    expect(state.rows[1].cols.length).toBe(expectedCols);
  });
  it("should remove a column after", () => {
    const fromZero = undefined;
    const numberOfRows = 3;
    const numberOfColumns = 3;
    const initAction = initGrid({ rows: numberOfRows, cols: numberOfColumns });
    const initState = reducer(fromZero, initAction);
    const expectedRows = 3;
    const expectedCols = 2;

    const action = removeColAfter({ col: 2 });
    const state = reducer(initState, action);
    expect(state).toEqual(initState);

    const action1 = removeColAfter({ col: 1 });
    const state1 = reducer(state, action1);

    expect(state1.rowMarkers.length).toBe(expectedRows);
    expect(state1.colMarkers.length).toBe(expectedCols);
    expect(state1.rows[0].cols[0]).toBe(state.rows[0].cols[0]);
    expect(state1.rows[0].cols[1]).toBe(state.rows[0].cols[1]);
    expect(state1.rows.length).toBe(expectedRows);
    expect(state1.rows[0].cols.length).toBe(expectedCols);
    expect(state1.rows[1].cols.length).toBe(expectedCols);
    expect(state1.rows[2].cols.length).toBe(expectedCols);
  });
  it("should remove a row after", () => {
    const fromZero = undefined;
    const numberOfRows = 3;
    const numberOfColumns = 3;
    const initAction = initGrid({ rows: numberOfRows, cols: numberOfColumns });
    const initState = reducer(fromZero, initAction);
    const expectedRows = 2;
    const expectedCols = 3;

    const action = removeRowAfter({ row: 2 });
    const state = reducer(initState, action);
    expect(state).toEqual(initState);

    const action1 = removeRowAfter({ row: 0 });
    const state1 = reducer(state, action1);

    expect(state1.rowMarkers.length).toBe(expectedRows);
    expect(state1.colMarkers.length).toBe(expectedCols);
    expect(state1.rows[0]).toBe(state.rows[0]);
    expect(state1.rows[1]).toBe(state.rows[2]);
    expect(state1.rows.length).toBe(expectedRows);
    expect(state1.rows[0].cols.length).toBe(expectedCols);
    expect(state1.rows[1].cols.length).toBe(expectedCols);
  });
  it("should add a column before", () => {
    const fromZero = undefined;
    const numberOfRows = 3;
    const numberOfColumns = 2;
    const initAction = initGrid({ rows: numberOfRows, cols: numberOfColumns });
    const initState = reducer(fromZero, initAction);
    const expectedRows = 3;
    const expectedCols = 3;

    const action = addColBefore({ col: 0 });
    const state = reducer(initState, action);

    expect(state.rowMarkers.length).toBe(expectedRows);
    expect(state.colMarkers.length).toBe(expectedCols);
    expect(state.rows.length).toBe(expectedRows);
    expect(state.rows[0].cols[1]).toBe(initState.rows[0].cols[0]);
    expect(state.rows[0].cols[2]).toBe(initState.rows[0].cols[1]);
    expect(state.rows[0].cols.length).toBe(expectedCols);
    expect(state.rows[1].cols.length).toBe(expectedCols);
    expect(state.rows[2].cols.length).toBe(expectedCols);

    const action1 = addColBefore({ col: 1 });
    const state1 = reducer(state, action1);

    expect(state1.rowMarkers.length).toBe(expectedRows);
    expect(state1.colMarkers.length).toBe(expectedCols + 1);
    expect(state1.rows.length).toBe(expectedRows);
    expect(state1.rows[0].cols[0]).toBe(state.rows[0].cols[0]);
    expect(state1.rows[0].cols[2]).toBe(state.rows[0].cols[1]);
    expect(state1.rows[0].cols[3]).toBe(state.rows[0].cols[2]);
    expect(state1.rows[0].cols.length).toBe(expectedCols + 1);
    expect(state1.rows[1].cols.length).toBe(expectedCols + 1);
    expect(state1.rows[2].cols.length).toBe(expectedCols + 1);
  });
  it("should add a row before", () => {
    const fromZero = undefined;
    const numberOfRows = 2;
    const numberOfColumns = 3;
    const initAction = initGrid({ rows: numberOfRows, cols: numberOfColumns });
    const initState = reducer(fromZero, initAction);
    const expectedRows = 3;
    const expectedCols = 3;

    const action = addRowBefore({ row: 0 });
    const state = reducer(initState, action);
    // console.log("initstate", JSON.stringify(initState));
    expect(state.rowMarkers.length).toBe(expectedRows);
    expect(state.colMarkers.length).toBe(expectedCols);
    expect(state.rows.length).toEqual(expectedRows);
    expect(state.rows[1]).toEqual(initState.rows[0]);
    expect(state.rows[2]).toEqual(initState.rows[1]);
    // console.log("state", JSON.stringify(state));
    const action1 = addRowBefore({ row: 1 });
    const state1 = reducer(state, action1);
    expect(state1.rowMarkers.length).toBe(expectedRows + 1);
    expect(state1.colMarkers.length).toBe(expectedCols);
    expect(state1.rows[0]).toBe(state.rows[0]);
    expect(state1.rows[2]).toBe(state.rows[1]);
    expect(state1.rows[3]).toBe(state.rows[2]);
    expect(state1.rows.length).toBe(expectedRows + 1);
    expect(state1.rows[0].cols.length).toBe(expectedCols);
    expect(state1.rows[1].cols.length).toBe(expectedCols);
  });
  it("should add a column after", () => {
    const fromZero = undefined;
    const numberOfRows = 3;
    const numberOfColumns = 2;
    const initAction = initGrid({ rows: numberOfRows, cols: numberOfColumns });
    const initState = reducer(fromZero, initAction);
    const expectedRows = 3;
    const expectedCols = 3;

    const action = addColAfter({ col: 0 });
    const state = reducer(initState, action);

    expect(state.rowMarkers.length).toBe(expectedRows);
    expect(state.colMarkers.length).toBe(expectedCols);
    expect(state.rows.length).toBe(expectedRows);
    expect(state.rows[0].cols[0]).toBe(initState.rows[0].cols[0]);
    expect(state.rows[0].cols[2]).toBe(initState.rows[0].cols[1]);
    expect(state.rows[0].cols.length).toBe(expectedCols);
    expect(state.rows[1].cols.length).toBe(expectedCols);
    expect(state.rows[2].cols.length).toBe(expectedCols);

    const action1 = addColAfter({ col: 3 });
    const state1 = reducer(state, action1);

    expect(state1.rowMarkers.length).toBe(expectedRows);
    expect(state1.colMarkers.length).toBe(expectedCols + 1);
    expect(state1.rows.length).toBe(expectedRows);
    expect(state1.rows[0].cols[0]).toBe(state.rows[0].cols[0]);
    expect(state1.rows[0].cols[1]).toBe(state.rows[0].cols[1]);
    expect(state1.rows[0].cols[2]).toBe(state.rows[0].cols[2]);
    expect(state1.rows[0].cols.length).toBe(expectedCols + 1);
    expect(state1.rows[1].cols.length).toBe(expectedCols + 1);
    expect(state1.rows[2].cols.length).toBe(expectedCols + 1);
  });
  it("should add a row after", () => {
    const fromZero = undefined;
    const numberOfRows = 2;
    const numberOfColumns = 3;
    const initAction = initGrid({ rows: numberOfRows, cols: numberOfColumns });
    const initState = reducer(fromZero, initAction);
    const expectedRows = 3;
    const expectedCols = 3;

    const action = addRowAfter({ row: 0 });
    const state = reducer(initState, action);
    // console.log("initstate", JSON.stringify(initState));

    expect(state.rowMarkers.length).toBe(expectedRows);
    expect(state.colMarkers.length).toBe(expectedCols);
    expect(state.rows.length).toEqual(expectedRows);
    expect(state.rows[0]).toEqual(initState.rows[0]);
    expect(state.rows[2]).toEqual(initState.rows[1]);
    // console.log("state", JSON.stringify(state));
    const action1 = addRowAfter({ row: 5 });
    const state1 = reducer(state, action1);

    expect(state1.rowMarkers.length).toBe(expectedRows + 1);
    expect(state1.colMarkers.length).toBe(expectedCols);
    expect(state1.rows[0]).toBe(state.rows[0]);
    expect(state1.rows[1]).toBe(state.rows[1]);
    expect(state1.rows[2]).toBe(state.rows[2]);
    expect(state1.rows.length).toBe(expectedRows + 1);
    expect(state1.rows[0].cols.length).toBe(expectedCols);
    expect(state1.rows[1].cols.length).toBe(expectedCols);
  });
  it("should set the focus on a cell", () => {
    const fromZero = undefined;
    const numberOfRows = 3;
    const numberOfColumns = 3;
    const initAction = initGrid({ rows: numberOfRows, cols: numberOfColumns });
    const initState = reducer(fromZero, initAction);
    const focusRow = 0;
    const focusCol = 0;

    const action = setFocus({ row: focusRow, col: focusCol });
    const state = reducer(initState, action);
    const cell = selectCell(state, { row: focusRow, col: focusCol });
    const currentFocus = getFocus(state);

    expect(cell.focus).toBe(true);
    expect(currentFocus).toEqual({ row: focusRow, col: focusCol });

    const action1 = removeFocus({ row: focusRow, col: focusCol });
    const state1 = reducer(state, action1);
    const cell1 = selectCell(state1, { row: focusRow, col: focusCol });
    const currentFocus1 = getFocus(state1);

    expect(cell.focus).toBe(true);
    expect(cell1.focus).toBe(false);
    expect(currentFocus1).toEqual(NO_FOCUS);
  });
  it("should mark a range as selected", () => {
    const fromZero = undefined;
    const numberOfRows = 3;
    const numberOfColumns = 3;
    const initAction = initGrid({ rows: numberOfRows, cols: numberOfColumns });
    const initState = reducer(fromZero, initAction);

    const row1 = 0;
    const row2 = 0;
    const col1 = 0;
    const col2 = 2;

    // console.log("initstate", JSON.stringify(initState));

    const action = markRangeAsSelected({ row1, col1, row2, col2 });
    const state = reducer(initState, action);

    // console.log("state", JSON.stringify(state));

    const markedCell1 = selectCell(state, { row: row1, col: col1 });
    const markedCell2 = selectCell(state, { row: row1, col: col1 + 1 });
    const markedCellend = selectCell(state, { row: row2, col: col2 });
    const notMarkedCell1 = selectCell(state, { row: row1 + 1, col: col1 });
    const selectedRange = getRange(state);

    expect(selectedRange).toEqual({ row1, col1, row2, col2 });
    expect(markedCell1.selected).toBe(true);
    expect(markedCell2.selected).toBe(true);
    expect(markedCellend.selected).toBe(true);
    expect(notMarkedCell1.selected).toBe(false);

    const action1 = markRangeAsNotSelected({ row1, col1, row2, col2 });
    const state1 = reducer(state, action1);

    const _markedCell1 = selectCell(state1, { row: row1, col: col1 });
    const _markedCell2 = selectCell(state1, { row: row1, col: col1 + 1 });
    const _markedCellend = selectCell(state1, { row: row2, col: col2 });
    const _notMarkedCell1 = selectCell(state1, { row: row1 + 1, col: col1 });
    const selectedRange1 = getRange(state1);

    expect(selectedRange1).toEqual(NO_RANGE);
    expect(markedCell1.selected).toBe(true);
    expect(markedCell2.selected).toBe(true);
    expect(markedCellend.selected).toBe(true);
    expect(notMarkedCell1.selected).toBe(false);

    expect(_markedCell1.selected).toBe(false);
    expect(_markedCell2.selected).toBe(false);
    expect(_markedCellend.selected).toBe(false);
    expect(_notMarkedCell1.selected).toBe(false);

    expect(notMarkedCell1).toBe(_notMarkedCell1);
  });
  it("should set a cell value", () => {
    const fromZero = undefined;
    const numberOfRows = 3;
    const numberOfColumns = 3;
    const initAction = initGrid({ rows: numberOfRows, cols: numberOfColumns });
    const initState = reducer(fromZero, initAction);

    const row = 1;
    const col = 2;
    const expectedValue = "some value";

    const action = setValue({ row, col, value: expectedValue });
    const state = reducer(initState, action);

    const cell1 = selectCell(initState, { row, col });
    const cell2 = selectCell(state, { row, col });
    const cell3 = selectCell(state, { row, col: col - 1 });

    expect(cell1).not.toEqual(cell2);
    expect(cell2.value).toBe(expectedValue);
    expect(cell3.value).toBe("");
  });
});
