import { colRangeToString } from "./range";
describe("Range Helper", () => {
  it("should convert a number into letter", () => {
    // given
    const col1 = 1;
    const expectedString1 = "A";

    const col2 = 26;
    const expectedString2 = "Z";

    const col3 = 27;
    const expectedString3 = "AA";

    // when
    const res1 = colRangeToString(col1);
    const res2 = colRangeToString(col2);
    const res3 = colRangeToString(col3);

    // then
    expect(res1).toBe(expectedString1);
    expect(res2).toBe(expectedString2);
    expect(res3).toBe(expectedString3);
  });
});
