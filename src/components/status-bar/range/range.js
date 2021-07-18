import * as rangeUtils from "../../../lib/utils";

function Range({ row1, col1, row2, col2 }) {
  return (
    <span className={"status-bar-component"}>
      Selected Range{" "}
      {col1 >= 0 ? rangeUtils.convertNumberToLetter(col1 + 1) : "-"}
      {row1 >= 0 ? row1 + 1 : "-"}:
      {col2 >= 0 ? rangeUtils.convertNumberToLetter(col2 + 1) : "-"}
      {row2 >= 0 ? row2 + 1 : "-"}
    </span>
  );
}

export default Range;
