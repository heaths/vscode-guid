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
import {GuidCommands} from '../commands';

suite('GuidCommands', () => {
    test('quick pick 1 is simple string with default options', () => {
        var g = new Guid('12341234-1234-1234-1234-123412341234');
        var items = GuidCommands.getQuickPickItems(g, true, false, true);

        assert.equal(items.length, 5);

        var item = items[0];
        assert.strictEqual(item.label, '1');
        assert.equal(item.description, '12341234-1234-1234-1234-123412341234');
        assert.equal(item.text, '12341234-1234-1234-1234-123412341234');
    });

    test('quick pick 2 is registry string with default options', () => {
        var g = new Guid('12341234-1234-1234-1234-123412341234');
        var items = GuidCommands.getQuickPickItems(g, true, false, true);

        assert.equal(items.length, 5);

        var item = items[1];
        assert.strictEqual(item.label, '2');
        assert.equal(item.description, '{12341234-1234-1234-1234-123412341234}');
        assert.equal(item.text, '{12341234-1234-1234-1234-123412341234}');
    });

    test('quick pick 3 is C structure with default options', () => {
        var g = new Guid('12341234-1234-1234-1234-123412341234');
        var items = GuidCommands.getQuickPickItems(g, true, false, true);

        assert.equal(items.length, 5);

        var item = items[2];
        assert.strictEqual(item.label, '3');
        assert.equal(item.description,
            'static const struct GUID __NAME__ = {0x12341234, 0x1234, 0x1234, {0x12, 0x34, 0x12, 0x34, 0x12, 0x34, 0x12, 0x34}};'
        );
        assert.equal(item.text,
            '// {12341234-1234-1234-1234-123412341234}\n' +
            'static const struct GUID __NAME__ = {0x12341234, 0x1234, 0x1234, {0x12, 0x34, 0x12, 0x34, 0x12, 0x34, 0x12, 0x34}};\n'
        );
    });

    test('quick pick 4 is C macro with default options', () => {
        var g = new Guid('12341234-1234-1234-1234-123412341234');
        var items = GuidCommands.getQuickPickItems(g, true, false, true);

        assert.equal(items.length, 5);

        var item = items[3];
        assert.strictEqual(item.label, '4');
        assert.equal(item.description,
            'DEFINE_GUID(__NAME__, 0x12341234, 0x1234, 0x1234, 0x12, 0x34, 0x12, 0x34, 0x12, 0x34, 0x12, 0x34);'
        );
        assert.equal(item.text,
            '// {12341234-1234-1234-1234-123412341234}\n' +
            'DEFINE_GUID(__NAME__, 0x12341234, 0x1234, 0x1234, 0x12, 0x34, 0x12, 0x34, 0x12, 0x34, 0x12, 0x34);\n'
        );
    });

    test('quick pick 5 is simple non-hyphenated string with default options', () => {
        var g = new Guid('12341234-1234-1234-1234-123412341234');
        var items = GuidCommands.getQuickPickItems(g, true, false, true);

        assert.equal(items.length, 5);

        var item = items[4];
        assert.strictEqual(item.label, '5');
        assert.equal(item.description, '12341234123412341234123412341234');
        assert.equal(item.text, '12341234123412341234123412341234');
    });

    test('quick pick items are correct when all settings are true', () => {
        const g = new Guid('12341234-dead-beef-1234-123412341234');
        const items = GuidCommands.getQuickPickItems(g, true, true, true);

        assert.equal(items.length, 8);

        const item1 = items[0];
        assert.strictEqual(item1.label, '1');
        assert.equal(item1.description, '12341234-dead-beef-1234-123412341234');
        assert.equal(item1.text, '12341234-dead-beef-1234-123412341234');

        const item2 = items[1];
        assert.strictEqual(item2.label, '2');
        assert.equal(item2.description, '{12341234-dead-beef-1234-123412341234}');
        assert.equal(item2.text, '{12341234-dead-beef-1234-123412341234}');

        const item3 = items[2];
        assert.strictEqual(item3.label, '3');
        assert.equal(item3.description, '12341234-DEAD-BEEF-1234-123412341234');
        assert.equal(item3.text, '12341234-DEAD-BEEF-1234-123412341234');

        const item4 = items[3];
        assert.strictEqual(item4.label, '4');
        assert.equal(item4.description, '{12341234-DEAD-BEEF-1234-123412341234}');
        assert.equal(item4.text, '{12341234-DEAD-BEEF-1234-123412341234}');

        const item5 = items[4];
        assert.strictEqual(item5.label, '5');
        assert.equal(item5.description,
            'static const struct GUID __NAME__ = {0x12341234, 0xdead, 0xbeef, {0x12, 0x34, 0x12, 0x34, 0x12, 0x34, 0x12, 0x34}};'
        );
        assert.equal(item5.text,
            '// {12341234-dead-beef-1234-123412341234}\n' +
            'static const struct GUID __NAME__ = {0x12341234, 0xdead, 0xbeef, {0x12, 0x34, 0x12, 0x34, 0x12, 0x34, 0x12, 0x34}};\n'
        );

        const item6 = items[5];
        assert.strictEqual(item6.label, '6');
        assert.equal(item6.description,
            'DEFINE_GUID(__NAME__, 0x12341234, 0xdead, 0xbeef, 0x12, 0x34, 0x12, 0x34, 0x12, 0x34, 0x12, 0x34);'
        );
        assert.equal(item6.text,
            '// {12341234-dead-beef-1234-123412341234}\n' +
            'DEFINE_GUID(__NAME__, 0x12341234, 0xdead, 0xbeef, 0x12, 0x34, 0x12, 0x34, 0x12, 0x34, 0x12, 0x34);\n'
        );

        const item7 = items[6];
        assert.strictEqual(item7.label, '7');
        assert.equal(item7.description, '12341234deadbeef1234123412341234');
        assert.equal(item7.text, '12341234deadbeef1234123412341234');

        const item8 = items[7];
        assert.strictEqual(item8.label, '8');
        assert.equal(item8.description, '12341234DEADBEEF1234123412341234');
        assert.equal(item8.text, '12341234DEADBEEF1234123412341234');
    });

    test('quick pick items are correct with only lowercase enabled', () => {
        const g = new Guid('12341234-dead-beef-1234-123412341234');
        const items = GuidCommands.getQuickPickItems(g, true, false, false);

        assert.equal(items.length, 3);

        const item1 = items[0];
        assert.strictEqual(item1.label, '1');
        assert.equal(item1.description, '12341234-dead-beef-1234-123412341234');
        assert.equal(item1.text, '12341234-dead-beef-1234-123412341234');

        const item2 = items[1];
        assert.strictEqual(item2.label, '2');
        assert.equal(item2.description, '{12341234-dead-beef-1234-123412341234}');
        assert.equal(item2.text, '{12341234-dead-beef-1234-123412341234}');

        const item3 = items[2];
        assert.strictEqual(item3.label, '3');
        assert.equal(item3.description, '12341234deadbeef1234123412341234');
        assert.equal(item3.text, '12341234deadbeef1234123412341234');
    });

    test('quick pick items are correct with only uppercase enabled', () => {
        const g = new Guid('12341234-dead-beef-1234-123412341234');
        const items = GuidCommands.getQuickPickItems(g, false, true, false);

        assert.equal(items.length, 3);

        const item1 = items[0];
        assert.strictEqual(item1.label, '1');
        assert.equal(item1.description, '12341234-DEAD-BEEF-1234-123412341234');
        assert.equal(item1.text, '12341234-DEAD-BEEF-1234-123412341234');

        const item2 = items[1];
        assert.strictEqual(item2.label, '2');
        assert.equal(item2.description, '{12341234-DEAD-BEEF-1234-123412341234}');
        assert.equal(item2.text, '{12341234-DEAD-BEEF-1234-123412341234}');

        const item3 = items[2];
        assert.strictEqual(item3.label, '3');
        assert.equal(item3.description, '12341234DEADBEEF1234123412341234');
        assert.equal(item3.text, '12341234DEADBEEF1234123412341234');
    });


    test('quick pick items are correct with only code snippets enabled', () => {
        const g = new Guid('12341234-dead-beef-1234-123412341234');
        const items = GuidCommands.getQuickPickItems(g, false, false, true);

        assert.equal(items.length, 2);

        const item1 = items[0];
        assert.strictEqual(item1.label, '1');
        assert.equal(item1.description,
            'static const struct GUID __NAME__ = {0x12341234, 0xdead, 0xbeef, {0x12, 0x34, 0x12, 0x34, 0x12, 0x34, 0x12, 0x34}};'
        );
        assert.equal(item1.text,
            '// {12341234-dead-beef-1234-123412341234}\n' +
            'static const struct GUID __NAME__ = {0x12341234, 0xdead, 0xbeef, {0x12, 0x34, 0x12, 0x34, 0x12, 0x34, 0x12, 0x34}};\n'
        );

        const item2 = items[1];
        assert.strictEqual(item2.label, '2');
        assert.equal(item2.description,
            'DEFINE_GUID(__NAME__, 0x12341234, 0xdead, 0xbeef, 0x12, 0x34, 0x12, 0x34, 0x12, 0x34, 0x12, 0x34);'
        );
        assert.equal(item2.text,
            '// {12341234-dead-beef-1234-123412341234}\n' +
            'DEFINE_GUID(__NAME__, 0x12341234, 0xdead, 0xbeef, 0x12, 0x34, 0x12, 0x34, 0x12, 0x34, 0x12, 0x34);\n'
        );
    });

    test('quick pick items are correct with no code snippets enabled', () => {
        var g = new Guid('12341234-dead-beef-1234-123412341234');
        var items = GuidCommands.getQuickPickItems(g, false, false, false);

        assert.equal(items.length, 3);

        // with all options set to false, only the lowercase options are shown
        const item1 = items[0];
        assert.strictEqual(item1.label, '1');
        assert.equal(item1.description, '12341234-dead-beef-1234-123412341234');
        assert.equal(item1.text, '12341234-dead-beef-1234-123412341234');

        const item2 = items[1];
        assert.strictEqual(item2.label, '2');
        assert.equal(item2.description, '{12341234-dead-beef-1234-123412341234}');
        assert.equal(item2.text, '{12341234-dead-beef-1234-123412341234}');

        const item3 = items[2];
        assert.strictEqual(item3.label, '3');
        assert.equal(item3.description, '12341234deadbeef1234123412341234');
        assert.equal(item3.text, '12341234deadbeef1234123412341234');
    });
});