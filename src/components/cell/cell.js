import "./cell.css";
function Cell({ cellModel, handleClick, handleDoubleClick, handleChange }) {
  //("dimensions", dimensions);
  const renderInner = (model) => {
    if (cellModel.focus) {
      return (
        <textarea
          autoFocus
          style={{
            height: cellModel.height - 2,
            width: cellModel.width - 2,
          }}
          onChange={handleChange}
          value={cellModel.value}
        />
      );
    } else {
      return (
        <span
          className={cellModel.selected ? "cell-selected" : ""}
          style={{ height: cellModel.height - 2, width: cellModel.width - 2 }}
        >
          {cellModel.value}
        </span>
      );
    }
  };
  return (
    <td
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      className={`cell ${cellModel.selected ? "cell-selected" : ""}`}
    >
      {renderInner(cellModel)}
    </td>
  );
}

export default Cell;
