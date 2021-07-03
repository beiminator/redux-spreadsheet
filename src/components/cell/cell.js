import "./cell.css";
function Cell({ dimensions }) {
  //("dimensions", dimensions);
  return (
    <div
      style={{ height: dimensions.height, width: dimensions.width }}
      className="cell"
    >
      <span>Ciao Mondo!</span>
    </div>
  );
}

export default Cell;
