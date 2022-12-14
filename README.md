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
* insertGuid.pasteAutomatically: When not empty, paste the GUID in a specified format without showing selection menu. The default is "".

## License

The extension and source are licensed under the [MIT license](LICENSE.txt).
