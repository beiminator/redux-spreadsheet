import * as actions from "./action-types";
const defCol = {
  id: 0,
  width: 100,
  value: "",
  focus: false,
};
const defRow = {
  cols: [],
};

export default function grid(
  state = {
    focus: { row: 0, col: 0 },
    maxCols: 1,
    rows: [defRow],
  },
  action
) {
  const newRow = (proto, maxCols) => {
    const arr = [];
    let index = 0;
    for (let i = 0; i < maxCols; i++) {
      arr.push({ ...proto, id: genId() + index });
      index++;
    }
    return arr;
  };
  const setColFocus = (cols, col, focus) => {
    return cols.map((item, index) => {
      if (index === col) {
        return {
          ...item,
          focus: focus,
        };
      }
      return item;
    });
  };
  const genId = () => new Date().getTime();
  const { type, payload } = action;
  switch (type) {
    case actions.ADD_COL_AFTER:
      return {
        ...state,
        maxCols: state.maxCols + 1,
        rows: state.rows.map((rowItem) => {
          return {
            ...rowItem,
            cols: [
              ...rowItem.cols.slice(0, payload.col + 1),
              { ...defCol, id: genId() },
              ...rowItem.cols.slice(payload.col + 1),
            ],
          };
        }),
      };
    case actions.ADD_ROW_AFTER:
      return {
        ...state,
        rows: [
          ...state.rows.slice(0, payload.row + 1),
          {
            ...defRow,
            cols: newRow(defCol, state.maxCols),
          },
          ...state.rows.slice(payload.row + 1),
        ],
      };
    case actions.SET_FOCUS:
      return {
        ...state,
        rows: state.rows.map((rowItem, currentRow) => {
          if (currentRow === state.focus.row) {
            return {
              ...rowItem,
              cols: setColFocus(rowItem.cols, state.focus.col, false),
            };
          } else if (currentRow === payload.row) {
            return {
              ...rowItem,
              cols: setColFocus(rowItem.cols, payload.col, true),
            };
          } else {
            return rowItem;
          }
        }),
        focus: payload,
      };
    default:
      return state;
  }
}
