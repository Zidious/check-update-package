import fs from "fs";

/**
 *
 * @param package_directory The directory of the package to check updates for (default: root)
 * @returns Whether or not the package directory exists
 */

const doesPackageDirExist = (package_directory: string): boolean => {
  return fs.existsSync(package_directory);
};

export default doesPackageDirExist;
