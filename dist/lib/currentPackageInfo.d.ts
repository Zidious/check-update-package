import type { CurrentPackageInfoParams, CurrentPackageInfoReturn } from "./types";
/**
 * Get the current info for a package
 * @returns - The current package version, whether or not it's a devDependency, and the package manager
 */
declare const currentPackageInfo: ({ packageDirectory, packageName, }: CurrentPackageInfoParams) => Promise<CurrentPackageInfoReturn>;
export default currentPackageInfo;
