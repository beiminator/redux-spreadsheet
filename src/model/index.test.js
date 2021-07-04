import rootReducer, {
  addRowAfter,
  setFocus,
  addColAfter,
  currentFocus,
  removeFocus,
  initData,
  setValue,
} from ".";

describe("Spreadsheet App", () => {
  it("should initialize state", () => {
    // given
    const beforeState = undefined;
    const action = { type: "ANY_ACTION" };
    const afterState = {
      grid: {
        focus: { row: 0, col: 0 },
        rows: [],
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
  });
  it("should add a row with no rows", () => {
    // given
    const beforeState = {
      grid: {
        focus: { row: 0, col: 0 },
        rows: [],
      },
    };
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
    const beforeState = {
      grid: {
        focus: { row: 0, col: 0 },
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
  });
  it("should add a row after 1st", () => {
    // given
    const beforeState = {
      grid: {
        focus: { row: 0, col: 0 },
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
    // console.log(JSON.stringify(beforeState.grid.rows));
    const state = rootReducer(beforeState, action);
    // console.log(JSON.stringify(state.grid.rows));
    // then
    expect(state.grid.rows.length).toBe(afterState.grid.rows.length);
    expect(state.grid.rows[0]).toEqual(beforeState.grid.rows[0]);
    expect(state.grid.rows[2]).toEqual(beforeState.grid.rows[1]);
  });
  it("should set focus on a cell", () => {
    // given
    const beforeState = {
      grid: {
        focus: { row: 0, col: 0 },
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
    const focusOn = setFocus(1, 1);
    const focusOff = removeFocus(
      currentFocus(beforeState).row,
      currentFocus(beforeState).col
    );
    const afterState = {
      grid: {
        focus: { row: 1, col: 1 },
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
    const state1 = rootReducer(beforeState, focusOff);
    const state = rootReducer(state1, focusOn);

    // then
    expect(state.grid.focus).toEqual(afterState.grid.focus);
    expect(state.grid.rows[0].cols[0].focus).toBe(
      afterState.grid.rows[0].cols[0].focus
    );
    expect(state.grid.rows[1].cols[1].focus).toBe(
      afterState.grid.rows[1].cols[1].focus
    );
  });
  it("should init the rows", () => {
    const beforeState = undefined;
    const numbreOfRows = 3;
    const numberOfColumns = 5;
    const action = initData(numbreOfRows, numberOfColumns);
    const state = rootReducer(beforeState, action);

    expect(state.grid.rows.length).toBe(numbreOfRows);
    expect(state.grid.rows[0].cols.length).toBe(numberOfColumns);
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
});
