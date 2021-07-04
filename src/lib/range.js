const START_CHAR = 65;
const NUM_OF_LETTERS = 26;
export const getAlphaColumn = (i) => {
  return String.fromCharCode(START_CHAR + i);
};

export const colRangeToString = (num) => {
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

function numToSSColumn(num) {
  let s = "",
    t;

  while (num > 0) {
    t = (num - 1) % 26;
    s = String.fromCharCode(65 + t) + s;
    num = ((num - t) / 26) | 0;
  }
  return s || undefined;
}
