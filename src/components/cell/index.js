import { useDispatch, useSelector } from "react-redux";
import {
  currentFocus,
  removeFocus,
  selectCell,
  setFocus,
  setValue,
  cellDimensions,
} from "../../model";
import CellComponent from "./cell";

function Cell({ row, col }) {
  const cell = useSelector((state) => selectCell(state, { row, col }));
  const dimensions = useSelector((state) =>
    cellDimensions(state, { row, col })
  );
  const getFocus = useSelector(currentFocus);
  const dispatch = useDispatch();
  const handleClick = () => {
    if (row !== getFocus.row || col !== getFocus.col)
      dispatch(removeFocus(getFocus.row, getFocus.col));
  };
  const handleDoubleClick = () => {
    dispatch(removeFocus(getFocus.row, getFocus.col));
    dispatch(setFocus(row, col));
  };
  const handleChange = (e) => {
    dispatch(setValue(row, col, e.target.value));
  };
  return (
    <CellComponent
      model={{ ...cell, height: dimensions.height, width: dimensions.width }}
      handleClick={handleClick}
      handleDoubleClick={handleDoubleClick}
      handleChange={handleChange}
    />
  );
}

export default Cell;
