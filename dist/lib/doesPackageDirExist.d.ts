/**
 *
 * @param package_directory The directory of the package to check updates for (default: root)
 * @returns Whether or not the package directory exists
 */
declare const doesPackageDirExist: (package_directory: string) => boolean;
export default doesPackageDirExist;
