import RangeComponent from "./range";
import { getRange } from "../../../model/selectors";
import { useSelector } from "react-redux";
function Range() {
  const { row1, col1, row2, col2 } = useSelector(getRange);
  return <RangeComponent row1={row1} col1={col1} row2={row2} col2={col2} />;
}

export default Range;
