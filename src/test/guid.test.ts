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
import {Guid} from '../guid';

suite('Guid', () => {
    test('creates random Guid', () => {
        var g1 = new Guid();
        var g2 = new Guid();

        assert.notStrictEqual(g1.toString(), g2.toString());
    });

    test('can return empty Guid', () => {
        var e = Guid.EMPTY;
        assert.strictEqual(e.toString(), '00000000-0000-0000-0000-000000000000');
    });

    test('parses invalid Guid as empty', () => {
        var buffer = Buffer.alloc(16);
        buffer.fill(0);

        var g = new Guid('z');
        assert.deepStrictEqual(g.toBuffer(), buffer);
    });

    test('parses Guid with curly braces', () => {
        var buffer = Buffer.from([0x12, 0x34, 0x12, 0x34, 0x12, 0x34, 0x12, 0x34, 0x12, 0x34, 0x12, 0x34, 0x12, 0x34, 0x12, 0x34, ]);
        var g = new Guid('{12341234-1234-1234-1234-123412341234}');

        assert.deepStrictEqual(g.toBuffer(), buffer);
    })

    test('parses Guid without curly braces', () => {
        var buffer = Buffer.from([0x12, 0x34, 0x12, 0x34, 0x12, 0x34, 0x12, 0x34, 0x12, 0x34, 0x12, 0x34, 0x12, 0x34, 0x12, 0x34, ]);
        var g = new Guid("12341234-1234-1234-1234-123412341234");

        assert.deepStrictEqual(g.toBuffer(), buffer);
    });

    test('returns 16-byte buffer', () => {
        var g = new Guid();
        assert.strictEqual(g.toBuffer().length, 16);
    });

    test('returns mutable buffer', () => {
        var g = new Guid('12341234-1234-1234-1234-123412341234');
        assert.strictEqual(g.toString(), '12341234-1234-1234-1234-123412341234');

        var buffer = g.toBuffer();
        buffer.fill(0xff);
        assert.strictEqual(g.toString(), 'ffffffff-ffff-ffff-ffff-ffffffffffff');
    });

    test('returns proper "struct" format', () => {
        var g = new Guid('01234567-89ab-cdef-0123-456789abcdef');
        assert.strictEqual(g.toString('struct'), '{0x01234567, 0x89ab, 0xcdef, {0x01, 0x23, 0x45, 0x67, 0x89, 0xab, 0xcd, 0xef}}');
    });

    test('returns proper "struct" format for "x"', () => {
        var g = new Guid('01234567-89ab-cdef-0123-456789abcdef');
        assert.strictEqual(g.toString('x'), '{0x01234567, 0x89ab, 0xcdef, {0x01, 0x23, 0x45, 0x67, 0x89, 0xab, 0xcd, 0xef}}');
    });

    test('returns proper "braced" format', () => {
        var g = new Guid('01234567-89ab-cdef-0123-456789abcdef');
        assert.strictEqual(g.toString('braced'), '{01234567-89ab-cdef-0123-456789abcdef}');
    });

    test('returns proper "braced" format for "b"', () => {
        var g = new Guid('01234567-89ab-cdef-0123-456789abcdef');
        assert.strictEqual(g.toString('braced'), '{01234567-89ab-cdef-0123-456789abcdef}');
    });

    test('returns proper "no-hyphen" format', () => {
        var g = new Guid('01234567-89ab-cdef-0123-456789abcdef');
        assert.strictEqual(g.toString('no-hyphen'), '0123456789abcdef0123456789abcdef');
    });

    test('returns proper string for missing format', () => {
        var g = new Guid('01234567-89ab-cdef-0123-456789abcdef');
        assert.strictEqual(g.toString(), '01234567-89ab-cdef-0123-456789abcdef');
    });

    test('returns proper string for invalid format', () => {
        var g = new Guid('01234567-89ab-cdef-0123-456789abcdef');
        assert.strictEqual(g.toString('invalid'), '01234567-89ab-cdef-0123-456789abcdef');
    });

    test('returns proper string for non-string format', () => {
        var g = new Guid('01234567-89ab-cdef-0123-456789abcdef');
        assert.strictEqual(g.toString(undefined), '01234567-89ab-cdef-0123-456789abcdef');
    });
});
