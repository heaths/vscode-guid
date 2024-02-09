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

import { WorkspaceConfiguration, workspace } from 'vscode';

export interface Settings {
    showLowercase: boolean
    showUppercase: boolean
    showCodeSnippets: boolean
    pasteAutomatically: string
    formats: string[] | null
};

export const DEFAULTS: Settings = {
    showLowercase: true,
    showUppercase: false,
    showCodeSnippets: true,
    pasteAutomatically: '',
    formats: null,
};

// Use placeholder token that completely selects with double click.
const NAME_PLACEHOLDER: string = '__NAME__';
const FORMATS: Array<{ format: string, type: 'LOWERCASE' | 'UPPERCASE' | 'SNIPPET' }> = [
    {
        format: '{d}',
        type: 'LOWERCASE',
    },
    {
        format: '{b}',
        type: 'LOWERCASE',
    },
    {
        format: `// {b}\nstatic const struct GUID ${NAME_PLACEHOLDER} = {x}\n`,
        type: 'SNIPPET',
    },
    // TODO
];

class SettingsImpl implements Settings {
    private readonly _settings: WorkspaceConfiguration;
    constructor() {
        this._settings = workspace.getConfiguration('insertGuid');
    }

    get showLowercase(): boolean {
        return this._settings.get('showLowercase', DEFAULTS.showLowercase);
    }

    get showUppercase(): boolean {
        return this._settings.get('showUppercase', DEFAULTS.showUppercase);
    }

    get showCodeSnippets(): boolean {
        return this._settings.get('showCodeSnippets', DEFAULTS.showCodeSnippets);
    }

    get pasteAutomatically(): string {
        return this._settings.get('pasteAutomatically', DEFAULTS.pasteAutomatically);
    }

    get formats(): string[] | null {
        let formats = this._settings.get<string[]>('formats');
        if (formats !== undefined && formats.length > 0) {
            return formats;
        }

        formats = new Array<string>();
        for (const format of FORMATS) {
            if (format.type === 'LOWERCASE' && this.showLowercase) {
                formats.push(format.format);
            } else if (format.type === 'UPPERCASE' && this.showUppercase) {
                formats.push(format.format);
            } else if (format.type === 'SNIPPET' && this.showCodeSnippets) {
                formats.push(format.format);
            }
        }

        return formats;
    }

    // TODO: Write migration route during start up to populate `formats` using `WorkspaceConfiguration.update`.
};

export default (): Settings => new SettingsImpl();
