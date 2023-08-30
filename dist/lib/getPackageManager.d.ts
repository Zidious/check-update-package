export declare enum PackageManager {
    NPM = "npm",
    YARN = "yarn"
}
/**
 * Get the package manager either NPM or Yarn
 * @param packageJsonPath The path to the package.json file
 * @returns PackageManager The package manager used by the package
 */
export declare const getPackageManager: (packageJsonPath: string) => PackageManager;
export default getPackageManager;
