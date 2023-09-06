import fs from "fs";
import path from "path";
import { LockFile, PackageManager } from "./types";

/**
 * Get the package manager either NPM or Yarn
 * @param packageJsonPath The path to the package.json file
 * @returns PackageManager The package manager used by the package
 */

export const getPackageManager = (packageJsonPath?: string): PackageManager => {
  const yarnLock = packageJsonPath
    ? path.join(packageJsonPath, LockFile.YARN)
    : LockFile.YARN;
  const packageLock = packageJsonPath
    ? path.join(packageJsonPath, LockFile.NPM)
    : LockFile.NPM;

  if (fs.existsSync(yarnLock)) {
    return PackageManager.YARN;
  } else if (fs.existsSync(packageLock)) {
    return PackageManager.NPM;
  } else {
    throw new Error(
      "Unable to determine the package manager. Make sure either yarn.lock or package-lock.json exists in the package directory...",
    );
  }
};

export default getPackageManager;
