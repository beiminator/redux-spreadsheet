import GridComponent from "./grid";
import { initGrid } from "../../model/grid.slice";
import { selectRows } from "../../model/selectors";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
function Grid() {
  const rows = useSelector(selectRows);
  const dispatch = useDispatch();
  const prepareGrid = () => {
    dispatch(initGrid({ rows: 3, cols: 5 }));
  };
  useEffect(() => {
    prepareGrid();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <GridComponent rows={rows} />;
}
export default Grid;
