import { useDispatch, useSelector } from "react-redux";
import {
  getRange,
  addRowBefore,
  addRowAfter,
  addColBefore,
  addColAfter,
  removeRowBefore,
  removeRowAfter,
  removeColBefore,
  removeColAfter,
} from "../../model";
import { NO_RANGE } from "../../model/range";
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
      dispatch(addRowBefore(currentRange.row1));
    } else if (checkDirection() === 2) {
      dispatch(addColBefore(currentRange.col1));
    } else {
      alert(selValidRange);
    }
  };
  const handleAddAfter = () => {
    if (currentRange === NO_RANGE) {
      alert(selRange);
    }
    if (checkDirection() === 1) {
      dispatch(addRowAfter(currentRange.row1));
    } else if (checkDirection() === 2) {
      dispatch(addColAfter(currentRange.col1));
    } else {
      alert(selValidRange);
    }
  };
  const handleRemoveBefore = () => {
    if (currentRange === NO_RANGE) {
      alert(selRange);
    }
    if (checkDirection() === 1) {
      dispatch(removeRowBefore(currentRange.row1));
    } else if (checkDirection() === 2) {
      dispatch(removeColBefore(currentRange.col1));
    } else {
      alert(selValidRange);
    }
  };
  const handleRemoveAfter = () => {
    if (currentRange === NO_RANGE) {
      alert(selRange);
    }
    if (checkDirection() === 1) {
      dispatch(removeRowAfter(currentRange.row1));
    } else if (checkDirection() === 2) {
      dispatch(removeColAfter(currentRange.col1));
    } else {
      alert(selValidRange);
    }
  };
  return (
    <CommandBarComponent
      handleAddBefore={handleAddBefore}
      handleAddAfter={handleAddAfter}
      handleRemoveBefore={handleRemoveBefore}
      handleRemoveAfter={handleRemoveAfter}
    />
  );
}

export default CommandBar;
