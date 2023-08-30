import * as exec from "@actions/exec";
import { PackageManager } from "./getPackageManager";

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

  const latestVersion = (
    await exec.getExecOutput(packageManager, [
      viewCommand,
      package_name,
      "version",
    ])
  ).stdout.trim();

  return latestVersion;
};

export default getLatestPackageVersion;
