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
          value={model.value}
        />
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
    <td
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      className="cell"
    >
      {renderInner(model)}
    </td>
  );
}

export default Cell;
