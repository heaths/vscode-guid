# Contributing

Contributions are welcome.

Backward compatibility of the user experience (UX) is important. This extension was designed to be fast and simple - built right into users' workflow unlike the original "Insert GUID" that shipped with Visual Studio I sought to improve and replace. So any changes to bindings or menu order should be avoided unless the user has to opt into new behavior through, for example, changing settings to non-default values.

Recommendations from `.editorconfig` and linting results should be respected, though there are few.

Be sure to add an entry to the [CHANGELOG.md](CHANGELOG.md)! For bug fixes, please link to the original issue.

## Prerequisites

* [Node.js 18](https://nodejs.org)
* [Visual Studio Code](https://code.visualstudio.com)

You can also open this repository in a [devcontainer](https://code.visualstudio.com/docs/devcontainers/containers) in Visual Studio Code or in [GitHub Codespaces](https://code.visualstudio.com/docs/remote/codespaces).

## Building

NPM should install everything required to build and test on Windows and macOS. Linux requires running X11 to test and debug, though you're welcome to open this project in a [devcontainer](https://code.visualstudio.com/docs/remote/containers) that will start the X virtual framebuffer (Xvfb) automatically.

1. Install dependencies:

   ```bash
   npm i
   ```

2. Build:

   ```bash
   npm run compile
   ```

3. Run tests:

   ```bash
   npm run test
   ```

   You can run and debug tests in Code by running **Launch Tests** in the **Run** (formerly **Debug**) view.

## Versioning

Versioning is done manually using `npm version` prior to a release by updating the package version in `package.json`. Previously it was done automatically, but often times would skip a significant range of patch versions.
