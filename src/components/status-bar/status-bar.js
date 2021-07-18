import "./status-bar.css";
import Range from "./range";
import MaxCells from "./max-cells";
function StatusBar() {
  return (
    <div className={"status-bar"}>
      <Range />
      <MaxCells />
    </div>
  );
}
export default StatusBar;
