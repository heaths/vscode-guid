# Insert GUID

[![Visual Studio Marketplace version](https://img.shields.io/visual-studio-marketplace/v/heaths.vscode-guid.svg?style=flat-square)](https://marketplace.visualstudio.com/items?itemName=heaths.vscode-guid)

A simple command extension for [Visual Studio Code](https://code.visualstudio.com) to insert globally unique identifiers (GUIDs) into the Code text editor in a variety of formats.

![Insert GUID](https://media.giphy.com/media/3danYPtfh3iQBjd6ef/giphy.gif)

This provides the same useful formats as _Create GUID_ that ships with Visual Studio, but without specific language syntaxes for some formats and without unwanted line feeds. Currently, formats supported include:

1. Simple string: `11d4dc2e-375a-4b89-9ad4-aa30105385aa`
2. Registry string: `{11d4dc2e-375a-4b89-9ad4-aa30105385aa}`
3. C structure: `static const struct GUID __NAME__ = {0x11d4dc2e, 0x375a, 0x4b89, {0x9a, 0xd4, 0xaa, 0x30, 0x10, 0x53, 0x85, 0xaa}};`
4. C macro: `DEFINE_GUID(__NAME__, {x11d4dc2e, 0x375a, 0x4b89, 0x9a, 0xd4, 0xaa, 0x30, 0x10, 0x53, 0x85, 0xaa);`
5. Unformatted string: `11d4dc2e375a4b899ad4aa30105385aa`
6. C structure only: `{0x11d4dc2e, 0x375a, 0x4b89, {0x9a, 0xd4, 0xaa, 0x30, 0x10, 0x53, 0x85, 0xaa}}`
7. User-specified formats as [described below](#options)

The token `__NAME__` is easy to replace by double clicking to select every character, unlike `<<name>>` used in the _Create GUID_ tool.

## Installation

You can easily search for and install extensions directly within Code.

1. Open the command palette: __Ctrl+Shift+P__ (__Cmd+Shift+P__ on Mac)
2. Type: Install Extension
3. Type: Insert GUID
4. Press __Enter__ or click the download button to install

Code also makes it easy to update extensions:

1. Open the command palette: __Ctrl+Shift+P__
2. Type: Show Outdated Extensions
3. Press __Enter__ or click the download button to install updates

## Using

Whenever you want to insert a new GUID at the cursor or replace the currently selected text:

1. Open the command palette: __Ctrl+Shift+P__ (__Cmd+Shift+P__ on Mac)
2. Type: Insert GUID
3. Press __Enter__ and select the desired format by typing the number or using the arrow keys.

You can also skip right to step 3 using the default keyboard binding, __Ctrl+Shift+[__. This is more easily remembered as __Ctrl+{__ as with the curly brace used in the registry string format, or as __Cmd+{__ on the Mac.

### Options

You can set different configuration options to control the format of GUIDs that can be inserted.

* insertGuid.showLowercase: Show lowercase GUIDs (with and without braces) when presenting possible GUID formats to insert. The default is `true`.
* insertGuid.showUppercase: Show uppercase GUIDs (with and without braces) when presenting possible GUID formats to insert. The default is `false`.
* insertGuid.showCodeSnippets: Show code snippets for C++ when presenting possible GUID formats to insert. The default is `true`.
* insertGuid.pasteAutomatically: When not empty, paste the GUID in a specified format without showing selection menu. The default is "". The formatting options are:
  * `{b}|{B}` inserts a braced string in lowercase `{b}` or uppercase `{B}` e.g., `{880c86bc-384c-4cce-9e9a-4f760ca755c4}`
  * `{d}|{D}` inserts a hyphenated string in lowercase `{d}` or uppercase `{D}` e.g., `880c86bc-384c-4cce-9e9a-4f760ca755c4`
  * `{n}|{N}` inserts an unformatted string in lowercase `{n}` or uppercase `{N}` e.g., `880c86bc384c4cce9e9a4f760ca755c4`
  * `{x}|{X}` inserts a struct-formatted string in lowercase `{x}` or uppercase `{X}` e.g., `{0x880c86bc,0x384c,0x4cce,{0x9e,0x9a,0x4f,0x76,0x0c,0xa7,0x55,0xc4}}`
  * `{x0}|{X0}` inserts the first four bytes as a hexadecimal string in lowercase `{x0}` or uppercase `{X0}` e.g., `0x880c86bc`
  * `{x1}|{X1}` and `{x2}|{X2}` insert the second and third two bytes as a hexadecimal string in lowercase `{x1}` and `{x2}`, or uppercase `{X1}` and `{X2}` e.g., `0x384c` and `0x4cce`
  * `{x3}|{X3}` through `{x10}|{X10}` insert the subsequent bytes individually as a hexadecimal string in lowercase `{x3}` or uppercase `{X3}` e.g., `0x9e` through `0xc4`.
  * `{nl}` inserts a new line
  * All other characters will be interpreted literally e.g., `new GUID("{D}")` inserts `new GUID("880C86BC-384C-4CCE-9E9A-4F760CA755C4")`

  For example, to generate a `GUID` for the [windows](https://crates.io/crates/windows) crate, you could define:

  ```json
  "const G: ::windows::core::GUID = ::windows::core::GUID {{nl}    data1: 0x{x0},{nl}    data2: 0x{x1},{nl}    data3: 0x{x2},{nl}    data4: [0x{x3}, 0x{x4}, 0x{x5}, 0x{x6}, 0x{x7}, 0x{x8}, 0x{x9}, 0x{x10}],{nl}};"
  ```

  Which would insert a `GUID` like:

  ```rust
  const G: ::windows::core::GUID = ::windows::core::GUID {
      data1: 0x9f0a1b2c,
      data2: 0x4e5f,
      data3: 0x6a7b,
      data4: [0x8c, 0x9d, 0x0e, 0x1f, 0x2a, 0x3b, 0x4c, 0x5d],
  };
  ```

## License

The extension and source are licensed under the [MIT license](LICENSE.txt).
