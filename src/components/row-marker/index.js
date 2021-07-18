import { useSelector, useDispatch } from "react-redux";
import RowMarkerComponent from "./row-marker";
import {
  removeFocus,
  markRangeAsNotSelected,
  markRangeAsSelected,
} from "../../model/grid.slice";
import {
  selectRowMarker,
  maxCols,
  getFocus,
  getRange,
} from "../../model/selectors";
function RowMarker({ row, style, text }) {
  const marker = useSelector((state) => selectRowMarker(state, { row }));
  const totalCols = useSelector(maxCols);
  const csr = useSelector(getRange);
  const currentFocus = useSelector(getFocus);
  const dispatch = useDispatch();
  const handleClick = () => {
    const { row1, col1, row2, col2 } = csr;
    dispatch(removeFocus({ row: currentFocus.row, col: currentFocus.col }));
    dispatch(markRangeAsNotSelected({ row1, col1, row2, col2 }));
    dispatch(
      markRangeAsSelected({
        row1: row,
        col1: 0,
        row2: row,
        col2: totalCols - 1,
      })
    );
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
