import * as exec from "@actions/exec";
import { type InstallPackageParams, PackageManager } from "./types";

const installPackage = async ({
  packageName,
  packageVersion,
  packageManager,
  isDevDependency,
}: InstallPackageParams): Promise<void> => {
  const command = packageManager === PackageManager.NPM ? "npm" : "yarn";
  const subCommand = packageManager === PackageManager.NPM ? "install" : "add";
  const args = isDevDependency ? [subCommand, "-D"] : [subCommand];

  await exec.exec(command, [...args, `${packageName}@${packageVersion}`]);
};

export default installPackage;
