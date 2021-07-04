import "./cell.css";
function Cell({ model, handleClick, handleDoubleClick, handleChange }) {
  //("dimensions", dimensions);
  const renderInner = (model) => {
    if (model.focus) {
      return (
        <textarea
          autoFocus
          style={{
            height: model.height - 2,
            width: model.width - 2,
          }}
          onChange={handleChange}
        >
          {model.value}
        </textarea>
      );
    } else {
      return (
        <span style={{ height: model.height - 2, width: model.width - 2 }}>
          {model.value}
        </span>
      );
    }
  };
  return (
    <div
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      className="cell"
    >
      {renderInner(model)}
    </div>
  );
}

export default Cell;
