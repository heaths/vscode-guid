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

interface GuidPickFormat {
    label : string;
    format : (g : Guid) => string;
    preface? : (g : Guid) => string;
    named? : boolean;
}

class GuidPickItem implements vscode.QuickPickItem {
    private _guid : Guid;
    private _format : GuidPickFormat;

    constructor(_guid : Guid, format : GuidPickFormat) {
        this._guid = _guid;
        this._format = format;
    }

    // TODO: Localize?
    get label() : string {
        return this._format.label;
    }

    get description() : string {
        return this._format.format(this._guid);
    }

    get text() : string {
        return this._format.preface(this._guid) +
               this._format.format(this._guid);
    }

    get named() : boolean {
        return this._format.named || false;
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
            label: 'String',
            format: (g) => {
                return g.toString();
            }
        },
        {
            label: 'Registry',
            format: (g) => {
                return g.toString('braced');
            }
        },
        {
            label: 'C structure',
            named: true,
            format: (g) => {
                return util.format('static const struct GUID %s = %s;', GuidCommands._NAME, g.toString('struct'));
            },
            preface: (g) => {
                return util.format('// %s\n', g.toString('braced'));
            }
        },
        {
            label: 'C macro',
            named: true,
            format: (g) => {
                return util.format('DEFINE_GUID(%s, %s);', GuidCommands._NAME, g.toString('struct').replace(/[\{\}]/g, ''));
            },
            preface: (g) => {
                return util.format('// %s\n', g.toString('braced'));
            }
        }
    ];

    /**
     * Inserts GUID at the cursor position or replaces active selection.
     * @param textEditor {vscode.TextEditor} The active text editor.
     * @param edit {vscode.TextEditorEdit} A text edit builder for the intended change.
     */
    static insertCommand(textEditor : vscode.TextEditor, edit : vscode.TextEditorEdit) {
        let g = new Guid();
        let items : GuidPickItem[] = [];

        GuidCommands._formats.forEach(format => {
            let item = new GuidPickItem(g, format);
            items.push(item);
        });

        // Prompt the user for a format.
        vscode.window.showQuickPick<GuidPickItem>(items)
            .then(item => {
                if (typeof item === 'undefined') {
                    // Selection canceled.
                    return;
                }

                // 'edit' no longer valid so start a new edit.
                textEditor.edit(edit => {

                    let current = textEditor.selection;

                    if (current.isEmpty) {
                        edit.insert(current.start, item.text);
                    } else {
                        edit.replace(current, item.text);
                    }

                    if (item.named) {
                        // TODO: Change selection to cover NAME?
                    }
                });
            });
    }
}
