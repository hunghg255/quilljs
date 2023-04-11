class QuillPage {
    constructor(page) {
        this.page = page;
    }
    get root() {
        return this.page.locator('.ql-editor');
    }
    editorHTML() {
        return this.root.innerHTML();
    }
}
export default QuillPage;
//# sourceMappingURL=QuillPage.js.map