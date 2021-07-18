import { useDispatch, useSelector } from "react-redux";
import {
  removeFocus,
  setFocus,
  setValue,
  markCellAsSelected,
  markRangeAsNotSelected,
} from "../../model/grid.slice";
import {
  getRange,
  selectCell,
  getFocus,
  cellDimensions,
  thereIsFocus,
} from "../../model/selectors";
import CellComponent from "./cell";

function Cell({ row, col }) {
  const cell = useSelector((state) => selectCell(state, { row, col }));
  const dimensions = useSelector((state) =>
    cellDimensions(state, { row, col })
  );
  const currentFocus = useSelector(getFocus);
  const gridHasFocus = useSelector(thereIsFocus);
  const csr = useSelector(getRange);
  const dispatch = useDispatch();
  const handleClick = () => {
    if (row !== currentFocus.row || col !== currentFocus.col)
      dispatch(removeFocus({ row: currentFocus.row, col: currentFocus.col }));
    if (!gridHasFocus) {
      const { row1, col1, row2, col2 } = csr;
      dispatch(markRangeAsNotSelected({ row1, col1, row2, col2 }));
      dispatch(markCellAsSelected({ row, col }));
    }
  };
  const handleDoubleClick = () => {
    dispatch(removeFocus({ row: currentFocus.row, col: currentFocus.col }));
    dispatch(setFocus({ row, col }));
  };
  const handleChange = (e) => {
    dispatch(setValue({ row, col, value: e.target.value }));
  };
  return (
    <CellComponent
      cellModel={{
        ...cell,
        height: dimensions.height,
        width: dimensions.width,
      }}
      handleClick={handleClick}
      handleDoubleClick={handleDoubleClick}
      handleChange={handleChange}
    />
  );
}

export default Cell;
