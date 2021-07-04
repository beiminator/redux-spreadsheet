import { useDispatch, useSelector } from "react-redux";
import ColMarkerComponent from "./col-marker";
import {
  maxRows,
  selectColMarker,
  markRangeAsSelected,
  markRangeAsNotSelected,
  removeFocus,
  getRange,
  getFocus,
} from "../../model";
function ColMarker({ text, col }) {
  const marker = useSelector((state) => selectColMarker(state, { col }));
  const totalRows = useSelector(maxRows);
  const csr = useSelector(getRange);
  const currentFocus = useSelector(getFocus);
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(removeFocus(currentFocus.row, currentFocus.col));
    dispatch(markRangeAsNotSelected(csr.row1, csr.col1, csr.row2, csr.col2));
    dispatch(markRangeAsSelected(0, col, totalRows - 1, col));
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
