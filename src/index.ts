import * as core from "@actions/core";
import doesPackageDirExist from "./lib/doesPackageDirExist";
import getLatestPackageVersion from "./lib/getLatestPackageVersion";
import currentPackageInfo from "./lib/currentPackageInfo";
import areVersionsEqual from "./lib/areVersionsEqual";
import installPackage from "./lib/installPackage";

const main = async () => {
  const packageName = core.getInput("package_name");
  const packageDirectory = core.getInput("package_directory");

  if (!packageName) {
    core.setFailed("`package_name` is required");
    return;
  }

  if (!doesPackageDirExist(packageDirectory)) {
    core.setFailed("`package_directory` does not exist");
    return;
  }

  core.info(`Checking for updates for ${packageName}...`);

  const { packageVersion, isDevDependency, packageManager } =
    await currentPackageInfo({
      packageDirectory,
      packageName,
    });

  const latestVersion = await getLatestPackageVersion(
    packageName,
    packageManager,
  );

  const isLatest = areVersionsEqual(packageVersion, latestVersion);

  if (isLatest) {
    core.info(
      `The package ${packageName} is up to date at version ${packageVersion}...`,
    );
    return;
  }

  core.info(
    `The package ${packageName} is out of date at version ${packageVersion}. The latest version is ${latestVersion}. Updating...`,
  );

  await installPackage({
    packageName,
    packageVersion: latestVersion,
    packageManager,
    isDevDependency,
  });
};

main().catch((error) => {
  core.setFailed(error.message);
});
