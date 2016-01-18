# Insert GUID

A simple command extension for [Visual Studio Code](https://code.visualstudio.com) to insert globally unique identifiers (GUIDs) into the Code text editor in a variety of formats.

![Insert GUID](http://i.giphy.com/3o7rbIgZ9yKCKbwaTm.gif)

This provides the same useful formats as _Create GUID_ that ships with Visual Studio, but without specific language syntaxes for some formats and without unwanted line feeds. Currently, formats supported include:

* String: `11d4dc2e-375a-4b89-9ad4-aa30105385aa`
* Registry `{11d4dc2e-375a-4b89-9ad4-aa30105385aa}`
* C structure: `static const struct GUID __NAME__ = {0x11d4dc2e, 0x375a, 0x4b89, {0x9a, 0xd4, 0xaa, 0x30, 0x10, 0x53, 0x85, 0xaa}};`
* C macro: `DEFINE_GUID(__NAME__, {x11d4dc2e, 0x375a, 0x4b89, 0x9a, 0xd4, 0xaa, 0x30, 0x10, 0x53, 0x85, 0xaa);`

The token `__NAME__` is easy to replace by double clicking to select every character, unlike `<<name>>` used in the _Create GUID_ tool.

## Installation

You can easily search for and install extensions directly within Code.

1. Open the command palette: Ctrl+Shift+P
2. Type: Install Extension
3. Type: Insert GUID
4. Press __Enter__ or click the download button to install

Code also makes it easy to update extensions:

1. Open the command palette: Ctrl+Shift+P
2. Type: Show Outdated Extensions
3. Press __Enter__ or click the download button to install updates

## Using

Whenever you want to insert a new GUID at the cursor or replace the currently selected text:

1. Open the command palette: Ctrl+Shift+P
2. Type: Insert GUID
3. Press __Enter__ and select the desired format

## License

The extension and source are licensed under the [MIT license](LICENSE.txt).