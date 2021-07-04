import { useSelector, useDispatch } from "react-redux";
import RowMarkerComponent from "./row-marker";
import {
  selectRowMarker,
  maxCols,
  getFocus,
  getRange,
  removeFocus,
  markRangeAsNotSelected,
  markRangeAsSelected,
} from "../../model";

function RowMarker({ row, style, text }) {
  const marker = useSelector((state) => selectRowMarker(state, { row }));
  const totalCols = useSelector(maxCols);
  const csr = useSelector(getRange);
  const currentFocus = useSelector(getFocus);
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(removeFocus(currentFocus.row, currentFocus.col));
    dispatch(markRangeAsNotSelected(csr.row1, csr.col1, csr.row2, csr.col2));
    dispatch(markRangeAsSelected(row, 0, row, totalCols - 1));
  };
  return (
    <RowMarkerComponent
      style={style}
      text={text}
      markerModel={marker}
      handleClick={handleClick}
    />
  );
}

export default RowMarker;
