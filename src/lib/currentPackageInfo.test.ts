import "mocha";
import { assert } from "chai";
import currentPackageInfo from "./currentPackageInfo";

describe("currentPackageInfo", () => {
  describe("when the package is a dependency", () => {
    it("should return the correct info", async () => {
      const result = await currentPackageInfo({
        packageDirectory: "src",
        packageName: "chai",
      });
      assert.equal(result.packageManager, "yarn");
      assert.equal(result.packageVersion, "^4.3.8");
      assert.isFalse(result.isDevDependency);
    });
  });

  describe("when the package is a devDependency", () => {
    it("should return the correct info", async () => {
      const result = await currentPackageInfo({
        packageDirectory: "src",
        packageName: "mocha",
      });
      assert.equal(result.packageManager, "yarn");
      assert.equal(result.packageVersion, "^10.2.0");
      assert.isTrue(result.isDevDependency);
    });
  });

  describe("when the package is not a dependency or devDependency", () => {
    it("should throw an error", async () => {
      try {
        await currentPackageInfo({
          packageDirectory: "src",
          packageName: "not-a-package",
        });
        assert.fail("Should have thrown an error");
      } catch (error) {
        assert.equal(
          (error as Error).message,
          "Unable to find not-a-package in package.json. Make sure it's installed as a dependency or devDependency",
        );
      }
    });
  });

  describe("when the package.json file does not exist", () => {
    it("should throw an error", async () => {
      try {
        await currentPackageInfo({
          packageDirectory: "random",
          packageName: "chai",
        });
        assert.fail("Should have thrown an error");
      } catch (error) {
        assert.equal(
          (error as Error).message,
          "Unable to find package.json in src",
        );
      }
    });
  });
});
