import ColMarkerComponent from "./col-marker";
function ColMarker({ text, col }) {
  return <ColMarkerComponent text={text} key={"CInner_" + col} />;
}
export default ColMarker;
