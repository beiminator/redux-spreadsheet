import CommandBar from "../command-bar";
import Grid from "../grid";
function WorkArea() {
  return (
    <>
      <h1>this is my first sheet</h1>
      <CommandBar />
      <Grid key={"G1"} />
    </>
  );
}

export default WorkArea;
