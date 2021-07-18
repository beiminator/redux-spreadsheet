import CommandBar from "../command-bar";
import StatusBar from "../status-bar";
import Grid from "../grid";
function WorkArea() {
  return (
    <>
      <h1>this is my first sheet</h1>
      <CommandBar />
      <Grid key={"G1"} />
      <StatusBar />
    </>
  );
}

export default WorkArea;
