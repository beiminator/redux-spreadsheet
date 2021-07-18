import { useDispatch, useSelector } from "react-redux";
import ColMarkerComponent from "./col-marker";
import {
  markRangeAsSelected,
  markRangeAsNotSelected,
  removeFocus,
} from "../../model/grid.slice";
import {
  selectColMarker,
  maxRows,
  getRange,
  getFocus,
} from "../../model/selectors";
function ColMarker({ text, col }) {
  const marker = useSelector((state) => selectColMarker(state, { col }));
  const totalRows = useSelector(maxRows);
  const csr = useSelector(getRange);
  const currentFocus = useSelector(getFocus);
  const dispatch = useDispatch();
  const handleClick = () => {
    const { row1, col1, row2, col2 } = csr;
    dispatch(removeFocus({ row: currentFocus.row, col: currentFocus.col }));
    dispatch(markRangeAsNotSelected({ row1, col1, row2, col2 }));
    dispatch(
      markRangeAsSelected({
        row1: 0,
        col1: col,
        row2: totalRows - 1,
        col2: col,
      })
    );
  };
  return (
    <ColMarkerComponent
      text={text}
      key={"CInner_" + col}
      markerModel={marker}
      handleClick={handleClick}
    />
  );
}
export default ColMarker;
