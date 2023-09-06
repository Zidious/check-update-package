import { PackageManager } from "./types";
/**
 * Get the latest version of a package
 * @param package_name The name of the package
 * @param package_manager The package manager to use
 * @returns The latest version of the package
 */
declare const getLatestPackageVersion: (package_name: string, package_manager: PackageManager) => Promise<string>;
export default getLatestPackageVersion;
