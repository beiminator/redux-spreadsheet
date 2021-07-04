function RowMarker({ markerModel, style, text }) {
  return (
    <td
      className={`marker ${markerModel.selected ? "marker-selected" : ""}`}
      style={style}
    >
      {text}
    </td>
  );
}

export default RowMarker;
