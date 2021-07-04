import { useSelector } from "react-redux";
import RowMarkerComponent from "./row-marker";
import { selectRowMarker } from "../../model";

function RowMarker({ row, style, text }) {
  const marker = useSelector((state) => selectRowMarker(state, { row }));
  return <RowMarkerComponent style={style} text={text} markerModel={marker} />;
}

export default RowMarker;
