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

import * as assert from 'assert';
import { Guid } from '../../guid';

suite('Guid', () => {
    test('creates random Guid', () => {
        const g1 = new Guid();
        const g2 = new Guid();

        assert.notStrictEqual(g1.toString(), g2.toString());
    });

    test('can return empty Guid', () => {
        const e = Guid.EMPTY;
        assert.strictEqual(e.toString(), '00000000-0000-0000-0000-000000000000');
    });

    test('parses invalid Guid as empty', () => {
        const buffer = Buffer.alloc(16);
        buffer.fill(0);

        const g = new Guid('z');
        assert.deepStrictEqual(g.toBuffer(), buffer);
    });

    test('parses Guid with curly braces', () => {
        const buffer = Buffer.from([0x12, 0x34, 0x12, 0x34, 0x12, 0x34, 0x12, 0x34, 0x12, 0x34, 0x12, 0x34, 0x12, 0x34, 0x12, 0x34]);
        const g = new Guid('{12341234-1234-1234-1234-123412341234}');

        assert.deepStrictEqual(g.toBuffer(), buffer);
    })

    test('parses Guid without curly braces', () => {
        const buffer = Buffer.from([0x12, 0x34, 0x12, 0x34, 0x12, 0x34, 0x12, 0x34, 0x12, 0x34, 0x12, 0x34, 0x12, 0x34, 0x12, 0x34]);
        const g = new Guid('12341234-1234-1234-1234-123412341234');

        assert.deepStrictEqual(g.toBuffer(), buffer);
    });

    test('returns 16-byte buffer', () => {
        const g = new Guid();
        assert.strictEqual(g.toBuffer().length, 16);
    });

    test('returns mutable buffer', () => {
        const g = new Guid('12341234-1234-1234-1234-123412341234');
        assert.strictEqual(g.toString(), '12341234-1234-1234-1234-123412341234');

        const buffer = g.toBuffer();
        buffer.fill(0xff);
        assert.strictEqual(g.toString(), 'ffffffff-ffff-ffff-ffff-ffffffffffff');
    });

    test('returns proper "struct" format', () => {
        const g = new Guid('01234567-89ab-cdef-0123-456789abcdef');
        assert.strictEqual(g.toString('struct'), '{0x01234567, 0x89ab, 0xcdef, {0x01, 0x23, 0x45, 0x67, 0x89, 0xab, 0xcd, 0xef}}');
    });

    test('returns proper "struct" format for "x"', () => {
        const g = new Guid('01234567-89ab-cdef-0123-456789abcdef');
        assert.strictEqual(g.toString('x'), '{0x01234567, 0x89ab, 0xcdef, {0x01, 0x23, 0x45, 0x67, 0x89, 0xab, 0xcd, 0xef}}');
    });

    test('returns proper "braced" format', () => {
        const g = new Guid('01234567-89ab-cdef-0123-456789abcdef');
        assert.strictEqual(g.toString('braced'), '{01234567-89ab-cdef-0123-456789abcdef}');
    });

    test('returns proper "braced" format for "b"', () => {
        const g = new Guid('01234567-89ab-cdef-0123-456789abcdef');
        assert.strictEqual(g.toString('braced'), '{01234567-89ab-cdef-0123-456789abcdef}');
    });

    test('returns proper "no-hyphen" format', () => {
        const g = new Guid('01234567-89ab-cdef-0123-456789abcdef');
        assert.strictEqual(g.toString('no-hyphen'), '0123456789abcdef0123456789abcdef');
    });

    test('returns proper string for missing format', () => {
        const g = new Guid('01234567-89ab-cdef-0123-456789abcdef');
        assert.strictEqual(g.toString(), '01234567-89ab-cdef-0123-456789abcdef');
    });

    test('returns proper string for invalid format', () => {
        const g = new Guid('01234567-89ab-cdef-0123-456789abcdef');
        assert.strictEqual(g.toString('invalid'), '01234567-89ab-cdef-0123-456789abcdef');
    });

    test('returns proper string for non-string format', () => {
        const g = new Guid('01234567-89ab-cdef-0123-456789abcdef');
        assert.strictEqual(g.toString(undefined), '01234567-89ab-cdef-0123-456789abcdef');
    });

    test('returns proper string for individual parts format', () => {
        const g = new Guid('9f0a1b2c-4e5f-6a7b-8c9d-0e1f2a3b4c5d');
        assert.strictEqual(g.toString('x0'), '9f0a1b2c');
        assert.strictEqual(g.toString('x1'), '4e5f');
        assert.strictEqual(g.toString('x2'), '6a7b');
        assert.strictEqual(g.toString('x3'), '8c');
        assert.strictEqual(g.toString('x4'), '9d');
        assert.strictEqual(g.toString('x5'), '0e');
        assert.strictEqual(g.toString('x6'), '1f');
        assert.strictEqual(g.toString('x7'), '2a');
        assert.strictEqual(g.toString('x8'), '3b');
        assert.strictEqual(g.toString('x9'), '4c');
        assert.strictEqual(g.toString('x10'), '5d');
    });

    test('returns proper string with format specifiers replaced', () => {
        const g = new Guid('9f0a1b2c-4e5f-6a7b-8c9d-0e1f2a3b4c5d');
        const format = 'const G: ::windows::core::GUID = ::windows::core::GUID {\n    data1: 0x{x0},{nl}    data2: 0x{x1},\n    data3: 0x{x2},{nl}    data4: [0x{x3}, 0x{x4}, 0x{x5}, 0x{x6}, 0x{x7}, 0x{x8}, 0x{x9}, 0x{x10}],\n};';
        const expected = `const G: ::windows::core::GUID = ::windows::core::GUID {
    data1: 0x9f0a1b2c,
    data2: 0x4e5f,
    data3: 0x6a7b,
    data4: [0x8c, 0x9d, 0x0e, 0x1f, 0x2a, 0x3b, 0x4c, 0x5d],
};`;
        assert.strictEqual(g.format(format), expected);
    });
});
