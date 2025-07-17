import { average } from "#utils/for_testing.js";
import assert from "node:assert";
import test, { describe } from "node:test";

await describe("average", async () => {
  await test("average of [1]", () => {
    const result = average([1]);

    assert.strictEqual(result, 1);
  });

  await test("of many is calculated right", () => {
    assert.strictEqual(average([1, 2, 3, 4, 5, 6]), 3.5);
  });

  await test("of empty array is zero", () => {
    assert.strictEqual(average([]), 0);
  });
});
