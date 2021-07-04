const START_CHAR = 65;
const NUM_OF_LETTERS = 26;
export const getAlphaColumn = (i) => {
  return String.fromCharCode(START_CHAR + i);
};

export const colRangeToString = (i) => {
  if (i / NUM_OF_LETTERS > 1) return String.fromCharCode(START_CHAR);
  return String.fromCharCode(START_CHAR + i - 1);
};
