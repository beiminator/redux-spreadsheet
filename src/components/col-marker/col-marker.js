function ColMarker({ markerModel, text }) {
  return (
    <td className={`marker ${markerModel.selected ? "marker-selected" : ""}`}>
      {text}
    </td>
  );
}
export default ColMarker;
