import * as actions from "./action-types";
const defCol = {
  width: 100,
  value: "",
  focus: false,
};
const defRow = {
  cols: [],
  height: 50,
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
const maxCols = (state) => {
  if (state.length === 0) return 0;
  return state[0].cols.length;
};
const newRow = (proto, maxCols) => {
  const arr = [];
  let index = 0;
  for (let i = 0; i < maxCols; i++) {
    arr.push({ ...proto, id: genId() + index });
    index++;
  }
  return arr;
};
export default function rows(state = [], action) {
  const { type, payload } = action;
  switch (type) {
    case actions.ADD_COL_AFTER:
      return state.map((rowItem) => {
        return {
          ...rowItem,
          cols: [
            ...rowItem.cols.slice(0, payload.col + 1),
            { ...defCol, id: genId() },
            ...rowItem.cols.slice(payload.col + 1),
          ],
        };
      });
    case actions.ADD_ROW_AFTER:
      return [
        ...state.slice(0, payload.row + 1),
        {
          ...defRow,
          cols: newRow(defCol, maxCols(state)),
        },
        ...state.slice(payload.row + 1),
      ];
    case actions.SET_FOCUS:
    case actions.REMOVE_FOCUS:
      return state.map((rowItem, currentRow) => {
        if (currentRow === payload.row) {
          return {
            ...rowItem,
            cols: setColFocus(rowItem.cols, payload.col, payload.focus),
          };
        } else {
          return rowItem;
        }
      });
    default:
      return state;
  }
}
