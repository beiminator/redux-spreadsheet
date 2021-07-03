import { createStore, isAsyncThunkAction } from "@reduxjs/toolkit";
import rootReducer, { addRowAfter, setFocus, addColAfter } from ".";

describe("Spreadsheet App", () => {
  it("should initialize state", () => {
    // given
    const beforeState = undefined;
    const action = { type: "ANY_ACTION" };
    const afterState = {
      grid: {
        focus: { row: 0, col: 0 },
        maxCols: 1,
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
    expect(state).toEqual(afterState);
  });
  it("should add a column with no columns", () => {
    // given
    const beforeState = {
      grid: {
        focus: { row: 0, col: 0 },
        maxCols: 0,
        rows: [
          {
            cols: [],
          },
        ],
      },
    };
    const action = addColAfter(0);
    const afterState = {
      grid: {
        focus: { row: 0, col: 0 },
        maxCols: 1,
        rows: [
          {
            cols: [{ width: 100, value: "", focus: false }],
          },
        ],
      },
    };
    // when
    const state = rootReducer(beforeState, action);
    // then
    expect(state.grid.rows[0].cols.length).toEqual(
      afterState.grid.rows[0].cols.length
    );
    expect(state.grid.maxCols).toEqual(afterState.grid.maxCols);
  });
  it("should add a column after first", () => {
    // given
    const beforeState = {
      grid: {
        focus: { row: 0, col: 0 },
        maxCols: 2,
        rows: [
          {
            cols: [
              { id: 0, width: 100, value: "", focus: false },
              { id: 1, width: 100, value: "", focus: false },
            ],
          },
          {
            cols: [
              { id: 2, width: 100, value: "", focus: false },
              { id: 3, width: 100, value: "", focus: false },
            ],
          },
          {
            cols: [
              { id: 4, width: 100, value: "", focus: false },
              { id: 5, width: 100, value: "", focus: false },
            ],
          },
        ],
      },
    };
    const action = addColAfter(0);
    const afterState = {
      grid: {
        focus: { row: 0, col: 0 },
        maxCols: 3,
        rows: [
          {
            cols: [
              { id: 0, width: 100, value: "", focus: false },
              { id: 0, width: 100, value: "", focus: false },
              { id: 1, width: 100, value: "", focus: false },
            ],
          },
          {
            cols: [
              { id: 2, width: 100, value: "", focus: false },
              { id: 0, width: 100, value: "", focus: false },
              { id: 3, width: 100, value: "", focus: false },
            ],
          },
          {
            cols: [
              { id: 4, width: 100, value: "", focus: false },
              { id: 0, width: 100, value: "", focus: false },
              { id: 5, width: 100, value: "", focus: false },
            ],
          },
        ],
      },
    };
    // when
    const state = rootReducer(beforeState, action);
    // then
    expect(state.grid.rows[0].cols.length).toEqual(
      afterState.grid.rows[0].cols.length
    );
    expect(state.grid.rows[0].cols[0]).toBe(beforeState.grid.rows[0].cols[0]);
    expect(state.grid.rows[0].cols[2]).toBe(beforeState.grid.rows[0].cols[1]);
    expect(state.grid.rows[1].cols.length).toEqual(
      afterState.grid.rows[1].cols.length
    );
    expect(state.grid.rows[2].cols.length).toEqual(
      afterState.grid.rows[2].cols.length
    );
    expect(state.grid.maxCols).toEqual(afterState.grid.maxCols);
  });
  it("should add a row after 1st", () => {
    // given
    const beforeState = {
      grid: {
        focus: { row: 0, col: 0 },
        maxCols: 2,
        rows: [
          {
            cols: [
              { id: 0, width: 100, value: "", focus: false },
              { id: 1, width: 100, value: "", focus: false },
            ],
          },
          {
            cols: [
              { id: 2, width: 100, value: "", focus: false },
              { id: 3, width: 100, value: "", focus: false },
            ],
          },
        ],
      },
    };
    const action = addRowAfter(0);
    const afterState = {
      grid: {
        focus: { row: 0, col: 0 },
        maxCols: 2,
        rows: [
          {
            cols: [
              { width: 100, value: "", focus: false },
              { width: 100, value: "", focus: false },
            ],
          },
          {
            cols: [
              { width: 100, value: "", focus: false },
              { width: 100, value: "", focus: false },
            ],
          },
          {
            cols: [
              { width: 100, value: "", focus: false },
              { width: 100, value: "", focus: false },
            ],
          },
        ],
      },
    };
    // when
    const state = rootReducer(beforeState, action);
    //console.log(JSON.stringify(state.grid.rows));
    // then
    expect(state.grid.rows.length).toBe(afterState.grid.rows.length);
    expect(state.grid.maxCols).toBe(beforeState.grid.maxCols);
    expect(state.grid.rows[0]).toEqual(beforeState.grid.rows[0]);
    expect(state.grid.rows[2]).toEqual(beforeState.grid.rows[1]);
  });
  it("should set focus on a cell", () => {
    // given
    const beforeState = {
      grid: {
        focus: { row: 0, col: 0 },
        maxCols: 2,
        rows: [
          {
            cols: [
              { id: 0, width: 100, value: "", focus: true },
              { id: 1, width: 100, value: "", focus: false },
            ],
          },
          {
            cols: [
              { id: 2, width: 100, value: "", focus: false },
              { id: 3, width: 100, value: "", focus: false },
            ],
          },
        ],
      },
    };
    const action = setFocus(1, 1);
    const afterState = {
      grid: {
        focus: { row: 1, col: 1 },
        maxCols: 2,
        rows: [
          {
            cols: [
              { id: 0, width: 100, value: "", focus: false },
              { id: 1, width: 100, value: "", focus: false },
            ],
          },
          {
            cols: [
              { id: 2, width: 100, value: "", focus: false },
              { id: 3, width: 100, value: "", focus: true },
            ],
          },
        ],
      },
    };
    // when
    const state = rootReducer(beforeState, action);
    // then
    expect(state.grid.focus).toEqual(afterState.grid.focus);
    expect(state.grid.rows[0].cols[0].focus).toBe(
      afterState.grid.rows[0].cols[0].focus
    );
    expect(state.grid.rows[1].cols[1].focus).toBe(
      afterState.grid.rows[1].cols[1].focus
    );
  });
});
