function RowMarker({ markerModel, style, text, handleClick }) {
  return (
    <td
      className={`marker ${markerModel.selected ? "marker-selected" : ""}`}
      onClick={handleClick}
      style={style}
    >
      {text}
    </td>
  );
}

export default RowMarker;
