import "mocha";
import { assert } from "chai";
import areVersionsEqual from "./areVersionsEqual";

describe("areVersionsEqual", () => {
  describe("when the versions are equal", () => {
    it("should return true", () => {
      assert.isTrue(areVersionsEqual("1.0.0", "1.0.0"));
      assert.isTrue(areVersionsEqual("v1.0.0", "1.0.0"));
      assert.isTrue(areVersionsEqual("v1.0.0", "1"));
    });
  });

  describe("when the versions are not equal", () => {
    it("should return false", () => {
      assert.isFalse(areVersionsEqual("1.0.0", "v1.0.1"));
      assert.isFalse(areVersionsEqual("1.0.0", "1.1.0"));
      assert.isFalse(areVersionsEqual("1.0.0", "2"));
    });
  });
});
