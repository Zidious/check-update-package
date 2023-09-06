import { type InstallPackageParams } from "./types";
declare const installPackage: ({ packageName, packageVersion, packageManager, isDevDependency, }: InstallPackageParams) => Promise<void>;
export default installPackage;
