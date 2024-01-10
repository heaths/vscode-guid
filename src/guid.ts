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
import { v4 } from 'uuid';
import * as util from 'util';

/**
 * A globally unique identifier.
 */
export class Guid {
    private _buffer: Buffer;

    /**
     * Creates a new globally unique identifier.
     */
    constructor(input?: string) {
        this._buffer = Buffer.alloc(16);

        if (input == null) {
            this._buffer = v4(undefined, this._buffer);
        } else {
            let i = 0;
            input.replace(/[0-9a-fA-F]{2}/g, (octet: string) => {
                if (i < 16) {
                    this._buffer[i++] = parseInt(octet, 16);
                }

                return octet;
            });

            // Fill remaining bytes with 0.
            while (i < 16) {
                this._buffer[i++] = 0;
            }
        }
    }

    /**
     * Gets an identifier consisting of all zeroes.
     */
    static EMPTY: Guid = new Guid('0');

    /**
     * Formats a b as a GUID string representation.
     */
    static unparse(b: Buffer): string { // cspell:ignore unparse
        return b.toString('hex', 0, 4) + '-' +
            b.toString('hex', 4, 6) + '-' +
            b.toString('hex', 6, 8) + '-' +
            b.toString('hex', 8, 10) + '-' +
            b.toString('hex', 10, 16);
    }

    /**
     * Returns the raw _buffer.
     * @returns The raw _buffer.
     */
    toBuffer(): Buffer {
        return this._buffer;
    }

    /**
     * Returns the string representation of a globally unique identifier.
     * @param format Optional format specifier: 'struct' ('x'), 'braced' ('b'), or other (default).
     * @returns The string representation of a globally unique identifier.
     */
    toString(format?: string): string {
        const b = this._buffer;
        if (format === 'struct' || format === 'x') {
            return util.format('{0x%s, 0x%s, 0x%s, {0x%s, 0x%s, 0x%s, 0x%s, 0x%s, 0x%s, 0x%s, 0x%s}}',
                b.toString('hex', 0, 4), b.toString('hex', 4, 6), b.toString('hex', 6, 8),
                b.toString('hex', 8, 9), b.toString('hex', 9, 10),
                b.toString('hex', 10, 11), b.toString('hex', 11, 12), b.toString('hex', 12, 13),
                b.toString('hex', 13, 14), b.toString('hex', 14, 15), b.toString('hex', 15, 16));
        } else if (format === 'braced' || format === 'b') {
            return util.format('{%s}', this.toString());
        } else if (format === 'no-hyphen') {
            return this.toString().replace(/-/g, '');
        } else {
            return b.toString('hex', 0, 4) + '-' +
                b.toString('hex', 4, 6) + '-' +
                b.toString('hex', 6, 8) + '-' +
                b.toString('hex', 8, 10) + '-' +
                b.toString('hex', 10, 16);
        }
    }
}
