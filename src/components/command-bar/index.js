import { useDispatch, useSelector } from "react-redux";
import {
  addRowBefore,
  addRowAfter,
  addColBefore,
  addColAfter,
  removeRowBefore,
  removeRowAfter,
  removeColBefore,
  removeColAfter,
  NO_RANGE,
  removeCurrentRow,
  removeCurrentCol,
} from "../../model/grid.slice";
import { getRange } from "../../model/selectors";
import CommandBarComponent from "./command-bar";

function CommandBar() {
  const selRange = "Select a range before";
  const selValidRange = "Select a valid range before";
  const currentRange = useSelector(getRange);
  const dispatch = useDispatch();

  const checkDirection = () => {
    let direction = 0;
    if (
      currentRange.row1 === currentRange.row2 &&
      currentRange.col1 !== currentRange.col2
    ) {
      direction = 1;
    } else if (
      currentRange.row1 !== currentRange.row2 &&
      currentRange.col1 === currentRange.col2
    ) {
      direction = 2;
    }
    return direction;
  };

  const handleAddBefore = () => {
    if (currentRange === NO_RANGE) {
      alert(selRange);
    }
    if (checkDirection() === 1) {
      dispatch(addRowBefore({ row: currentRange.row1 }));
    } else if (checkDirection() === 2) {
      dispatch(addColBefore({ col: currentRange.col1 }));
    } else {
      alert(selValidRange);
    }
  };
  const handleAddAfter = () => {
    if (currentRange === NO_RANGE) {
      alert(selRange);
    }
    if (checkDirection() === 1) {
      dispatch(addRowAfter({ row: currentRange.row1 }));
    } else if (checkDirection() === 2) {
      dispatch(addColAfter({ col: currentRange.col1 }));
    } else {
      alert(selValidRange);
    }
  };
  const handleRemoveBefore = () => {
    if (currentRange === NO_RANGE) {
      alert(selRange);
    }
    if (checkDirection() === 1) {
      dispatch(removeRowBefore({ row: currentRange.row1 }));
    } else if (checkDirection() === 2) {
      dispatch(removeColBefore({ col: currentRange.col1 }));
    } else {
      alert(selValidRange);
    }
  };
  const handleRemoveCurrent = () => {
    if (currentRange === NO_RANGE) {
      alert(selRange);
    }
    if (checkDirection() === 1) {
      dispatch(removeCurrentRow({ row: currentRange.row1 }));
    } else if (checkDirection() === 2) {
      dispatch(removeCurrentCol({ col: currentRange.col1 }));
    } else {
      alert(selValidRange);
    }
  };
  const handleRemoveAfter = () => {
    if (currentRange === NO_RANGE) {
      alert(selRange);
    }
    if (checkDirection() === 1) {
      dispatch(removeRowAfter({ row: currentRange.row1 }));
    } else if (checkDirection() === 2) {
      dispatch(removeColAfter({ col: currentRange.col1 }));
    } else {
      alert(selValidRange);
    }
  };
  return (
    <CommandBarComponent
      handleAddBefore={handleAddBefore}
      handleAddAfter={handleAddAfter}
      handleRemoveBefore={handleRemoveBefore}
      handleRemoveCurrent={handleRemoveCurrent}
      handleRemoveAfter={handleRemoveAfter}
    />
  );
}

export default CommandBar;
