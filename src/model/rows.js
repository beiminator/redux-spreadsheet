import * as actions from "./action-types";
const defCol = {
  value: "",
  focus: false,
  selected: false,
};
const defRow = {
  cols: [],
};
const setColFocus = (cols, col, focus) => {
  return cols.map((item, index) => {
    if (index === col) {
      return {
        ...item,
        focus,
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
const prepareRows = (payload) => {
  const rows = [];
  for (let i = 0; i < payload.rows; i++) {
    rows.push({ ...defRow, cols: newRow(defCol, payload.cols) });
  }
  return rows;
};
const setValue = (state, { row, col, value }) => {
  return [
    ...state.slice(0, row),
    {
      ...state[row],
      cols: [
        ...state[row].cols.slice(0, col),
        { ...state[row].cols[col], value },
        ...state[row].cols.slice(col + 1),
      ],
    },
    ...state.slice(row + 1),
  ];
};
const setSelected = (state, { row, col, selected }) => {
  return [
    ...state.slice(0, row),
    {
      ...state[row],
      cols: [
        ...state[row].cols.slice(0, col),
        { ...state[row].cols[col], selected },
        ...state[row].cols.slice(col + 1),
      ],
    },
    ...state.slice(row + 1),
  ];
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
    case actions.INIT_GRID:
      return prepareRows(payload);
    case actions.SET_VALUE:
      return setValue(state, payload);
    case actions.SELECT_CELL:
    case actions.UNSELECT_CELL:
      return setSelected(state, payload);
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
