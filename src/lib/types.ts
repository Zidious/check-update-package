export interface PackageJsonProperties {
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
}

export interface CurrentPackageInfoParams {
  packageDirectory: string;
  packageName: string;
}

export interface CurrentPackageInfoReturn {
  packageVersion: string;
  isDevDependency: boolean;
  packageManager: PackageManager;
}

export enum PackageManager {
  NPM = "npm",
  YARN = "yarn",
}

export enum LockFile {
  NPM = "package-lock.json",
  YARN = "yarn.lock",
}

export interface InstallPackageParams {
  packageName: string;
  packageVersion: string;
  packageManager: PackageManager;
  isDevDependency: boolean;
}
