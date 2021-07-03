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
  const maxCols = (state) => {
    if (state.rows.length === 0) return 0;
    return state.rows[0].cols.length;
  };
  const genId = () => new Date().getTime();
  const { type, payload } = action;
  switch (type) {
    case actions.ADD_COL_AFTER:
      return {
        ...state,
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
            cols: newRow(defCol, maxCols(state)),
          },
          ...state.rows.slice(payload.row + 1),
        ],
      };
    case actions.REMOVE_FOCUS:
    case actions.SET_FOCUS:
      return {
        ...state,
        rows: state.rows.map((rowItem, currentRow) => {
          if (currentRow === payload.row) {
            return {
              ...rowItem,
              cols: setColFocus(rowItem.cols, payload.col, payload.focus),
            };
          } else {
            return rowItem;
          }
        }),
        focus: { row: payload.row, col: payload.col },
      };
    default:
      return state;
  }
}
export const selectCell = (state, row, col) => state.rows[row].cols[col];
export const currentFocus = (state) => state.focus;
