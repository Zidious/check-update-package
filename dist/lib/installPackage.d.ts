import { PackageManager } from "./getPackageManager";
interface InstallPackageParams {
    packageName: string;
    packageVersion: string;
    packageManager: PackageManager;
    isDevDependency: boolean;
}
declare const installPackage: ({ packageName, packageVersion, packageManager, isDevDependency, }: InstallPackageParams) => Promise<void>;
export default installPackage;
