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
  const path = `${packageDirectory}/package.json`;
  const doesExist = fs.existsSync(path);

  if (!doesExist) {
    throw new Error(`Unable to find package.json in ${packageDirectory}`);
  }

  const packageJson = fs.readFileSync(path, "utf8");
  const packageJsonParsed = JSON.parse(packageJson) as PackageJsonProps;

  let packageVersion: string | null = null;
  let isDevDependency = false;

  if (packageJsonParsed.dependencies[packageName]) {
    packageVersion = packageJsonParsed.dependencies[packageName];
  } else if (packageJsonParsed.devDependencies[packageName]) {
    packageVersion = packageJsonParsed.devDependencies[packageName];
    isDevDependency = true;
  } else {
    throw new Error(
      `Unable to find ${packageName} in package.json. Make sure it's installed as a dependency or devDependency`,
    );
  }

  const packageManager = getPackageManager(packageDirectory);

  return {
    packageVersion,
    isDevDependency,
    packageManager,
  };
};

export default currentPackageInfo;
