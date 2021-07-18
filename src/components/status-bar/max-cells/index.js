import { maxRows, maxCols } from "../../../model/selectors";
import { useSelector } from "react-redux";
import MaxCellsComponent from "./max-cells";

function MaxCells() {
  const cols = useSelector(maxCols);
  const rows = useSelector(maxRows);
  return <MaxCellsComponent maxRows={rows} maxCols={cols} />;
}

export default MaxCells;
