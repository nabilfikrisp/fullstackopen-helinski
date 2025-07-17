import assert from "node:assert";
import { describe, test } from "node:test";

import { reverse } from "../utils/for_testing.js";

await describe("reverse", async () => {
  await test("reverse of a", () => {
    const result = reverse("a");

    assert.strictEqual(result, "a");
  });

  await test("reverse of react", () => {
    const result = reverse("react");

    assert.strictEqual(result, "tcaer");
  });

  await test("reverse of saippuakauppias", () => {
    const result = reverse("saippuakauppias");

    assert.strictEqual(result, "saippuakauppias");
  });
});
