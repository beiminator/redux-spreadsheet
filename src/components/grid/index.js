import GridComponent from "./grid";
import { selectRows, initGrid, addColAfter, addRowAfter } from "../../model";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
function Grid() {
  const rows = useSelector(selectRows);
  const dispatch = useDispatch();
  const prepareGrid = () => {
    dispatch(initGrid(3, 5));
  };
  useEffect(() => {
    prepareGrid();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <GridComponent rows={rows} />;
}
export default Grid;
