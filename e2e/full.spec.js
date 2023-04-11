var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { test, expect } from '@playwright/test';
import { getSelectionInTextNode, SHORTKEY } from './utils';
import { CHAPTER, P1, P2 } from './utils/fixtures';
import QuillPage from './utils/QuillPage';
test('compose an epic', ({ page }) => __awaiter(void 0, void 0, void 0, function* () {
    yield page.goto('http://localhost:9000/standalone/full');
    const quillPage = new QuillPage(page);
    yield page.waitForSelector('.ql-editor', { timeout: 10000 });
    yield expect(page).toHaveTitle('Full Editor - Quill Rich Text Editor');
    yield page.type('.ql-editor', 'The Whale');
    expect(yield quillPage.editorHTML()).toEqual('<p>The Whale</p>');
    yield page.keyboard.press('Enter');
    expect(yield quillPage.editorHTML()).toEqual('<p>The Whale</p><p><br></p>');
    yield page.keyboard.press('Enter');
    yield page.keyboard.press('Tab');
    yield page.type('.ql-editor', P1);
    yield page.keyboard.press('Enter');
    yield page.keyboard.press('Enter');
    yield page.type('.ql-editor', P2);
    expect(yield quillPage.editorHTML()).toEqual([
        '<p>The Whale</p>',
        '<p><br></p>',
        `<p>\t${P1}</p>`,
        '<p><br></p>',
        `<p>${P2}</p>`,
    ].join(''));
    // More than enough to get to top
    yield Promise.all(Array(40)
        .fill(0)
        .map(() => page.keyboard.press('ArrowUp')));
    yield page.keyboard.press('ArrowDown');
    yield page.keyboard.press('Enter');
    yield page.type('.ql-editor', CHAPTER);
    yield page.keyboard.press('Enter');
    expect(yield quillPage.editorHTML()).toEqual([
        '<p>The Whale</p>',
        '<p><br></p>',
        `<p>${CHAPTER}</p>`,
        '<p><br></p>',
        `<p>\t${P1}</p>`,
        '<p><br></p>',
        `<p>${P2}</p>`,
    ].join(''));
    // More than enough to get to top
    yield Promise.all(Array(20)
        .fill(0)
        .map(() => page.keyboard.press('ArrowUp')));
    yield page.keyboard.press('ArrowRight');
    yield page.keyboard.press('ArrowRight');
    yield page.keyboard.press('ArrowRight');
    yield page.keyboard.press('ArrowRight');
    yield page.keyboard.press('Backspace');
    yield page.keyboard.press('Backspace');
    yield page.keyboard.press('Backspace');
    yield page.keyboard.press('Backspace');
    expect(yield quillPage.editorHTML()).toEqual([
        '<p>Whale</p>',
        '<p><br></p>',
        `<p>${CHAPTER}</p>`,
        '<p><br></p>',
        `<p>\t${P1}</p>`,
        '<p><br></p>',
        `<p>${P2}</p>`,
    ].join(''));
    yield page.keyboard.press('Delete');
    yield page.keyboard.press('Delete');
    yield page.keyboard.press('Delete');
    yield page.keyboard.press('Delete');
    yield page.keyboard.press('Delete');
    expect(yield quillPage.editorHTML()).toEqual([
        '<p><br></p>',
        '<p><br></p>',
        `<p>${CHAPTER}</p>`,
        '<p><br></p>',
        `<p>\t${P1}</p>`,
        '<p><br></p>',
        `<p>${P2}</p>`,
    ].join(''));
    yield page.keyboard.press('Delete');
    expect(yield quillPage.editorHTML()).toEqual([
        '<p><br></p>',
        `<p>${CHAPTER}</p>`,
        '<p><br></p>',
        `<p>\t${P1}</p>`,
        '<p><br></p>',
        `<p>${P2}</p>`,
    ].join(''));
    yield page.click('.ql-toolbar .ql-bold');
    yield page.click('.ql-toolbar .ql-italic');
    expect(yield quillPage.editorHTML()).toEqual([
        '<p><strong><em><span class="ql-cursor">\uFEFF</span></em></strong></p>',
        `<p>${CHAPTER}</p>`,
        '<p><br></p>',
        `<p>\t${P1}</p>`,
        '<p><br></p>',
        `<p>${P2}</p>`,
    ].join(''));
    let bold = yield page.$('.ql-toolbar .ql-bold.ql-active');
    let italic = yield page.$('.ql-toolbar .ql-italic.ql-active');
    expect(bold).not.toBe(null);
    expect(italic).not.toBe(null);
    yield page.type('.ql-editor', 'Moby Dick');
    expect(yield quillPage.editorHTML()).toEqual([
        '<p><strong><em>Moby Dick</em></strong></p>',
        `<p>${CHAPTER}</p>`,
        '<p><br></p>',
        `<p>\t${P1}</p>`,
        '<p><br></p>',
        `<p>${P2}</p>`,
    ].join(''));
    bold = yield page.$('.ql-toolbar .ql-bold.ql-active');
    italic = yield page.$('.ql-toolbar .ql-italic.ql-active');
    expect(bold).not.toBe(null);
    expect(italic).not.toBe(null);
    yield page.keyboard.press('ArrowRight');
    yield page.keyboard.down('Shift');
    yield Promise.all(Array(CHAPTER.length)
        .fill(0)
        .map(() => page.keyboard.press('ArrowRight')));
    yield page.keyboard.up('Shift');
    bold = yield page.$('.ql-toolbar .ql-bold.ql-active');
    italic = yield page.$('.ql-toolbar .ql-italic.ql-active');
    expect(bold).toBe(null);
    expect(italic).toBe(null);
    yield page.keyboard.down(SHORTKEY);
    yield page.keyboard.press('b');
    yield page.keyboard.up(SHORTKEY);
    bold = yield page.$('.ql-toolbar .ql-bold.ql-active');
    expect(bold).not.toBe(null);
    expect(yield quillPage.editorHTML()).toEqual([
        '<p><strong><em>Moby Dick</em></strong></p>',
        `<p><strong>${CHAPTER}</strong></p>`,
        '<p><br></p>',
        `<p>\t${P1}</p>`,
        '<p><br></p>',
        `<p>${P2}</p>`,
    ].join(''));
    yield page.keyboard.press('ArrowLeft');
    yield page.keyboard.press('ArrowUp');
    yield page.click('.ql-toolbar .ql-header[value="1"]');
    expect(yield quillPage.editorHTML()).toEqual([
        '<h1><strong><em>Moby Dick</em></strong></h1>',
        `<p><strong>${CHAPTER}</strong></p>`,
        '<p><br></p>',
        `<p>\t${P1}</p>`,
        '<p><br></p>',
        `<p>${P2}</p>`,
    ].join(''));
    const header = yield page.$('.ql-toolbar .ql-header.ql-active[value="1"]');
    expect(header).not.toBe(null);
    yield page.keyboard.press('ArrowDown');
    yield page.keyboard.press('ArrowDown');
    yield page.keyboard.press('Enter');
    yield page.keyboard.press('Enter');
    yield page.keyboard.press('ArrowUp');
    yield page.type('.ql-editor', 'AA');
    yield page.keyboard.press('ArrowLeft');
    yield page.keyboard.down(SHORTKEY);
    yield page.keyboard.press('b');
    yield page.keyboard.press('b');
    yield page.keyboard.up(SHORTKEY);
    yield page.type('.ql-editor', 'B');
    expect(yield quillPage.root.locator('p').nth(2).innerHTML()).toBe('ABA');
    yield page.keyboard.down(SHORTKEY);
    yield page.keyboard.press('b');
    yield page.keyboard.up(SHORTKEY);
    yield page.type('.ql-editor', 'C');
    yield page.keyboard.down(SHORTKEY);
    yield page.keyboard.press('b');
    yield page.keyboard.up(SHORTKEY);
    yield page.type('.ql-editor', 'D');
    expect(yield quillPage.root.locator('p').nth(2).innerHTML()).toBe('AB<strong>C</strong>DA');
    const selection = yield page.evaluate(getSelectionInTextNode);
    expect(selection).toBe('["DA",1,"DA",1]');
}));
//# sourceMappingURL=full.spec.js.map