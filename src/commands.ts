// The MIT License (MIT)
//
// Copyright (c) Heath Stewart
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

import * as vscode from 'vscode';
import * as util from 'util';
import {Guid} from './guid';

enum FormatType {
    LOWERCASE,
    UPPERCASE,
    SNIPPET,
    CUSTOM
}

interface GuidPickFormat {
    format : (g : Guid) => string;
    type : FormatType;
    preface? : (g : Guid) => string;
    epilogue? : (g : Guid) => string;
    named? : boolean;
}

class GuidPickItem implements vscode.QuickPickItem {
    private _index : number;
    private _guid : Guid;
    private _format : GuidPickFormat;

    constructor(index : number, guid : Guid, format : GuidPickFormat) {
        this._index = index;
        this._guid = guid;
        this._format = format;
    }

    get label() : string {
        return this._index.toString();
    }

    get description() : string {
        return this._format.format(this._guid);
    }

    get text() : string {
        let s = '';

        if (typeof this._format.preface === 'function') {
            s = this._format.preface(this._guid);
        }

        s += this._format.format(this._guid);

        if (typeof this._format.epilogue === 'function') {
            s += this._format.epilogue(this._guid);
        }

        return s;
    }

    get named() : boolean {
        return this._format.named || false;
    }

    generate() {
        this._guid = new Guid();
    }
}

/**
 * Extension commands for working with GUIDs.
 */
export class GuidCommands {

    // Use placeholder token that completely selects with double click.
    private static _NAME : string = '__NAME__';

    private static _formats : GuidPickFormat[] = [
        {
            format: (g) => {
                return g.toString();
            },
            type: FormatType.LOWERCASE
        },
        {
            format: (g) => {
                return g.toString('braced');
            },
            type: FormatType.LOWERCASE
        },
        {
            format: (g) => {
                return g.toString().toUpperCase();
            },
            type: FormatType.UPPERCASE
        },
        {
            format: (g) => {
                return g.toString('braced').toUpperCase();
            },
            type: FormatType.UPPERCASE
        },
        {
            named: true,
            format: (g) => {
                return util.format('static const struct GUID %s = %s;', GuidCommands._NAME, g.toString('struct'));
            },
            preface: (g) => {
                return util.format('// %s\n', g.toString('braced'));
            },
            epilogue: (g) => {
                return '\n';
            },
            type: FormatType.SNIPPET
        },
        {
            named: true,
            format: (g) => {
                return util.format('DEFINE_GUID(%s, %s);', GuidCommands._NAME, g.toString('struct').replace(/[\{\}]/g, ''));
            },
            preface: (g) => {
                return util.format('// %s\n', g.toString('braced'));
            },
            epilogue: (g) => {
                return '\n';
            },
            type: FormatType.SNIPPET
        },
        {
            format: (g) => {
                return g.toString('no-hyphen');
            },
            type: FormatType.LOWERCASE
        },
        {
            format: (g) => {
                return g.toString('no-hyphen').toUpperCase();
            },
            type: FormatType.UPPERCASE
        }
    ];

    /**
     * Inserts GUID at the cursor position(s) or replaces active selection(s).
     * @param textEditor {vscode.TextEditor} The active text editor.
     * @param edit {vscode.TextEditorEdit} A text edit builder for the intended change.
     */
    static insertCommand(textEditor : vscode.TextEditor, edit : vscode.TextEditorEdit) {
        GuidCommands.insertCommandImpl(textEditor, edit, false);
    }

    /**
     * Inserts unique GUIDs at each cursor position or replaces active selection(s).
     * @param textEditor {vscode.TextEditor} The active text editor.
     * @param edit {vscode.TextEditorEdit} A text edit builder for the intended change.
     */
    static insertManyCommand(textEditor : vscode.TextEditor, edit : vscode.TextEditorEdit) {
        GuidCommands.insertCommandImpl(textEditor, edit, true);
    }

    static async insertCommandImpl(textEditor : vscode.TextEditor, edit : vscode.TextEditorEdit, unique: boolean) {
        const g = new Guid();
        const settings = vscode.workspace.getConfiguration('insertGuid');
        const showLowercase = settings.get<boolean>('showLowercase', true);
        const showUppercase = settings.get<boolean>('showUppercase', false);
        const showCodeSnippets = settings.get<boolean>('showCodeSnippets', true);
        const pasteAutomatically = settings.get<string>('pasteAutomatically', "");

        const items = GuidCommands.getQuickPickItems(g, showLowercase, showUppercase, showCodeSnippets);
        var item = items[0];

        if (pasteAutomatically !== "") {
            // Format with the specified string and insert without user selection
            type Dict = { [key: string]: (g: Guid) => string}
            const replacements: Dict = {
                '{b}': (g: Guid) => g.toString(),
                '{B}': (g: Guid) => g.toString().toUpperCase(),
                '{n}': (g: Guid) => g.toString('no-hyphen'),
                '{N}': (g: Guid) => g.toString('no-hyphen').toUpperCase()
            }
            const customFormatter = {
                format: (g: Guid) => {
                    var ret = pasteAutomatically;
                    for (const replacement in replacements) {
                        const fn = replacements[replacement]
                        ret = ret.replace(replacement, fn(g));
                    }
                    return ret;
                },
                type: FormatType.CUSTOM
            }
            item = new GuidPickItem(-1, g, customFormatter)
        } else {
            // Let user select format
            const selection = await vscode.window.showQuickPick<GuidPickItem>(items)
            if (!selection) {
                // Selection canceled.
                return
            }

            item = selection!!
        }

        // 'edit' no longer valid so start a new edit.
        textEditor.edit(edit => {
            for (const selection of textEditor.selections) {
                if (selection.isEmpty) {
                    edit.insert(selection.start, item.text);
                } else {
                    edit.replace(selection, item.text);
                }

                if (unique) {
                    item.generate();
                }
            }

            if (item.named) {
                // TODO: Change selection to cover NAME?
            }
        });
    }

    /**
     * Gets an array of items to display in the Quick Pick window.
     * @param guid The GUID to render in each Quick Pick item.
     * @param showLowercase Indicates whether lowercase options should be included in the array.
     * @param showUppercase Indicates whether uppercase options should be included in the array.
     * @param showCodeSnippets Indicates whether code snippet options should be included in the array.
     * @returns An array of items to display in the Quick Pick window.
     */
    static getQuickPickItems(guid : Guid, showLowercase : boolean, showUppercase : boolean, showCodeSnippets : boolean) : GuidPickItem[] {
        let items : GuidPickItem[] = [];
        let nextIndex = 0;

        for (const format of GuidCommands._formats) {
            if (((showLowercase || (!showUppercase && !showCodeSnippets)) && format.type === FormatType.LOWERCASE) ||
                (showUppercase && format.type === FormatType.UPPERCASE) ||
                (showCodeSnippets && format.type === FormatType.SNIPPET)) {
                    const item = new GuidPickItem(++nextIndex, guid, format);
                    items.push(item);
                }
        }

        return items;
    }
}
