import { useDispatch, useSelector } from "react-redux";
import {
  getFocus,
  removeFocus,
  selectCell,
  setFocus,
  setValue,
  cellDimensions,
  thereIsFocus,
  markCellAsSelected,
} from "../../model";
import CellComponent from "./cell";

function Cell({ row, col }) {
  const cell = useSelector((state) => selectCell(state, { row, col }));
  const dimensions = useSelector((state) =>
    cellDimensions(state, { row, col })
  );
  const currentFocus = useSelector(getFocus);
  const gridHasFocus = useSelector(thereIsFocus);
  const dispatch = useDispatch();
  const handleClick = () => {
    if (row !== currentFocus.row || col !== currentFocus.col)
      dispatch(removeFocus(currentFocus.row, currentFocus.col));
    if (!gridHasFocus) {
      dispatch(markCellAsSelected(row, col));
    }
  };
  const handleDoubleClick = () => {
    dispatch(removeFocus(currentFocus.row, currentFocus.col));
    dispatch(setFocus(row, col));
  };
  const handleChange = (e) => {
    dispatch(setValue(row, col, e.target.value));
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
