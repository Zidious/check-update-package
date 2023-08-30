import * as exec from "@actions/exec";
import { PackageManager } from "./getPackageManager";

interface InstallPackageParams {
  packageName: string;
  packageVersion: string;
  packageManager: PackageManager;
  isDevDependency: boolean;
}

const installPackage = async ({
  packageName,
  packageVersion,
  packageManager,
  isDevDependency,
}: InstallPackageParams): Promise<void> => {
  const packageManagerCommand =
    packageManager === PackageManager.NPM ? "npm" : "yarn";
  const installCommand =
    packageManager === PackageManager.NPM ? "install" : "add";

  const res = await exec.exec(packageManagerCommand, [
    installCommand,
    isDevDependency ? "-D" : "",
    `${packageName}@${packageVersion}`,
  ]);

  if (res !== 0) {
    throw new Error(`Failed to install ${packageName}@${packageVersion}`);
  }
};

export default installPackage;
