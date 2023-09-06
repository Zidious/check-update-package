import { compareVersions } from "compare-versions";

/**
 * Compares two versions to see if they are equal
 * @param versionA The first version to compare
 * @param versionB The second version to compare
 * @returns Whether or not the versions are equal
 */

const areVersionsEqual = (versionA: string, versionB: string): boolean => {
  return compareVersions(versionA, versionB) === 0;
};

export default areVersionsEqual;
