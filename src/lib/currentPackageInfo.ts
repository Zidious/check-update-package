import * as core from "@actions/core";
import { PackageManager, getPackageManager } from "./getPackageManager";
import fs from "fs";

interface PackageJsonProps {
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
}

interface CurrentPackageInfoParams {
  packageDirectory: string;
  packageName: string;
}

interface CurrentPackageInfoReturn {
  packageVersion: string;
  isDevDependency: boolean;
  packageManager: PackageManager;
}

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
  const packageJsonParsed = JSON.parse(packageJson) as PackageJsonProps;
  const dep = packageJsonParsed.dependencies;
  const devDep = packageJsonParsed.devDependencies;

  // log out everything above
  core.info(`packageJson: ${packageJson}`);
  core.info(`packageJsonParsed: ${packageJsonParsed}`);
  core.info(`dep: ${dep}`);
  core.info(`devDep: ${devDep}`);

  let packageVersion: string | null = null;
  let isDevDependency = false;

  // if (dep) {
  //   packageVersion = dep;
  // } else if (devDep) {
  //   packageVersion = devDep;
  //   isDevDependency = true;
  // } else {
  //   throw new Error(
  //     `Unable to find ${packageName} in package.json. Make sure it's installed as a dependency or devDependency`,
  //   );
  // }

  const packageManager = getPackageManager(packageDirectory);

  return {
    packageVersion: "1",
    isDevDependency,
    packageManager,
  };
};

export default currentPackageInfo;
