import * as core from "@actions/core";
import { getPackageManager } from "./getPackageManager";
import fs from "fs";
import type {
  CurrentPackageInfoParams,
  CurrentPackageInfoReturn,
  PackageJsonProperties,
} from "./types";

/**
 * Get the current info for a package
 * @returns - The current package version, whether or not it's a devDependency, and the package manager
 */

const currentPackageInfo = async ({
  packageDirectory,
  packageName,
}: CurrentPackageInfoParams): Promise<CurrentPackageInfoReturn> => {
  if (!fs.existsSync("package.json")) {
    throw new Error(`Unable to find package.json in ${packageDirectory}`);
  }

  const packageJson = fs.readFileSync("package.json", "utf8");
  const packageJsonParsed = JSON.parse(packageJson) as PackageJsonProperties;
  const dep = packageJsonParsed.dependencies?.[packageName];
  const devDep = packageJsonParsed.devDependencies?.[packageName];

  let packageVersion: string | null = null;
  let isDevDependency = false;

  if (dep) {
    packageVersion = dep;
  } else if (devDep) {
    packageVersion = devDep;
    isDevDependency = true;
  } else {
    throw new Error(
      `Unable to find ${packageName} in package.json. Make sure it's installed as a dependency or devDependency`,
    );
  }

  const packageManager = getPackageManager();

  core.info(`packageManager: ${packageManager}`);
  return {
    packageVersion,
    isDevDependency,
    packageManager,
  };
};

export default currentPackageInfo;
