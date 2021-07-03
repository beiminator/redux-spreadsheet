import GridComponent from "./grid";
import { selectRows, addColAfter, addRowAfter } from "../../model";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
function Grid() {
  const rows = useSelector(selectRows);
  const dispatch = useDispatch();
  const prepareGrid = () => {
    const interval = setInterval(() => {
      dispatch(addColAfter(0));
      dispatch(addColAfter(0));
      dispatch(addColAfter(0));
      dispatch(addRowAfter(0));
      clearInterval(interval);
    }, 100);
  };
  useEffect(() => {
    prepareGrid();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <GridComponent rows={rows} />;
}
export default Grid;
