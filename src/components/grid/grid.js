import RowMarker from "../row-marker";
import ColMarker from "../col-marker";
import Cell from "../cell";
import { useSelector } from "react-redux";
import { maxCols, rowHeights } from "../../model/selectors";
import { convertNumberToLetter } from "../../lib/utils";
function Grid({ rows }) {
  const totalCols = useSelector(maxCols);
  const heights = useSelector(rowHeights);
  return (
    <table>
      <tbody>
        <tr key="CMS">
          <td></td>
          {Array.apply(null, { length: totalCols }).map((_, i) => (
            <ColMarker
              col={i}
              text={convertNumberToLetter(i + 1)}
              key={"CM_" + i}
            />
          ))}
        </tr>
        {rows.map(({ cols }, row) => {
          return (
            <tr style={{ height: heights[row] }} key={"R1_" + row}>
              <RowMarker key={"RM_" + row} text={row + 1} row={row} />
              {cols.map((colItem, col) => {
                return <Cell row={row} col={col} key={colItem.id} />;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
export default Grid;
