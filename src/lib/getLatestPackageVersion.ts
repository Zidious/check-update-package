import * as exec from "@actions/exec";
import { PackageManager } from "./types";

/**
 * Get the latest version of a package
 * @param package_name The name of the package
 * @param package_manager The package manager to use
 * @returns The latest version of the package
 */

const getLatestPackageVersion = async (
  package_name: string,
  package_manager: PackageManager,
): Promise<string> => {
  const packageManager =
    package_manager === PackageManager.NPM ? "npm" : "yarn";
  const viewCommand = package_manager === PackageManager.NPM ? "view" : "info";
  const output = await exec.getExecOutput(packageManager, [
    viewCommand,
    package_name,
    "version",
  ]);

  // get the 2nd line of the output, which is the latest version
  return output.stdout.trim().split("\n")[1];
};

export default getLatestPackageVersion;
