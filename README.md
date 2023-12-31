# check-update-package

A GitHub Action to check if a package has an update available and install it so that it can be used in subsequent steps i.e. running tests on nightly builds.

## Inputs

| Name              | Description                                  | Required | Default |
| ----------------- | -------------------------------------------- | -------- | ------- |
| package_name      | The name of the package to check for updates | true     | NA      |
| package_directory | The directory where the package is installed | false    | root    |

## Usage

```yaml
name: Check for updates

on:
  schedule:
    - cron: "0 0 13 * *"

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 20
      - uses: zidious/check-update-package@v1
        with:
          package_name: "cypress"
```
