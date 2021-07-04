function RowMarker({ style, text }) {
  return (
    <td className="marker" style={style}>
      {text}
    </td>
  );
}

export default RowMarker;
