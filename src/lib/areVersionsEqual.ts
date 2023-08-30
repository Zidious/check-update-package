/**
 * Compares two versions to see if they are equal
 * @param versionA The first version to compare
 * @param versionB The second version to compare
 * @returns Whether or not the versions are equal
 */

const areVersionsEqual = (versionA: string, versionB: string): boolean => {
  const a = versionA.split(".").map((v) => parseInt(v));
  const b = versionB.split(".").map((v) => parseInt(v));

  if (a.length !== b.length) {
    return false;
  }

  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }

  return true;
};

export default areVersionsEqual;
