import { useDispatch, useSelector } from "react-redux";
import { currentFocus, removeFocus, selectCell, setFocus } from "../../model";
import CellComponent from "./cell";

function Cell({ row, col }) {
  const cell = useSelector((state) => selectCell(state, { row, col }));
  const getFocus = useSelector(currentFocus);
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(removeFocus(getFocus.row, getFocus.col));
    dispatch(setFocus(row, col));
  };
  return <CellComponent model={cell} handleClick={handleClick} />;
}

export default Cell;
