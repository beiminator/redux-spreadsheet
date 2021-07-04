import { useSelector } from "react-redux";
import ColMarkerComponent from "./col-marker";
import { selectColMarker } from "../../model";
function ColMarker({ text, col }) {
  const marker = useSelector((state) => selectColMarker(state, { col }));
  return (
    <ColMarkerComponent
      text={text}
      key={"CInner_" + col}
      markerModel={marker}
    />
  );
}
export default ColMarker;
