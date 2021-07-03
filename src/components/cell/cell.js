import "./cell.css";
function Cell({ model, handleClick }) {
  //("dimensions", dimensions);
  const renderInner = (cell) => {
    if (model.focus) {
      return (
        <textarea
          autoFocus
          className="cell"
          style={{ height: model.height - 2, width: model.width - 2 }}
        />
      );
    } else {
      return <span>Ciao Mondo!</span>;
    }
  };
  return (
    <div
      style={{ height: model.height, width: model.width }}
      onClick={handleClick}
      className="cell"
    >
      {renderInner(model)}
    </div>
  );
}

export default Cell;
