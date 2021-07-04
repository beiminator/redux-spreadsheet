function ColMarker({ markerModel, text, handleClick }) {
  return (
    <td
      className={`marker ${markerModel.selected ? "marker-selected" : ""}`}
      onClick={handleClick}
    >
      {text}
    </td>
  );
}
export default ColMarker;
