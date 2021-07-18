const START_CHAR = 65;
const NUM_OF_LETTERS = 26;

let counter, currentTime;

export const convertNumberToLetter = (num) => {
  let s = "",
    t;

  while (num > 0) {
    t = (num - 1) % NUM_OF_LETTERS;
    s = String.fromCharCode(START_CHAR + t) + s;
    num = ((num - t) / NUM_OF_LETTERS) | 0;
  }
  return s || undefined;
};

export function convertLetterToNumber(str) {
  str = str.toUpperCase();
  let out = 0,
    len = str.length;
  for (let pos = 0; pos < len; pos++) {
    out +=
      (str.charCodeAt(pos) - START_CHAR - 1) *
      Math.pow(NUM_OF_LETTERS, len - pos - 1);
  }
  return out;
}

export const genCellId = () => {
  const time = new Date().getTime();
  let padded = "000";
  if (currentTime === time) {
    counter++;
    padded = ("" + counter).padStart(3, "0");
  } else {
    counter = 0;
    currentTime = time;
  }
  return "" + currentTime + "_" + padded;
};
