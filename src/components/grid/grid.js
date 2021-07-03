import Cell from "../cell";
function Grid({ rows }) {
  return (
    <div>
      {rows.map(({ cols, height }, row) => {
        return (
          <div style={{ height }} key={row}>
            {cols.map(({ width, focus }, col) => {
              return (
                <Cell
                  row={row}
                  col={col}
                  dimensions={{ height, width }}
                  focus={focus}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
export default Grid;