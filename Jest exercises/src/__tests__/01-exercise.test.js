import { add } from "../utils/numbers";

/**
 * Finish the test so that it checks if the result
 * of calling the add function with the arguments of
 * 2 and 4 is 6
 */
describe("01-exercise", () => {
  test("add return the sum of the numbers", () => {
    expect.assertions(1);

    expect(add(2,4)).toBe(6);

    // Finish the test
  });
});
